"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, MessageSquare, ClipboardCheck, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

const steps = [
  {
    icon: Phone,
    time: "4:12 PM",
    title: "Missed call",
    detail: "Customer needs a quote — you're on a job site",
  },
  {
    icon: MessageSquare,
    time: "4:12 PM",
    title: "Instant text sent",
    detail: "Automatic reply, 8 seconds after the missed call",
  },
  {
    icon: ClipboardCheck,
    time: "4:14 PM",
    title: "Job details captured",
    detail: "Service type, address, and urgency, from the reply",
  },
  {
    icon: CalendarCheck,
    time: "4:15 PM",
    title: "Booked to your calendar",
    detail: "Confirmed for Thursday 10am — no callback needed",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 lg:pt-40">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8">
        <div className="flex flex-col items-start gap-7">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl text-[clamp(2.75rem,6vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-foreground"
          >
            Never lose a job to a missed call again.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-lg text-lg leading-relaxed text-muted"
          >
            Quendral answers every call and quote request the second it comes
            in — while you&rsquo;re on a roof, under a sink, or with another
            customer — so the job stays yours, not your competitor&rsquo;s.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-md rounded-3xl border border-border-subtle bg-background-elevated p-6 shadow-card-lg sm:p-7"
        >
          <div className="flex items-center justify-between border-b border-border-subtle pb-4">
            <div>
              <p className="text-sm font-bold tracking-[-0.01em]">How a missed call becomes a booked job</p>
              <p className="text-xs text-muted">Example walkthrough</p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-accent-tint px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-accent">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
              Live
            </span>
          </div>

          <ol className="flex flex-col gap-5 pt-5">
            {steps.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-3.5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-tint text-accent">
                  <step.icon size={16} strokeWidth={2.25} />
                </span>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-sm font-bold tracking-[-0.01em]">{step.title}</p>
                    <span className="shrink-0 text-xs text-muted">{step.time}</span>
                  </div>
                  <p className="mt-0.5 text-sm leading-snug text-muted">{step.detail}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
