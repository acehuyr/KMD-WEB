"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cx } from "@/lib/cx";

/**
 * Lets a photograph drift slightly slower than the page inside its own
 * frame — the frame stays put, only the picture moves.
 *
 * The travel is deliberately small. The image is scaled up just enough to
 * cover the drift (±offset needs 2×offset of extra height), and these
 * sources are only ~1080–1280px wide, so every extra percent of scale is
 * resolution the photograph doesn't have. Keep it to images that display
 * well under their native width.
 */
export function Parallax({
  children,
  className,
  offset = 4,
}: {
  children: ReactNode;
  className?: string;
  /** Drift in percent of the frame's height, each direction. */
  offset?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${offset}%`, `${offset}%`]);

  return (
    <div ref={ref} className={cx("overflow-hidden", className)}>
      <motion.div style={reduce ? undefined : { y, scale: 1 + (offset * 2 + 1) / 100 }}>
        {children}
      </motion.div>
    </div>
  );
}
