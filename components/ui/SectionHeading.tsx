import { RevealText } from "./RevealText";
import { cx } from "@/lib/cx";

/**
 * Shared eyebrow + scroll-reveal headline pattern used across the
 * mid-page storytelling sections. No hooks of its own — stays a server
 * component and composes the (client) RevealText.
 */
export function SectionHeading({
  eyebrow,
  lines,
  id,
  align = "left",
  tone = "light",
  className,
  as = "h2",
}: {
  eyebrow: string;
  lines: string[];
  id?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div
      className={cx(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <span className="eyebrow">{eyebrow}</span>
      <RevealText
        id={id}
        as={as}
        trigger="inView"
        lines={lines}
        className={cx(
          as === "h1" ? "editorial-heading max-w-4xl" : "font-serif text-display leading-[1.05]",
          tone === "dark" ? "text-ivory" : "text-charcoal"
        )}
      />
    </div>
  );
}
