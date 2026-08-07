"use client";

import { useState } from "react";
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
    title: "CRM & team",
    fields: [
      {
        key: "currentCrm",
        label: "What do you use today?",
        placeholder: "Spreadsheet, nothing, or name your current CRM",
      },
      {
        key: "teamAccess",
        label: "Who needs access?",
        type: "textarea",
        placeholder: "Names/roles — owner, office manager, crew leads...",
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
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  function update(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  const summary = buildSummary(values);
  const businessName = values.businessName || "New Client";
  const mailtoHref = `mailto:info@luminaeautomations.com?subject=${encodeURIComponent(
    `New Client Intake — ${businessName}`
  )}&body=${encodeURIComponent(summary)}`;

  async function handleCopy() {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleSubmit() {
    if (!values.contactEmail?.trim()) {
      setSubmitState("error");
      return;
    }
    setSubmitState("submitting");
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
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
    <div className="flex flex-col gap-10">
      {SECTIONS.map((section) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="gradient-border flex flex-col gap-5 rounded-2xl p-8"
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
                  {field.required && <span className="text-brand-pink-light"> *</span>}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.key}
                    placeholder={field.placeholder}
                    value={values[field.key] ?? ""}
                    onChange={(e) => update(field.key, e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-muted/60 focus:border-brand-purple-light"
                  />
                ) : (
                  <input
                    id={field.key}
                    type={field.type ?? "text"}
                    placeholder={field.placeholder}
                    value={values[field.key] ?? ""}
                    onChange={(e) => update(field.key, e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-muted/60 focus:border-brand-purple-light"
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
            className="gradient-border flex max-w-md flex-col items-center gap-2 rounded-2xl p-6"
          >
            <Check size={24} className="text-brand-pink-light" />
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
              <p className="flex items-center gap-1.5 text-sm text-brand-pink-light">
                <AlertCircle size={14} />
                {values.contactEmail?.trim()
                  ? "Couldn't send automatically — use Email This In or Copy below instead."
                  : "Add your email above first."}
              </p>
            )}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                onClick={handleSubmit}
                className={submitState === "submitting" ? "opacity-70" : ""}
              >
                <Send size={16} />
                {submitState === "submitting" ? "Submitting..." : "Submit"}
              </Button>
              <Button href={mailtoHref} variant="secondary">
                <Mail size={16} />
                Email This In
              </Button>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold tracking-tight text-foreground transition-colors hover:border-white/40"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied" : "Copy All Answers"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
