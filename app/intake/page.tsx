import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IntakeForm } from "@/components/intake/IntakeForm";

export const metadata: Metadata = {
  title: "New Client Intake",
  description: "Tell us about your business so we can get your systems live.",
};

export default function IntakePage() {
  return (
    <>
      <Navbar />
      <main className="relative flex-1 overflow-hidden pb-24 pt-36">
        <div className="mx-auto flex max-w-2xl flex-col gap-4 px-6 text-center lg:px-8">
          <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-accent-tint px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
            New Client Intake
          </span>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            Let&rsquo;s get your systems live
          </h1>
          <p className="text-lg text-muted">
            A few minutes now saves a lot of back-and-forth later. Nothing here
            requires a password — just information.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl px-6 lg:px-8">
          <IntakeForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
