import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

interface CalendlyQuestionAnswer {
  question: string;
  answer: string;
}

interface CalendlyInviteePayload {
  name: string;
  email: string;
  text_reminder_number: string | null;
  questions_and_answers?: CalendlyQuestionAnswer[];
  scheduled_event?: {
    start_time: string;
    name: string;
  };
}

interface CalendlyWebhookBody {
  event: string;
  payload: CalendlyInviteePayload;
}

function verifySignature(rawBody: string, header: string | null, signingKey: string): boolean {
  if (!header) return false;
  const parts = Object.fromEntries(
    header.split(",").map((part) => part.split("=") as [string, string])
  );
  const timestamp = parts.t;
  const signature = parts.v1;
  if (!timestamp || !signature) return false;

  const expected = crypto
    .createHmac("sha256", signingKey)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex");

  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

function extractPhoneNumber(payload: CalendlyInviteePayload): string | null {
  if (payload.text_reminder_number) return payload.text_reminder_number;
  const phoneAnswer = payload.questions_and_answers?.find((qa) =>
    /phone|number|mobile|cell/i.test(qa.question)
  );
  return phoneAnswer?.answer ?? null;
}

function normalizeToE164(raw: string): string | null {
  const digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return null;
}

async function sendSms(to: string, body: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_FROM_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    console.warn("Twilio env vars missing — skipping SMS send.");
    return { sent: false, reason: "twilio_not_configured" as const };
  }

  const auth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");
  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ To: to, From: fromNumber, Body: body }).toString(),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    console.error("Twilio send failed:", res.status, errText);
    return { sent: false, reason: "twilio_error" as const };
  }

  return { sent: true as const };
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY;

  if (!signingKey) {
    console.warn("CALENDLY_WEBHOOK_SIGNING_KEY not set — rejecting webhook.");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const signatureHeader = req.headers.get("calendly-webhook-signature");
  if (!verifySignature(rawBody, signatureHeader, signingKey)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const body = JSON.parse(rawBody) as CalendlyWebhookBody;

  if (body.event !== "invitee.created") {
    return NextResponse.json({ received: true, skipped: "not invitee.created" });
  }

  const { payload } = body;
  const phone = extractPhoneNumber(payload);
  const e164 = phone ? normalizeToE164(phone) : null;

  if (!e164) {
    return NextResponse.json({
      received: true,
      smsSent: false,
      reason: "no_phone_number_on_booking",
    });
  }

  const when = payload.scheduled_event
    ? new Date(payload.scheduled_event.start_time).toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "your scheduled time";

  const message = `Hi ${payload.name.split(" ")[0]}, you're booked with Quendral on ${when}. We'll see you then! Reply STOP to opt out.`;

  const result = await sendSms(e164, message);

  return NextResponse.json({ received: true, smsSent: result.sent, reason: result.reason });
}
