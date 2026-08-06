"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GradientBlob } from "@/components/ui/GradientBlob";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <GradientBlob
          className="-left-40 -top-40"
          colors={["var(--brand-blue)", "var(--brand-purple)"]}
          size={600}
        />
        <GradientBlob
          className="-right-32 top-20"
          colors={["var(--brand-purple)", "var(--brand-pink)"]}
          size={500}
          slow
        />
        <GradientBlob
          className="bottom-0 left-1/3"
          colors={["var(--brand-pink)", "var(--brand-blue)"]}
          size={450}
        />
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-8 px-6 lg:px-8">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-brand-purple-light"
        >
          AI Automation Agency
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl text-[clamp(3rem,8vw,7rem)] font-black leading-[0.95] tracking-tight"
        >
          Automate the
          <br />
          <span className="text-gradient">future with AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
        >
          We design and build AI-powered workflows, agents, and integrations
          that eliminate busywork and scale your operations — without scaling
          headcount.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <Button href="/book">
            Free Consultation
            <ArrowRight size={16} />
          </Button>
          <Button href="#why-us" variant="secondary">
            Why Us
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-muted"
        >
          <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
