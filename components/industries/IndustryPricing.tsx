"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { PricingTierGrid } from "@/components/ui/PricingTierGrid";
import { PricingAddOns } from "@/components/ui/PricingAddOns";
import { pricingCommitment } from "@/lib/data";
import type { Industry } from "@/lib/industries";

export function IndustryPricing({ industry }: { industry: Industry }) {
  return (
    <section id="pricing" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title={`Pricing built for ${industry.shortLabel.toLowerCase()}`}
          description={pricingCommitment}
          align="center"
          className="mx-auto"
        />

        <PricingTierGrid tiers={industry.pricingTiers} industrySlug={industry.slug} />
        <PricingAddOns />
      </div>
    </section>
  );
}
