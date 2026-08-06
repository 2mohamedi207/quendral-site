"use client";

import { useId } from "react";

interface QuendralMarkProps {
  size?: number;
  className?: string;
}

export function QuendralMark({ size = 36, className = "" }: QuendralMarkProps) {
  const gradientId = `quendral-mark-gradient-${useId()}`;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--brand-blue-light)" />
          <stop offset="50%" stopColor="var(--brand-purple-light)" />
          <stop offset="100%" stopColor="var(--brand-pink-light)" />
        </linearGradient>
      </defs>
      <circle cx="48" cy="46" r="30" fill="none" stroke={`url(#${gradientId})`} strokeWidth="11" />
      <line x1="66" y1="64" x2="86" y2="84" stroke={`url(#${gradientId})`} strokeWidth="11" strokeLinecap="round" />
    </svg>
  );
}
