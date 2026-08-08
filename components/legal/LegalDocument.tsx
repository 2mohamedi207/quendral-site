import { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface LegalDocumentProps {
  title: string;
  effectiveDate: string;
  children: ReactNode;
}

export function LegalDocument({ title, effectiveDate, children }: LegalDocumentProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-36 lg:px-8">
      <div className="mb-10 flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-50 p-5">
        <AlertTriangle size={20} className="mt-0.5 shrink-0 text-amber-600" />
        <p className="text-sm leading-relaxed text-muted">
          This document is based on a legal template and has not been reviewed by
          a lawyer. It&rsquo;s a reasonable starting point, not legal advice —
          get it reviewed by a licensed lawyer before relying on it for real
          client agreements.
        </p>
      </div>

      <h1 className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-muted">Effective date: {effectiveDate}</p>

      <div className="prose-legal mt-10 flex flex-col gap-6 text-sm leading-relaxed text-foreground/90 sm:text-base [&_h2]:mt-4 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground [&_p]:text-muted [&_li]:text-muted">
        {children}
      </div>
    </div>
  );
}
