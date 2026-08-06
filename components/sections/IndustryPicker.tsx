"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industries } from "@/lib/industries";

export function IndustryPicker() {
  return (
    <section id="industries" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="What we do for you"
          title={
            <>
              What kind of business
              <span className="text-gradient"> are you?</span>
            </>
          }
          description="Pick your industry and see exactly how we automate lead generation, follow-up, and CRM management for businesses like yours."
          align="center"
          className="mx-auto"
        />

        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.slug}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={`/industries/${industry.slug}`}
                  className="gradient-border group flex h-full flex-col gap-6 rounded-2xl p-8 transition-shadow duration-300 hover:shadow-[0_0_50px_-12px_rgba(139,92,246,0.6)]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-purple),var(--brand-pink))] text-white transition-transform duration-300 group-hover:scale-110">
                    <Icon size={26} strokeWidth={2.25} />
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <h3 className="text-2xl font-bold tracking-tight">
                      {industry.shortLabel}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">{industry.tagline}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-purple-light">
                    See how it works
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
