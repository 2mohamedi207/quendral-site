"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GradientBlob } from "@/components/ui/GradientBlob";

export function CTABanner() {
  return (
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
          Ready to put your
          <br />
          <span className="text-gradient">busywork on autopilot?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg text-lg text-muted"
        >
          Book a free 30-minute consultation. We&rsquo;ll show you exactly where AI
          automation pays for itself in your operation.
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
  );
}
