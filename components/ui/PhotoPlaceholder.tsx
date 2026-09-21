import { cx } from "@/lib/cx";

/**
 * Explicit stand-in for real KMD project photography. Deliberately reads
 * as a placeholder (architectural cross-hatch, not a fake photo-like
 * gradient) rather than generic stock imagery pretending to belong —
 * per the "never substitute stock photography" rule in the design skill.
 *
 * Swap the containing element for a `next/image` once a real asset
 * exists; `label` should stay close to alt text for that eventual image.
 */
export function PhotoPlaceholder({
  label,
  tone = "light",
  className,
}: {
  label: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Placeholder — ${label}`}
      className={cx(
        "relative flex items-center justify-center overflow-hidden",
        tone === "dark"
          ? "bg-charcoal-soft text-ivory/60"
          : "bg-offwhite text-charcoal-soft/70",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 1px, transparent 14px)",
        }}
      />
      <p className="relative px-6 text-center text-xs uppercase tracking-[0.2em]">
        Photography needed
        <br />
        {label}
      </p>
    </div>
  );
}
