interface QuendralMarkProps {
  size?: number;
  className?: string;
}

export function QuendralMark({ size = 36, className = "" }: QuendralMarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="48" cy="46" r="30" fill="none" stroke="var(--accent)" strokeWidth="11" />
      <line x1="66" y1="64" x2="86" y2="84" stroke="var(--accent)" strokeWidth="11" strokeLinecap="round" />
    </svg>
  );
}
