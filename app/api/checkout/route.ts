import { NextRequest, NextResponse } from "next/server";
import { getIndustry } from "@/lib/industries";

interface CheckoutPayload {
  industrySlug?: string;
  tierName?: string;
}

function parseDollarsToCents(value: string): number | null {
  const cleaned = value.replace(/[^0-9.]/g, "");
  if (!cleaned) return null;
  const num = Number(cleaned);
  if (!Number.isFinite(num)) return null;
  return Math.round(num * 100);
}

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    console.warn("STRIPE_SECRET_KEY not set — checkout unavailable.");
    return NextResponse.json({ configured: false, reason: "checkout_not_configured" });
  }

  let data: CheckoutPayload;
  try {
    data = (await req.json()) as CheckoutPayload;
  } catch {
    return NextResponse.json({ configured: true, error: "Invalid request body" }, { status: 400 });
  }

  const industry = data.industrySlug ? getIndustry(data.industrySlug) : undefined;
  const tier = industry?.pricingTiers.find((t) => t.name === data.tierName);

  if (!industry || !tier) {
    return NextResponse.json({ configured: true, error: "Unknown plan." }, { status: 400 });
  }

  const setupCents = parseDollarsToCents(tier.setupPrice);
  const monthlyCents = parseDollarsToCents(tier.monthlyPrice);

  if (setupCents === null || monthlyCents === null) {
    return NextResponse.json(
      { configured: true, error: "This plan needs a custom quote — book a consultation instead." },
      { status: 400 }
    );
  }

  const currency = process.env.STRIPE_CURRENCY || "cad";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://quendral.com";

  const body = new URLSearchParams();
  body.set("mode", "subscription");
  body.set("success_url", `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`);
  body.set("cancel_url", `${siteUrl}/#pricing`);
  body.set("allow_promotion_codes", "true");
  body.set("line_items[0][quantity]", "1");
  body.set("line_items[0][price_data][currency]", currency);
  body.set(
    "line_items[0][price_data][product_data][name]",
    `${industry.shortLabel} — ${tier.name} setup`
  );
  body.set("line_items[0][price_data][unit_amount]", String(setupCents));
  body.set("line_items[1][quantity]", "1");
  body.set("line_items[1][price_data][currency]", currency);
  body.set(
    "line_items[1][price_data][product_data][name]",
    `${industry.shortLabel} — ${tier.name} monthly`
  );
  body.set("line_items[1][price_data][unit_amount]", String(monthlyCents));
  body.set("line_items[1][price_data][recurring][interval]", "month");
  // Setup fee bills immediately at checkout; the recurring monthly price
  // doesn't start invoicing until the 30-day trial on the subscription ends.
  body.set("subscription_data[trial_period_days]", "30");

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${secretKey}:`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const responseData = await res.json();

  if (!res.ok) {
    console.error("Stripe checkout session creation failed:", responseData);
    return NextResponse.json(
      { configured: true, error: "Something went wrong starting checkout." },
      { status: 502 }
    );
  }

  return NextResponse.json({ configured: true, url: responseData.url as string });
}
