import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "You're In",
  description: "Payment received — next steps for your Quendral setup.",
};

export default function CheckoutSuccessPage() {
  return (
    <>
      <Navbar />
      <main className="relative flex-1 overflow-hidden pb-24 pt-36">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 text-center lg:px-8">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-tint text-accent">
            <CheckCircle2 size={28} strokeWidth={2.25} />
          </span>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            You&rsquo;re in. Let&rsquo;s get you set up.
          </h1>
          <p className="text-lg text-muted">
            Payment received — a confirmation is on its way to your email. Next, fill
            out our intake form so we can start building, and grab a time on our
            calendar for your kickoff call.
          </p>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row">
            <Button href="/intake">Start Intake Form</Button>
            <Button href="/book" variant="secondary">
              Book Kickoff Call
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted">
            Questions in the meantime? Email{" "}
            <a
              href="mailto:info@luminaeautomations.com"
              className="text-accent hover:underline"
            >
              info@luminaeautomations.com
            </a>{" "}
            or call{" "}
            <a href="tel:+14036882364" className="text-accent hover:underline">
              403-688-2364
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
