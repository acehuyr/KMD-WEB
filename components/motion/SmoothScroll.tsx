"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { setLenis } from "@/lib/lenis";

/**
 * Weighted, inertial wheel scrolling for the long editorial pages. Touch
 * keeps its native scrolling (Lenis leaves it alone by default), and the
 * whole thing stays off under reduced motion.
 *
 * In-page anchors are not handed to Lenis's own `anchors` option: that
 * doesn't cancel the browser's jump, and it can't see Next's <Link>
 * navigations. PageTransition owns link clicks instead and calls
 * `lenis.scrollTo` for same-page hashes.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      autoRaf: true,
    });
    setLenis(lenis);

    return () => {
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
