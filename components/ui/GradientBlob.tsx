interface GradientBlobProps {
  className?: string;
  colors?: [string, string];
  size?: number;
  slow?: boolean;
}

export function GradientBlob({
  className = "",
  colors = ["var(--brand-blue)", "var(--brand-purple)"],
  size = 500,
  slow = false,
}: GradientBlobProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full opacity-50 blur-[110px] ${
        slow ? "animate-blob-drift-slow" : "animate-blob-drift"
      } ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
      }}
    />
  );
}
