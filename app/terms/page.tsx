import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LegalDocument } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Quendral.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <LegalDocument title="Terms of Service" effectiveDate="August 2, 2026">
          <section>
            <h2>1. Acceptance of terms</h2>
            <p>
              By accessing quendral.com or engaging Quendral (&ldquo;we,&rdquo;
              &ldquo;us,&rdquo; &ldquo;our&rdquo;) for services, you agree to these
              Terms of Service. If you don&rsquo;t agree, please don&rsquo;t use the
              site or our services.
            </p>
          </section>

          <section>
            <h2>2. Description of service</h2>
            <p>
              Quendral designs, builds, and maintains AI-powered automation systems
              — including lead capture, automated follow-up, CRM setup, and AI
              voice receptionists — for home service and real estate businesses.
              Specific scope, pricing, and deliverables for any engagement are set
              out in a separate Service Agreement between Quendral and the client.
            </p>
          </section>

          <section>
            <h2>3. Use of this website</h2>
            <p>
              You may browse this site and submit information through our booking
              and intake forms for the purpose of evaluating or engaging our
              services. You agree not to misuse the site — including submitting
              false information, attempting to access systems you&rsquo;re not
              authorized to access, or using the site to distribute malware or spam.
            </p>
          </section>

          <section>
            <h2>4. Third-party services</h2>
            <p>
              Booking is handled through Calendly. Automated calls and texts may
              use Twilio and third-party voice AI providers. These third parties
              have their own terms and privacy practices, which apply alongside
              ours when you use those features.
            </p>
          </section>

          <section>
            <h2>5. Intellectual property</h2>
            <p>
              The Quendral name, logo, and site content are owned by Quendral. Any
              automation systems, landing pages, or websites we build for a client
              are governed by the ownership terms in that client&rsquo;s Service
              Agreement — as a general rule, clients own their own domain and
              website content once built.
            </p>
          </section>

          <section>
            <h2>6. Disclaimers &amp; limitation of liability</h2>
            <p>
              Our services are provided &ldquo;as is.&rdquo; AI-driven systems
              (including call handling and automated messaging) include
              human-escalation fallbacks, but we can&rsquo;t guarantee they will
              handle every interaction perfectly. To the fullest extent permitted
              by law, Quendral is not liable for indirect, incidental, or
              consequential damages arising from use of our services or this site.
            </p>
          </section>

          <section>
            <h2>7. Changes to these terms</h2>
            <p>
              We may update these terms from time to time. Material changes will
              be reflected by an updated effective date on this page.
            </p>
          </section>

          <section>
            <h2>8. Governing law</h2>
            <p>
              These terms are governed by the laws of Alberta, Canada, without
              regard to conflict-of-law principles. <em>[Confirm this matches your
              actual business jurisdiction before publishing.]</em>
            </p>
          </section>

          <section>
            <h2>9. Contact</h2>
            <p>Questions about these terms: hello@quendral.com</p>
          </section>
        </LegalDocument>
      </main>
      <Footer />
    </>
  );
}
