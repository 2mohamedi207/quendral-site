"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhyUs() {
  return (
    <section id="why-us" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why us"
          title={
            <>
              We&rsquo;re not going to pretend we have it all figured out.
              <span className="text-gradient"> We&rsquo;re going to earn it with you.</span>
            </>
          }
          align="center"
          className="mx-auto"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="gradient-border mx-auto mt-14 flex max-w-3xl flex-col gap-6 rounded-2xl p-8 sm:p-10"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-purple),var(--brand-pink))] text-white">
              <ShieldCheck size={18} strokeWidth={2.25} />
            </span>
            <span className="text-sm font-bold uppercase tracking-widest text-brand-purple-light">
              No highlight reel — just commitment
            </span>
          </div>
          <p className="text-lg leading-relaxed text-foreground/90">
            Quendral is a new studio built specifically for home services and real
            estate businesses — not a repurposed marketing agency. We don&rsquo;t have
            a decade of case studies to show you. What we do have is full attention:
            every client gets hands-on setup, fast responses, and someone who treats
            your business like it&rsquo;s the only one on our list.
          </p>
          <p className="leading-relaxed text-muted">
            We&rsquo;d rather tell you that upfront than hand you invented numbers or
            borrowed testimonials to look more established than we are. As we take on
            real clients, we&rsquo;ll publish real results — good or modest — instead
            of manufacturing them.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
