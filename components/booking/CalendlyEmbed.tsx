"use client";

import { CalendarClock, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

// TODO: this Calendly slug ("luminaeautomations-info") still has the old business
// name. Rename it in Calendly (Account Settings) to something under "Quendral",
// then update this URL to match.
const CALENDLY_URL = "https://calendly.com/luminaeautomations-info/30min";

export function CalendlyEmbed() {
  return (
    <div className="gradient-border flex flex-col items-center gap-6 rounded-2xl p-10 text-center sm:p-14">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-purple),var(--brand-pink))] text-white">
        <CalendarClock size={28} strokeWidth={2.25} />
      </span>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold tracking-tight">Open the booking calendar</h2>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          Opens in a new tab — pick a time that works, and we&rsquo;ll send a
          confirmation to your email.
        </p>
      </div>
      <Button href={CALENDLY_URL} className="!inline-flex">
        Book Your Free Consultation
        <ArrowUpRight size={16} />
      </Button>
    </div>
  );
}
