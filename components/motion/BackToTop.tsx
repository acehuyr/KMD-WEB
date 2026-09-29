"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { getLenis } from "@/lib/lenis";

/**
 * A small round button that appears once the reader is well into a page,
 * its ring filling with scroll progress. The header tucks away while
 * scrolling down, so this is the quick way home from the bottom of a long
 * page.
 */
export function BackToTop() {
  const reduce = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 900));

  const toTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    // The button hides at the top; hand focus to the start of the page.
    document.querySelector<HTMLElement>(".site-header a")?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      className="back-to-top"
      data-visible={visible || undefined}
      data-magnetic
      aria-label="Back to the top"
      tabIndex={visible ? 0 : -1}
      onClick={toTop}
    >
      <svg viewBox="0 0 52 52" aria-hidden="true">
        <circle cx="26" cy="26" r="25" className="back-to-top-track" />
        <motion.circle
          cx="26"
          cy="26"
          r="25"
          className="back-to-top-fill"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
      <ArrowUp size={17} strokeWidth={1.5} />
    </button>
  );
}
