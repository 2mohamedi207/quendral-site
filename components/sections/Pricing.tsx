"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PricingTierGrid } from "@/components/ui/PricingTierGrid";
import { PricingAddOns } from "@/components/ui/PricingAddOns";
import { foundingOffer, pricingCommitment } from "@/lib/data";
import { getIndustry } from "@/lib/industries";

export function Pricing() {
  const activeIndustry = getIndustry("home-services")!;

  return (
    <section id="pricing" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Pricing built around what a lead is worth to you"
          description={pricingCommitment}
          align="center"
          className="mx-auto"
        />

        <motion.div
          key={activeIndustry.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-10 flex max-w-2xl items-start gap-3 rounded-2xl border border-accent/25 bg-accent-tint p-6"
        >
          <Sparkles size={20} className="mt-0.5 shrink-0 text-accent" />
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-accent">
              {foundingOffer.headline} — limited to {foundingOffer.cap} clients
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{foundingOffer.description}</p>
          </div>
        </motion.div>

        <PricingTierGrid tiers={activeIndustry.pricingTiers} industrySlug={activeIndustry.slug} />
        <PricingAddOns />
      </div>
    </section>
  );
}
