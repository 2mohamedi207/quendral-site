"use client";

export function NewsletterForm() {
  return (
    <form className="flex items-center gap-2" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="you@company.com"
        className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm outline-none placeholder:text-muted focus:border-brand-purple-light"
      />
    </form>
  );
}
