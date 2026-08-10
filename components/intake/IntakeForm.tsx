"use client";

import { useState, useRef, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check, Send, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface FieldConfig {
  key: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "textarea";
  required?: boolean;
  helper?: string;
}

interface SectionConfig {
  title: string;
  fields: FieldConfig[];
}

const SECTIONS: SectionConfig[] = [
  {
    title: "Business basics",
    fields: [
      { key: "businessName", label: "Business name", required: true },
      { key: "contactName", label: "Your name", required: true },
      { key: "contactEmail", label: "Your email", type: "email", required: true },
      { key: "contactPhone", label: "Your phone", type: "tel", required: true },
      {
        key: "trade",
        label: "Your trade",
        placeholder: "e.g. Plumbing, Electrical, HVAC, Roofing",
        required: true,
      },
      { key: "serviceArea", label: "Service area(s)", placeholder: "e.g. Calgary + 25km radius" },
      {
        key: "services",
        label: "Services you offer",
        type: "textarea",
        placeholder: "e.g. window cleaning, gutters, holiday lighting",
      },
      { key: "businessHours", label: "Business hours" },
      {
        key: "escalationPhone",
        label: "Escalation phone number",
        type: "tel",
        helper: "Who should calls/texts go to when the AI can't handle something?",
      },
    ],
  },
  {
    title: "Phone & AI receptionist",
    fields: [
      {
        key: "businessPhone",
        label: "Business phone customers call",
        type: "tel",
        helper: "The number that needs to connect to the AI receptionist.",
      },
      {
        key: "phoneSetup",
        label: "Forward your current number, or get a new one?",
        placeholder: "Forward my existing number / Get a new number",
      },
      {
        key: "afterHours",
        label: "When should the AI answer?",
        placeholder: "24/7 / Only after-hours / Only when I can't pick up",
      },
      {
        key: "urgentHandling",
        label: "How should genuinely urgent calls be handled?",
        type: "textarea",
        placeholder: "e.g. burst pipe, no heat in winter — who gets called, how fast",
      },
      {
        key: "neverPromise",
        label: "Anything the receptionist should never say or promise?",
        type: "textarea",
        placeholder: "e.g. never quote an exact price, never promise same-day service",
      },
    ],
  },
  {
    title: "Calendar & booking",
    fields: [
      {
        key: "currentCalendar",
        label: "What do you use today to book appointments, if anything?",
        placeholder: "Nothing, a paper calendar, Google Calendar, etc.",
      },
      {
        key: "appointmentLength",
        label: "Typical length of a consultation or estimate visit",
        placeholder: "e.g. 30 minutes, 1 hour",
      },
    ],
  },
  {
    title: "Website & domain",
    fields: [
      {
        key: "hasWebsite",
        label: "Do you have a website?",
        placeholder: "Yes, keep it / Yes, but I want the new site / No, I need one",
      },
      { key: "websiteUrl", label: "Current website URL (if any)", placeholder: "https://" },
      { key: "domainName", label: "Domain name (if different)" },
    ],
  },
  {
    title: "Email",
    fields: [
      {
        key: "notifyEmail",
        label: "Where should new-lead notifications go?",
        type: "email",
        helper: "No password needed — just the address.",
      },
    ],
  },
  {
    title: "Your lead-to-job process",
    fields: [
      {
        key: "leadStages",
        label: "Walk me through what happens from a new lead to a paid job, step by step",
        type: "textarea",
        placeholder: "e.g. quote request → site visit → written estimate → deposit → scheduled → done",
        helper: "This is what your CRM pipeline stages get built from.",
      },
      {
        key: "averageJobValue",
        label: "Typical or average job value",
        placeholder: "e.g. $5,000–$15,000, or varies widely",
      },
    ],
  },
  {
    title: "CRM & team",
    fields: [
      {
        key: "currentCrm",
        label: "What do you use today?",
        placeholder: "Spreadsheet, nothing, or name your current CRM",
      },
      {
        key: "existingDataExport",
        label: "Existing customer/lead data to import?",
        placeholder: "Link to a spreadsheet/export, or \"nothing to import\"",
      },
      {
        key: "teamAccess",
        label: "Who needs login access?",
        type: "textarea",
        placeholder: "Names, emails, roles — owner, office manager, crew leads...",
      },
    ],
  },
  {
    title: "Crew & routing",
    fields: [
      {
        key: "crewList",
        label: "List your crews/team members and their service area or specialty",
        type: "textarea",
        placeholder: "Name — area or specialty, one per line",
        helper: "Skip this if it's just you right now.",
      },
    ],
  },
  {
    title: "Invoicing",
    fields: [
      {
        key: "invoicingMethod",
        label: "How do you invoice customers today?",
        placeholder: "e.g. paper invoice, e-transfer request by text, nothing formal",
      },
      {
        key: "paymentMethods",
        label: "What payment methods do you accept?",
        placeholder: "e.g. e-transfer, card, cheque",
      },
      {
        key: "autoInvoice",
        label: "Want invoices sent automatically once a job's marked complete?",
        placeholder: "Yes / No / Not sure yet",
      },
    ],
  },
  {
    title: "Brand & voice",
    fields: [
      {
        key: "brandAssets",
        label: "Link to logo/photos",
        placeholder: "Google Drive, Dropbox, etc.",
      },
      {
        key: "commonQuestions",
        label: "Questions customers always ask",
        type: "textarea",
        placeholder: "e.g. \"Do you serve my area?\" \"How much roughly?\" \"How fast can you come out?\"",
      },
      {
        key: "toneNotes",
        label: "Anything specific about how you talk to customers?",
        type: "textarea",
      },
    ],
  },
  {
    title: "Anything else",
    fields: [{ key: "notes", label: "Notes", type: "textarea" }],
  },
];

function readFormValues(form: HTMLFormElement): Record<string, string> {
  const data = new FormData(form);
  const result: Record<string, string> = {};
  for (const [key, value] of data.entries()) {
    if (typeof value === "string") result[key] = value;
  }
  return result;
}

function buildSummary(values: Record<string, string>) {
  const lines: string[] = [];
  for (const section of SECTIONS) {
    const sectionLines = section.fields
      .filter((f) => values[f.key]?.trim())
      .map((f) => `${f.label}: ${values[f.key]}`);
    if (sectionLines.length > 0) {
      lines.push(`— ${section.title} —`);
      lines.push(...sectionLines);
      lines.push("");
    }
  }
  return lines.join("\n").trim();
}

type SubmitState = "idle" | "submitting" | "success" | "error";

export function IntakeForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  function update(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleCopy() {
    const current = formRef.current ? readFormValues(formRef.current) : values;
    await navigator.clipboard.writeText(buildSummary(current));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleEmailIn() {
    const current = formRef.current ? readFormValues(formRef.current) : values;
    const businessName = current.businessName || "New Client";
    const href = `mailto:info@luminaeautomations.com?subject=${encodeURIComponent(
      `New Client Intake — ${businessName}`
    )}&body=${encodeURIComponent(buildSummary(current))}`;
    window.location.href = href;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitState("submitting");
    try {
      // Read straight from the DOM instead of trusting React state — some
      // browsers' autofill sets input values without firing the events React
      // listens for, which can leave `values` stale even though the fields
      // look filled on screen.
      const current = readFormValues(e.currentTarget);
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(current),
      });
      const data = await res.json();
      if (res.ok && data.received) {
        setSubmitState("success");
      } else {
        setSubmitState("error");
      }
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-10">
      {SECTIONS.map((section) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-5 rounded-2xl border border-border-subtle bg-background-elevated p-8 shadow-card"
        >
          <h2 className="text-lg font-bold tracking-tight">{section.title}</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {section.fields.map((field) => (
              <div
                key={field.key}
                className={`flex flex-col gap-1.5 ${
                  field.type === "textarea" ? "sm:col-span-2" : ""
                }`}
              >
                <label htmlFor={field.key} className="text-xs font-semibold text-muted">
                  {field.label}
                  {field.required && <span className="text-accent"> *</span>}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.key}
                    name={field.key}
                    placeholder={field.placeholder}
                    value={values[field.key] ?? ""}
                    onChange={(e) => update(field.key, e.target.value)}
                    required={field.required}
                    rows={3}
                    className="w-full rounded-xl border border-border-subtle bg-background px-4 py-3 text-sm outline-none placeholder:text-muted/60 focus:border-accent"
                  />
                ) : (
                  <input
                    id={field.key}
                    name={field.key}
                    type={field.type ?? "text"}
                    placeholder={field.placeholder}
                    value={values[field.key] ?? ""}
                    onChange={(e) => update(field.key, e.target.value)}
                    required={field.required}
                    className="w-full rounded-xl border border-border-subtle bg-background px-4 py-3 text-sm outline-none placeholder:text-muted/60 focus:border-accent"
                  />
                )}
                {field.helper && <p className="text-xs text-muted">{field.helper}</p>}
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      <div className="flex flex-col items-center gap-4 pt-4 text-center">
        {submitState === "success" ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex max-w-md flex-col items-center gap-2 rounded-2xl border border-border-subtle bg-background-elevated p-6 shadow-card"
          >
            <Check size={24} className="text-accent" />
            <p className="font-semibold">Submitted — we&rsquo;ve got everything we need.</p>
            <p className="text-sm text-muted">We&rsquo;ll be in touch shortly to get things moving.</p>
          </motion.div>
        ) : (
          <>
            <p className="text-sm text-muted">
              Submit sends your info straight to us — or use email/copy as a backup
              if you&rsquo;d rather send it yourself.
            </p>
            {submitState === "error" && (
              <p className="flex items-center gap-1.5 text-sm text-red-600">
                <AlertCircle size={14} />
                Couldn&rsquo;t send automatically — use Email This In or Copy below instead.
              </p>
            )}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="submit"
                className={submitState === "submitting" ? "opacity-70" : ""}
              >
                <Send size={16} />
                {submitState === "submitting" ? "Submitting..." : "Submit"}
              </Button>
              <Button type="button" onClick={handleEmailIn} variant="secondary">
                <Mail size={16} />
                Email This In
              </Button>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border-subtle px-7 py-3.5 text-sm font-semibold tracking-[-0.01em] text-foreground transition-colors hover:border-accent"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied" : "Copy All Answers"}
              </button>
            </div>
            <p className="text-xs text-muted">
              <span className="text-accent">*</span> Required — we need these to
              follow up with you.
            </p>
          </>
        )}
      </div>
    </form>
  );
}
