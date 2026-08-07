"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { IndustryPricingTier } from "@/lib/industries";

function isCustomQuoteTier(tier: IndustryPricingTier) {
  return tier.setupPrice === "Custom" || tier.monthlyPrice.includes("+");
}

export function PricingTierGrid({
  tiers,
  industrySlug,
}: {
  tiers: IndustryPricingTier[];
  industrySlug: string;
}) {
  const [openTier, setOpenTier] = useState<string | null>(null);
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (redirectUrl) window.location.href = redirectUrl;
  }, [redirectUrl]);

  async function handleGetStarted(tier: IndustryPricingTier) {
    setLoadingTier(tier.name);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industrySlug, tierName: tier.name }),
      });
      const data = await res.json();
      if (data.configured && data.url) {
        setRedirectUrl(data.url);
        return;
      }
    } catch (err) {
      console.error("Checkout request failed:", err);
    }
    setLoadingTier(null);
    setRedirectUrl("/book");
  }

  return (
    <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
      {tiers.map((tier, index) => {
        const isOpen = openTier === tier.name;
        return (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`relative flex flex-col gap-6 rounded-2xl p-8 ${
              tier.highlighted
                ? "gradient-border shadow-[0_0_50px_-12px_rgba(139,92,246,0.6)]"
                : "border border-white/10 bg-background-elevated"
            }`}
          >
            {tier.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[linear-gradient(115deg,var(--brand-blue),var(--brand-purple),var(--brand-pink))] px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
                Most Popular
              </span>
            )}
            <div>
              <h3 className="text-lg font-bold tracking-tight">{tier.name}</h3>
              <p className="mt-1 text-sm text-muted">{tier.description}</p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black tracking-tight">{tier.monthlyPrice}</span>
                {tier.monthlyPrice.startsWith("$") && (
                  <span className="text-sm text-muted">/ month</span>
                )}
              </div>
              <span className="text-xs text-muted">
                {tier.setupPrice === "Custom"
                  ? "Custom setup fee"
                  : `${tier.setupPrice} one-time setup`}
              </span>
            </div>
            <ul className="flex flex-1 flex-col gap-3">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-muted">
                  <Check size={16} className="mt-0.5 shrink-0 text-brand-pink-light" />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setOpenTier(isOpen ? null : tier.name)}
              className="flex items-center justify-center gap-1.5 text-xs font-semibold text-brand-purple-light transition-colors hover:text-brand-pink-light"
            >
              {isOpen ? "Hide" : "See exactly what's included"}
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <ChevronDown size={14} />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <ol className="flex flex-col gap-3 border-t border-white/10 pt-4">
                    {tier.detailedSteps.map((step, stepIndex) => (
                      <li key={step} className="flex items-start gap-3 text-sm text-muted">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/5 text-[11px] font-bold text-brand-purple-light">
                          {stepIndex + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </motion.div>
              )}
            </AnimatePresence>

            {isCustomQuoteTier(tier) ? (
              <Button
                href="/book"
                variant={tier.highlighted ? "primary" : "secondary"}
                className="w-full"
              >
                Get Started
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => handleGetStarted(tier)}
                variant={tier.highlighted ? "primary" : "secondary"}
                className="w-full"
              >
                {loadingTier === tier.name ? "Redirecting…" : "Get Started"}
              </Button>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
