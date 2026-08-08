import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CalendlyEmbed } from "@/components/booking/CalendlyEmbed";

export const metadata: Metadata = {
  title: "Free Consultation",
  description: "Book a free 30-minute consultation with Quendral.",
};

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main className="relative flex-1 overflow-hidden pb-24 pt-36">
        <div className="mx-auto flex max-w-2xl flex-col gap-4 px-6 text-center lg:px-8">
          <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-accent-tint px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
            Free Consultation
          </span>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            Let&rsquo;s find where automation pays for itself
          </h1>
          <p className="text-lg text-muted">
            Pick a time that works for you — we&rsquo;ll confirm by email.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl px-6 lg:px-8">
          <CalendlyEmbed />
        </div>
      </main>
      <Footer />
    </>
  );
}
