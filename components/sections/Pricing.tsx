"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { PricingTierGrid } from "@/components/ui/PricingTierGrid";
import { PricingAddOns } from "@/components/ui/PricingAddOns";
import { pricingCommitment } from "@/lib/data";
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

        <PricingTierGrid tiers={activeIndustry.pricingTiers} industrySlug={activeIndustry.slug} />
        <PricingAddOns />
      </div>
    </section>
  );
}
