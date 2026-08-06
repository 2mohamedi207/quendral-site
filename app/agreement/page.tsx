import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LegalDocument } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Service Agreement",
  description: "Service Agreement template for Quendral clients.",
};

export default function AgreementPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <LegalDocument title="Service Agreement" effectiveDate="August 2, 2026">
          <section>
            <p>
              This is a fill-in-the-brackets template for a per-client agreement —
              copy it into a proper e-signature tool (e.g. Dropbox Sign, PandaDoc)
              for actual signing. It isn&rsquo;t meant to be signed directly off
              this page.
            </p>
          </section>

          <section>
            <h2>1. Parties</h2>
            <p>
              This agreement is between <strong>Quendral</strong> (&ldquo;we,&rdquo;
              &ldquo;us&rdquo;) and <em>[Client Business Name]</em>{" "}
              (&ldquo;you,&rdquo; &ldquo;client&rdquo;), effective{" "}
              <em>[Start Date]</em>.
            </p>
          </section>

          <section>
            <h2>2. Services</h2>
            <p>
              We&rsquo;ll build and maintain the following for you, as selected:
            </p>
            <ul className="list-disc pl-6">
              <li>
                Plan: <em>[Core / Plus / Multi-Crew — or Solo Agent / Team /
                Brokerage]</em>
              </li>
              <li>Dedicated lead-capture landing page</li>
              <li>Instant call/text/email response system</li>
              <li>CRM setup and ongoing management</li>
              <li>
                <em>[Add any plan-specific items: AI receptionist, multi-crew
                routing, showing coordination, etc.]</em>
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Fees</h2>
            <ul className="list-disc pl-6">
              <li>One-time setup fee: <em>[$Amount]</em>, due before work begins</li>
              <li>Monthly retainer: <em>[$Amount]</em>/month, billed starting on go-live</li>
              <li>
                Platform costs (Twilio, AI receptionist minutes, and similar
                usage-based charges) are billed at cost and itemized monthly —
                not included in the retainer above.
              </li>
              <li>
                <em>[If applicable]</em> Website plan: $99/month, 12-month minimum
                on the initial build, then month-to-month.
              </li>
            </ul>
          </section>

          <section>
            <h2>4. Term &amp; termination</h2>
            <p>
              This agreement is month-to-month starting from go-live. Either party
              may cancel with <em>[30 days&rsquo;]</em> written notice. No
              long-term contract, except the 12-month minimum noted above if you
              take the website plan.
            </p>
          </section>

          <section>
            <h2>5. Ownership</h2>
            <p>
              You own your domain name and website content. If you cancel, we&rsquo;ll
              hand over full access to your site and domain — we don&rsquo;t hold
              anything hostage. The underlying automation workflows and any
              proprietary tooling we use to run them remain ours.
            </p>
          </section>

          <section>
            <h2>6. Client responsibilities</h2>
            <p>
              You agree to provide accurate business information (via our intake
              form or otherwise) and reasonably timely feedback during setup.
              Delays in providing needed information may delay go-live.
            </p>
          </section>

          <section>
            <h2>7. Confidentiality</h2>
            <p>
              We&rsquo;ll keep your business and customer data confidential and use
              it only to build and run your automation system.
            </p>
          </section>

          <section>
            <h2>8. Limitation of liability</h2>
            <p>
              Our total liability under this agreement is limited to the fees paid
              by you in the 3 months prior to the claim. We&rsquo;re not liable for
              indirect or consequential damages.
            </p>
          </section>

          <section>
            <h2>9. Governing law</h2>
            <p>
              This agreement is governed by the laws of <em>[Alberta, Canada —
              confirm]</em>.
            </p>
          </section>

          <section>
            <h2>Signatures</h2>
            <p>
              <em>[Client Name / Title / Date]</em>
              <br />
              <em>[Quendral Representative / Date]</em>
            </p>
          </section>
        </LegalDocument>
      </main>
      <Footer />
    </>
  );
}
