"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * The hero's masked line rise, for section headings that mix roman and
 * italic (`["Spaces with", <em>something to say.</em>]`) — which
 * RevealText can't take, since its lines are plain strings.
 *
 * Render it *inside* the heading tag so the heading keeps its real text
 * content for screen readers. The in-view trigger sits on the wrapper,
 * not on each line: a line that starts fully below its mask has no
 * visible area, so its own IntersectionObserver would never fire.
 */
export function MaskedLines({ lines, delay = 0 }: { lines: ReactNode[]; delay?: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      className="block"
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: reduce ? 0 : delay } } }}
    >
      {lines.map((line, index) => (
        <span key={index} className="title-mask">
          <motion.span
            variants={{ hidden: { y: "110%" }, visible: { y: 0 } }}
            transition={{ duration: reduce ? 0 : 1.1, ease }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
