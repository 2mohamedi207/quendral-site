"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/data";

export function Process() {
  return (
    <section id="process" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="From consultation to autopilot"
          description="A five-stage process built to move fast without breaking what already works."
        />

        <div className="relative mt-20">
          <div className="absolute left-6 top-6 bottom-16 hidden w-px bg-border-subtle sm:block" />
          <div className="flex flex-col gap-12">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8 sm:pl-16"
                >
                  <div className="absolute left-0 hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-background ring-4 ring-background sm:flex">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-tint text-accent">
                      <Icon size={20} strokeWidth={2.25} />
                    </div>
                  </div>
                  <span className="text-sm font-black text-muted sm:hidden">{step.number}</span>
                  <div className="flex-1 border-b border-border-subtle pb-10 sm:border-b-0 sm:pb-0">
                    <div className="mb-2 flex items-baseline gap-3">
                      <span className="hidden text-sm font-black text-muted sm:inline">
                        {step.number}
                      </span>
                      <h3 className="text-2xl font-bold tracking-[-0.02em]">{step.title}</h3>
                    </div>
                    <p className="max-w-xl leading-relaxed text-muted">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
