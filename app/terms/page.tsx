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
        <LegalDocument title="Terms of Service" effectiveDate="August 7, 2026">
          <section>
            <h2>1. Acceptance of terms</h2>
            <p>
              By accessing this site or engaging Quendral (&ldquo;we,&rdquo;
              &ldquo;us,&rdquo; &ldquo;our&rdquo;) for services, you agree to these
              Terms of Service. If you don&rsquo;t agree, please don&rsquo;t use the
              site or our services. This Site is owned and operated by Mohamed
              Ibrahim, operating as Quendral.
            </p>
          </section>

          <section>
            <h2>2. Intellectual property</h2>
            <p>
              All content on this site — including images, text, logos, documents,
              and downloadable files — is the property of Quendral and its
              creators. Any automation systems, landing pages, or websites we build
              for a client are governed by the ownership terms in that
              client&rsquo;s Service Agreement — as a general rule, clients own
              their own domain and website content once built.
            </p>
          </section>

          <section>
            <h2>3. Description of service</h2>
            <p>
              Quendral provides AI automation services — including lead capture,
              automated follow-up, CRM setup, and AI voice receptionists — for home
              service and real estate businesses. Specific scope, pricing, and
              deliverables for any engagement are set out in a separate Service
              Agreement between Quendral and the client.
            </p>
          </section>

          <section>
            <h2>4. Acceptable use</h2>
            <p>As a user of this site, you agree not to:</p>
            <ul className="list-disc pl-6">
              <li>Use the site for any illegal purpose</li>
              <li>Harass or mistreat other users of the site</li>
              <li>Violate the intellectual property rights of Quendral or any third party</li>
              <li>Attempt to access systems or accounts you&rsquo;re not authorized to access</li>
              <li>Act in any way that could be considered fraudulent</li>
              <li>Submit false information through our booking or intake forms</li>
            </ul>
            <p>
              If we believe you are using the site illegally or in a manner that
              violates these Terms, we reserve the right to limit, suspend, or
              terminate your access.
            </p>
          </section>

          <section>
            <h2>5. Subscriptions, payments &amp; refunds</h2>
            <p>
              Where a client purchases a recurring plan, the subscription
              automatically renews and is billed until we receive notice of
              cancellation. You may cancel at any time; upon cancellation, all
              future recurring payments stop immediately and access to services
              ends as of the cancellation date.
            </p>
            <p>
              Payments already made prior to cancellation — including setup fees
              and any billed subscription periods — are non-refundable, and no
              partial refunds are issued for unused time within a billing period.
              If Quendral is unable to deliver a service as described due to an
              error on our part, we will work with the client to resolve the
              issue — which may include a partial credit toward future services —
              at our discretion, rather than a cash refund.
            </p>
            <p>
              Accepted payment methods are processed securely through Stripe. By
              providing payment information, you authorize us to charge the agreed
              amount to that payment instrument on the agreed schedule.
            </p>
          </section>

          <section>
            <h2>6. Third-party services</h2>
            <p>
              Booking is handled through Calendly. Payments are processed through
              Stripe. Automated calls and texts may use Twilio and third-party
              voice AI providers. Transactional email is sent through Resend. These
              third parties have their own terms and privacy practices, which
              apply alongside ours when you use those features.
            </p>
          </section>

          <section>
            <h2>7. Consumer protection law</h2>
            <p>
              Where the Consumer Protection Act (Alberta) or any other consumer
              protection legislation in your jurisdiction applies and cannot be
              excluded, these Terms will not limit your legal rights and remedies
              under that legislation. If there is a conflict between these Terms
              and that legislation, the mandatory provisions of the legislation
              apply.
            </p>
          </section>

          <section>
            <h2>8. Disclaimers &amp; limitation of liability</h2>
            <p>
              Our services are provided &ldquo;as is.&rdquo; AI-driven systems
              (including call handling and automated messaging) include
              human-escalation fallbacks, but we can&rsquo;t guarantee they will
              handle every interaction perfectly. To the fullest extent permitted
              by law, Quendral and its owner, agents, and affiliates are not liable
              for indirect, incidental, or consequential damages arising from use
              of our services or this site.
            </p>
          </section>

          <section>
            <h2>9. Indemnity</h2>
            <p>
              Except where prohibited by law, by using this site or our services
              you agree to indemnify and hold harmless Quendral and its owner,
              agents, and affiliates from any claims, losses, damages, or expenses
              (including legal fees) arising from your use of the site or your
              violation of these Terms.
            </p>
          </section>

          <section>
            <h2>10. Changes to these terms</h2>
            <p>
              We may update these terms from time to time. Material changes will
              be reflected by an updated effective date on this page.
            </p>
          </section>

          <section>
            <h2>11. Governing law &amp; dispute resolution</h2>
            <p>
              These terms are governed by the laws of the Province of Alberta,
              Canada. If a dispute can&rsquo;t be resolved through informal
              discussion, both parties agree to first attempt resolution through a
              neutral mediator before pursuing other remedies. Either party
              retains the right to bring an action in small claims court or for
              injunctive relief or intellectual property infringement at any time.
            </p>
          </section>

          <section>
            <h2>12. Severability</h2>
            <p>
              If any provision of these Terms is found invalid or unenforceable
              under applicable law, that provision will be removed and the
              remaining provisions will continue in full effect.
            </p>
          </section>

          <section>
            <h2>13. Contact</h2>
            <p>
              Questions about these terms: info@luminaeautomations.com or
              (403) 688-2364.
            </p>
          </section>
        </LegalDocument>
      </main>
      <Footer />
    </>
  );
}
