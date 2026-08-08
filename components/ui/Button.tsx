"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode, MouseEvent, useRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "text-white bg-accent shadow-card hover:bg-accent-dark",
  secondary: "text-foreground border border-border-subtle bg-background-elevated hover:border-accent",
  ghost: "text-foreground hover:text-accent",
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const ref = useRef<HTMLElement | null>(null);

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.setProperty("--mx", `${x * 0.15}px`);
    el.style.setProperty("--my", `${y * 0.15}px`);
  }

  function handleMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", "0px");
    el.style.setProperty("--my", "0px");
  }

  const baseClasses = `group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-tight transition-[background-position,transform,border-color] duration-500 ${variantClasses[variant]} ${className}`;

  const content = (
    <motion.span
      className="inline-flex items-center gap-2"
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.span>
  );

  const style = { transform: "translate(var(--mx, 0px), var(--my, 0px))" };

  if (href) {
    const isHttp = href.startsWith("http");
    const isSpecialProtocol = /^(mailto:|tel:|sms:)/.test(href);

    // Next.js's <Link> intercepts clicks for client-side routing and only
    // special-cases http(s) URLs as "external" — mailto:/tel:/sms: links get
    // silently swallowed by its router instead of triggering the OS handler.
    // Use a plain anchor for those so the browser handles them natively.
    if (isSpecialProtocol) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={baseClasses}
          style={style}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={baseClasses}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      className={baseClasses}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {content}
    </button>
  );
}
