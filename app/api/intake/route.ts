import { NextRequest, NextResponse } from "next/server";

interface IntakePayload {
  businessName?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  trade?: string;
  serviceArea?: string;
  services?: string;
  businessHours?: string;
  escalationPhone?: string;
  businessPhone?: string;
  phoneSetup?: string;
  afterHours?: string;
  urgentHandling?: string;
  neverPromise?: string;
  currentCalendar?: string;
  appointmentLength?: string;
  hasWebsite?: string;
  websiteUrl?: string;
  domainName?: string;
  notifyEmail?: string;
  leadStages?: string;
  averageJobValue?: string;
  currentCrm?: string;
  existingDataExport?: string;
  teamAccess?: string;
  reportingPreferences?: string;
  crewList?: string;
  invoicingMethod?: string;
  paymentMethods?: string;
  autoInvoice?: string;
  brandAssets?: string;
  reviewsLink?: string;
  commonQuestions?: string;
  toneNotes?: string;
  notes?: string;
}

const FIELD_LABELS: Record<keyof IntakePayload, string> = {
  businessName: "Business name",
  contactName: "Contact name",
  contactEmail: "Contact email",
  contactPhone: "Contact phone",
  trade: "Trade",
  serviceArea: "Service area",
  services: "Services offered",
  businessHours: "Business hours",
  escalationPhone: "Escalation phone",
  businessPhone: "Business phone (customer-facing)",
  phoneSetup: "Phone setup",
  afterHours: "AI answering hours",
  urgentHandling: "Urgent call handling",
  neverPromise: "Receptionist must never say",
  currentCalendar: "Current calendar/booking tool",
  appointmentLength: "Typical appointment length",
  hasWebsite: "Has website",
  websiteUrl: "Website URL",
  domainName: "Domain name",
  notifyEmail: "Notification email",
  leadStages: "Lead-to-job process",
  averageJobValue: "Average job value",
  currentCrm: "Current CRM",
  existingDataExport: "Existing data to import",
  teamAccess: "Team access needed",
  reportingPreferences: "Reporting preferences",
  crewList: "Crew/team list",
  invoicingMethod: "Current invoicing method",
  paymentMethods: "Accepted payment methods",
  autoInvoice: "Wants automated invoicing",
  brandAssets: "Brand assets link",
  reviewsLink: "Reviews / Google Business Profile link",
  commonQuestions: "Common customer questions",
  toneNotes: "Tone notes",
  notes: "Notes",
};

async function sendEmail(to: string, subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.RESEND_FROM_EMAIL || "Quendral <hello@quendral.com>";

  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping email send.");
    return { sent: false, reason: "email_not_configured" as const };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: fromAddress, to: [to], subject, html }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Resend send failed:", res.status, errText);
    return { sent: false, reason: "email_send_error" as const };
  }

  return { sent: true as const };
}

function welcomeEmailHtml(data: IntakePayload) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://quendral.com";
  const firstName = (data.contactName || "there").split(" ")[0];
  const businessName = data.businessName || "your business";

  return `
    <div style="font-family: -apple-system, Segoe UI, sans-serif; max-width: 560px; margin: 0 auto; color: #17141d; line-height: 1.6;">
      <h1 style="font-size: 22px; margin-bottom: 4px;">You made the right call, ${firstName}.</h1>
      <p>Thanks for sending over the details for <strong>${businessName}</strong> — we've got what we need to get started.</p>
      <p><strong>On billing:</strong> your setup fee covered today's charge and your first month. Your monthly plan charge starts automatically in 30 days — if you get an email from Stripe calling this a "free trial," that's just Stripe's standard wording for a delayed first charge, not a discount or a trial you need to cancel before it ends.</p>
      <p><strong>What happens next:</strong></p>
      <ol style="padding-left: 20px;">
        <li>We build your system using what you sent over — landing page, instant response, CRM setup.</li>
        <li>We'll reach out directly if anything needs clarifying.</li>
        <li>You'll get a go-live confirmation once everything's tested and ready.</li>
      </ol>
      <p>Worth keeping on hand:</p>
      <ul style="padding-left: 20px;">
        <li><a href="${siteUrl}/agreement" style="color: #1d4ed8;">Service Agreement</a></li>
        <li><a href="${siteUrl}/terms" style="color: #1d4ed8;">Terms of Service</a></li>
        <li><a href="${siteUrl}/privacy" style="color: #1d4ed8;">Privacy Policy</a></li>
      </ul>
      <p>Questions any time — just reply to this email.</p>
      <p style="color: #5b6470;">— Quendral</p>
    </div>
  `;
}

function internalNotificationHtml(data: IntakePayload) {
  const rows = (Object.keys(FIELD_LABELS) as (keyof IntakePayload)[])
    .filter((key) => data[key]?.trim())
    .map(
      (key) =>
        `<tr><td style="padding:4px 16px 4px 0; font-weight:600; vertical-align:top; white-space:nowrap;">${FIELD_LABELS[key]}</td><td style="padding:4px 0;">${data[key]}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family: -apple-system, Segoe UI, sans-serif; font-size: 14px; color: #17141d;">
      <h2>New client intake submission</h2>
      <table>${rows}</table>
    </div>
  `;
}

export async function POST(req: NextRequest) {
  let data: IntakePayload;
  try {
    data = (await req.json()) as IntakePayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!data.contactEmail) {
    return NextResponse.json({ error: "contactEmail is required" }, { status: 400 });
  }

  const internalRecipient = process.env.INTAKE_NOTIFICATION_EMAIL || "info@luminaeautomations.com";

  const [clientResult, internalResult] = await Promise.all([
    sendEmail(
      data.contactEmail,
      "Welcome to Quendral — let's get your systems live",
      welcomeEmailHtml(data)
    ),
    sendEmail(
      internalRecipient,
      `New Intake — ${data.businessName || data.contactName || "Unknown"}`,
      internalNotificationHtml(data)
    ),
  ]);

  return NextResponse.json({
    received: true,
    clientEmailSent: clientResult.sent,
    internalEmailSent: internalResult.sent,
    reason: !clientResult.sent ? clientResult.reason : undefined,
  });
}
