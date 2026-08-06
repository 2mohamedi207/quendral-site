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
        <LegalDocument title="Privacy Policy" effectiveDate="August 2, 2026">
          <section>
            <h2>1. What we collect</h2>
            <p>When you use this site or become a client, we may collect:</p>
            <ul className="list-disc pl-6">
              <li>
                Contact and business information you submit through our intake or
                booking forms — name, email, phone, business name, service area,
                and similar details.
              </li>
              <li>
                Booking details when you schedule a call through Calendly (name,
                email, phone, and the appointment time).
              </li>
              <li>
                For active clients: information needed to build and run your
                automation system, such as CRM data, call transcripts, and lead
                records.
              </li>
            </ul>
          </section>

          <section>
            <h2>2. How we use it</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6">
              <li>Respond to inquiries and book consultations</li>
              <li>Build, run, and support your automation system if you become a client</li>
              <li>Send appointment confirmations and reminders</li>
              <li>Send account and service-related communications</li>
            </ul>
            <p>We don&rsquo;t sell your information to third parties.</p>
          </section>

          <section>
            <h2>3. Third-party processors</h2>
            <p>
              Depending on which features you use, your information may pass
              through: Calendly (scheduling), Twilio (SMS/calling), an email
              delivery provider (transactional email), and, for clients on the AI
              receptionist plan, a voice AI platform used to answer calls. Each of
              these providers processes data under their own privacy policies.
            </p>
          </section>

          <section>
            <h2>4. Data retention</h2>
            <p>
              We keep client data for as long as the engagement is active, plus a
              reasonable period afterward for records and legal purposes. You can
              request deletion of your data at any time — see Section 6.
            </p>
          </section>

          <section>
            <h2>5. Cookies</h2>
            <p>
              This site does not currently use tracking or advertising cookies.
              If that changes, this policy will be updated to reflect it.
            </p>
          </section>

          <section>
            <h2>6. Your rights</h2>
            <p>
              You can request access to, correction of, or deletion of your
              personal information by emailing hello@quendral.com.
            </p>
          </section>

          <section>
            <h2>7. Changes to this policy</h2>
            <p>
              We may update this policy from time to time. Material changes will
              be reflected by an updated effective date on this page.
            </p>
          </section>

          <section>
            <h2>8. Contact</h2>
            <p>Questions about this policy: hello@quendral.com</p>
          </section>
        </LegalDocument>
      </main>
      <Footer />
    </>
  );
}
