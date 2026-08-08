"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CTABanner() {
  return (
    <section id="contact" className="relative overflow-hidden bg-accent py-28 sm:py-36">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 text-center lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-white"
        >
          Ready to put your busywork on autopilot?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg text-lg text-white/85"
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
          <Button
            href="/book"
            className="!bg-white !text-accent hover:!bg-white/90"
          >
            Free Consultation
            <ArrowRight size={16} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
