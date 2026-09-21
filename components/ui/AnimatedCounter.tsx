"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/**
 * Counts up to `value` once it scrolls into view.
 *
 * The real number is what renders by default — `animated` starts as
 * `null` and `null` means "not animating, show the truth". That matters
 * beyond aesthetics: this component previously held `useState(0)`, so the
 * server-rendered HTML said "0+" and only reached "11+" if the visitor
 * had JavaScript, reached the section, and let a rAF loop finish. Search
 * engines, no-JS visitors and anyone whose animation frame budget got
 * throttled were served "0+" as the final content of the page.
 *
 * Three things guard that now:
 *   - `armed` primes the display to 0 a few hundred pixels *before* the
 *     section is visible, so the reset happens off-screen. Priming at the
 *     moment of entry instead would flash the real number for a frame and
 *     then snap back to zero in front of the reader.
 *   - a `setTimeout` safety net lands on the real number if the rAF loop
 *     never runs to completion (background tab, throttled renderer) —
 *     the failure mode is "no animation", never "a permanent zero".
 *   - anything already scrolled past on load (restored scroll position,
 *     an in-page anchor) is left alone: its intersection is never coming,
 *     so priming it to 0 would strand it there.
 */
export function AnimatedCounter({
  value,
  suffix = "",
  duration = 1600,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Two thresholds, deliberately: `armed` fires early and off-screen so
  // the reset to 0 is never seen; `isInView` starts the count only once
  // the number is genuinely on screen and worth watching.
  const armed = useInView(ref, { once: true, margin: "300px 0px 300px 0px" });
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const [animated, setAnimated] = useState<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion || !armed) return;
    const el = ref.current;
    if (el && el.getBoundingClientRect().bottom < 0) return;
    setAnimated(0);
  }, [armed, prefersReducedMotion]);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    let frame = 0;
    const start = performance.now();
    const safety = window.setTimeout(() => setAnimated(value), duration + 400);

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setAnimated(Math.round(value * easeOutExpo(progress)));
      if (progress < 1) frame = requestAnimationFrame(tick);
      else window.clearTimeout(safety);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(safety);
    };
  }, [isInView, prefersReducedMotion, value, duration]);

  return (
    <span ref={ref}>
      {animated ?? value}
      {suffix}
    </span>
  );
}
