"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType } from "react";
import { cx } from "@/lib/cx";

type RevealTextProps = {
  /** One string per visual line — each line masks/reveals independently. */
  lines: string[];
  /** Semantic wrapper tag — pick the correct heading level per page. */
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  /** "mount" for hero-style reveal on load, "inView" for scroll reveal. */
  trigger?: "mount" | "inView";
  delay?: number;
  /**
   * Reveal granularity. "line" is the default everywhere; "word" is the
   * finer, more cinematic variant reserved for a key moment — currently
   * only the homepage hero. Kept opt-in so raising the hero's finish
   * doesn't quietly restage every section heading on the site.
   */
  splitBy?: "line" | "word";
  /** For wiring an ancestor's aria-labelledby to this heading. */
  id?: string;
};

/**
 * Line-by-line (or word-by-word) masked text reveal. The outer tag carries
 * the real accessible name (via aria-label) so screen readers get the
 * heading once, cleanly — the animated inner spans are aria-hidden
 * decoration.
 *
 * Stagger intervals follow the design skill: 0.12s per line reads as
 * distinct beats, while words need 0.03–0.06s so the headline lands as one
 * fluid motion rather than a typewriter.
 */
export function RevealText({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  trigger = "mount",
  delay = 0,
  splitBy = "line",
  id,
}: RevealTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const byWord = splitBy === "word";

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : byWord ? 0.045 : 0.12,
        delayChildren: prefersReducedMotion ? 0 : delay,
      },
    },
  };

  const line = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : "100%" },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.9,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  // No opacity fade on words: the mask already hides them completely, and
  // fading each one separately reads as a shimmer across the headline.
  const word = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : "110%" },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.75,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const viewportProps =
    trigger === "inView"
      ? {
          whileInView: "visible",
          viewport: { once: true, margin: "-10% 0px" },
        }
      : { animate: "visible" };

  return (
    <Tag id={id} className={className} aria-label={lines.join(" ")}>
      <motion.span
        initial="hidden"
        {...viewportProps}
        variants={container}
        className="block"
        aria-hidden="true"
      >
        {lines.map((text, index) => (
          <span
            key={index}
            className={cx("block", !byWord && "overflow-hidden")}
          >
            {byWord ? (
              text.split(" ").map((token, tokenIndex) => (
                // The mask is padded and pulled back by the same amount:
                // `overflow-hidden` on a tight box crops descenders, and
                // this headline has j/g/p in it.
                <span
                  key={tokenIndex}
                  className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] mr-[0.25em] align-bottom"
                >
                  <motion.span
                    variants={word}
                    className={cx("inline-block", lineClassName)}
                  >
                    {token}
                  </motion.span>
                </span>
              ))
            ) : (
              <motion.span
                variants={line}
                className={cx("block", lineClassName)}
              >
                {text}
              </motion.span>
            )}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
