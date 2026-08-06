"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IndustryPricing } from "@/components/industries/IndustryPricing";
import { getIndustry } from "@/lib/industries";

export function IndustryPageContent({ slug }: { slug: string }) {
  const industry = getIndustry(slug);
  if (!industry) return null;

  return (
    <>
      <section className="relative flex min-h-[85vh] items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <GradientBlob
            className="-left-40 -top-40"
            colors={["var(--brand-blue)", "var(--brand-purple)"]}
            size={550}
          />
          <GradientBlob
            className="-right-32 top-10"
            colors={["var(--brand-purple)", "var(--brand-pink)"]}
            size={450}
            slow
          />
        </div>

        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-8 px-6 lg:px-8">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Back to Quendral
          </Link>

          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-brand-purple-light"
          >
            {industry.heroEyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl text-[clamp(2.75rem,6.5vw,5.5rem)] font-black leading-[0.98] tracking-tight"
          >
            {industry.heroTitleLines[0]}
            <br />
            <span className="text-gradient">{industry.heroTitleLines[1]}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
          >
            {industry.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button href="/book">
              Free Consultation
              <ArrowRight size={16} />
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="relative py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="The problem"
            title={<>Where {industry.audienceNoun} lose time and revenue</>}
            align="center"
            className="mx-auto"
          />
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {industry.painPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-2xl border border-white/10 bg-background-elevated p-8"
              >
                <h3 className="mb-3 text-lg font-bold tracking-tight">{point.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="What we automate"
            title={
              <>
                Built specifically for
                <span className="text-gradient"> {industry.audienceNoun}</span>
              </>
            }
            description="Every system below is built and tuned around how your business actually operates — not a generic template."
          />
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industry.offerings.map((offering, index) => {
              const Icon = offering.icon;
              return (
                <motion.div
                  key={offering.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6 }}
                  className="gradient-border flex flex-col gap-5 rounded-2xl p-8 transition-shadow duration-300 hover:shadow-[0_0_40px_-12px_rgba(139,92,246,0.5)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-purple),var(--brand-pink))] text-white">
                    <Icon size={22} strokeWidth={2.25} />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">{offering.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{offering.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <IndustryPricing industry={industry} />

      <section id="contact" className="relative overflow-hidden py-28 sm:py-36">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <GradientBlob
            className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            colors={["var(--brand-blue)", "var(--brand-pink)"]}
            size={700}
          />
        </div>
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 text-center lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[1.02] tracking-tight"
          >
            {industry.ctaHeadlineLines[0]}
            <br />
            <span className="text-gradient">{industry.ctaHeadlineLines[1]}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-lg text-lg text-muted"
          >
            {industry.ctaSubtext}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button href="/book">
              Free Consultation
              <ArrowRight size={16} />
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
