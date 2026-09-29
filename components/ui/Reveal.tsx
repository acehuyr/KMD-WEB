"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useStageReady } from "@/lib/stage";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "rise" | "image";
  as?: "div" | "figure";
  id?: string;
};

/**
 * Scroll reveal: a fade and rise for copy, an unmasking for photographs.
 *
 * For images, `data-shown` also lets the photograph inside settle from a
 * slight zoom as its frame opens (see `[data-reveal="image"] img` in
 * globals.css) — done with the CSS `scale` property, so it composes with
 * the hover zoom and the hero's slow settle, which use `transform`.
 *
 * Nothing starts while a curtain is down: an element already in view when
 * a page arrives reveals as the curtain lifts, not unseen beneath it.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variant = "rise",
  as = "div",
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const ready = useStageReady();
  const inView = useInView(ref, { once: true, amount: 0.15, margin: "0px 0px -40px 0px" });
  const shown = ready && inView;
  const Tag = as === "figure" ? motion.figure : motion.div;
  const isImage = variant === "image";

  return (
    <Tag
      ref={ref as never}
      id={id}
      data-reveal={variant}
      data-shown={shown || undefined}
      className={className}
      initial={reduce ? false : isImage
        ? { opacity: 0, clipPath: "inset(0 0 38% 0)" }
        : { opacity: 0, y: 48 }}
      animate={shown ? (isImage ? { opacity: 1, clipPath: "inset(0 0 0% 0)" } : { opacity: 1, y: 0 }) : undefined}
      transition={{
        duration: reduce ? 0 : isImage ? 1.4 : 1.05,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Tag>
  );
}
