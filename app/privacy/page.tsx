import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LegalDocument } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Quendral.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <LegalDocument title="Privacy Policy" effectiveDate="August 7, 2026">
          <section>
            <h2>1. Purpose &amp; consent</h2>
            <p>
              This site is owned and operated by Mohamed Ibrahim, operating as
              Quendral. This policy explains what personal data we collect, how we
              use it, who has access to it, and your rights. By using this site,
              you consent to the collection and use of data as described here.
            </p>
          </section>

          <section>
            <h2>2. What we collect</h2>
            <p>When you visit this site, we may automatically collect:</p>
            <ul className="list-disc pl-6">
              <li>IP address and general location</li>
              <li>Device and browser details</li>
              <li>Pages visited and links clicked</li>
            </ul>
            <p>When you use our forms or become a client, we may also collect:</p>
            <ul className="list-disc pl-6">
              <li>
                Contact and business information submitted through our intake or
                booking forms — name, email, phone, business name, service area,
                and similar details.
              </li>
              <li>
                Booking details when you schedule a call through Calendly (name,
                email, phone, and appointment time).
              </li>
              <li>Payment information, processed securely through Stripe.</li>
              <li>
                For active clients: information needed to build and run your
                automation system, such as CRM data, call transcripts, and lead
                records.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. How we use it</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6">
              <li>Respond to inquiries and book consultations</li>
              <li>Process payments for services purchased</li>
              <li>Build, run, and support your automation system if you become a client</li>
              <li>Send appointment confirmations and reminders</li>
              <li>Send account and service-related communications</li>
            </ul>
            <p>We don&rsquo;t sell your information to third parties.</p>
          </section>

          <section>
            <h2>4. Who we share data with</h2>
            <p>
              We don&rsquo;t share your data with third parties except: where
              required by law, where required for a legal proceeding, to protect
              our legal rights, or with a buyer in the event we sell the business.
              Depending on which features you use, your information may also pass
              through our service providers: Calendly (scheduling), Stripe
              (payments), Twilio (SMS/calling), Resend (transactional email), and,
              for clients on the AI receptionist plan, a voice AI platform used to
              answer calls. Each processes data under its own privacy policy.
            </p>
          </section>

          <section>
            <h2>5. Data retention</h2>
            <p>
              We keep client data for as long as the engagement is active, plus a
              reasonable period afterward for records and legal purposes. You can
              request deletion of your data at any time — see Section 8.
            </p>
          </section>

          <section>
            <h2>6. How we protect your data</h2>
            <p>
              We use standard encryption and secure hosting to protect your data.
              While we take reasonable precautions, no method of transmission or
              storage over the internet is 100% secure, and we can&rsquo;t
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2>7. Cookies</h2>
            <p>
              This site does not currently use tracking or advertising cookies.
              If that changes, this policy will be updated to reflect it.
            </p>
          </section>

          <section>
            <h2>8. Your rights</h2>
            <p>
              You can request access to, correction of, or deletion of your
              personal information by emailing info@luminaeautomations.com or
              calling our privacy line at (403) 838-9103.
            </p>
          </section>

          <section>
            <h2>9. Changes to this policy</h2>
            <p>
              We may update this policy from time to time. Material changes will
              be reflected by an updated effective date on this page.
            </p>
          </section>

          <section>
            <h2>10. Contact</h2>
            <p>
              Questions about this policy: info@luminaeautomations.com or
              (403) 688-2364. Privacy-specific requests: (403) 838-9103.
            </p>
          </section>
        </LegalDocument>
      </main>
      <Footer />
    </>
  );
}
