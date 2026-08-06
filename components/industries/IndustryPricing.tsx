"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PricingTierGrid } from "@/components/ui/PricingTierGrid";
import { PricingAddOns } from "@/components/ui/PricingAddOns";
import { foundingOffer, pricingCommitment } from "@/lib/data";
import type { Industry } from "@/lib/industries";

export function IndustryPricing({ industry }: { industry: Industry }) {
  return (
    <section id="pricing" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Pricing built for
              <span className="text-gradient"> {industry.shortLabel.toLowerCase()}</span>
            </>
          }
          description={pricingCommitment}
          align="center"
          className="mx-auto"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-12 flex max-w-2xl items-start gap-3 rounded-2xl border border-brand-purple-light/30 bg-brand-purple-light/5 p-6"
        >
          <Sparkles size={20} className="mt-0.5 shrink-0 text-brand-pink-light" />
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-brand-purple-light">
              {foundingOffer.headline} — limited to {foundingOffer.cap} clients
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{foundingOffer.description}</p>
          </div>
        </motion.div>

        <PricingTierGrid tiers={industry.pricingTiers} />
        <PricingAddOns />
      </div>
    </section>
  );
}
