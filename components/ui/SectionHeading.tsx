"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignClasses = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`flex max-w-2xl flex-col gap-4 ${alignClasses} ${className}`}
    >
      {eyebrow && (
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-purple-light">
          {eyebrow}
        </span>
      )}
      <h2 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-lg leading-relaxed text-muted">{description}</p>
      )}
    </motion.div>
  );
}
