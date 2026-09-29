"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { CAPABILITIES } from "@/content/expertise";

/** Percent of one copy's width travelled per second at rest. */
const BASE_SPEED = 1.6;

const wrap = (min: number, max: number, value: number) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

function Row() {
  return (
    <span className="marquee-row">
      {CAPABILITIES.map((capability) => (
        <span key={capability} className="marquee-item">
          {capability}
          <span className="marquee-mark">✳</span>
        </span>
      ))}
    </span>
  );
}

/**
 * KMD's eleven trades, drifting across the page in large serif. The band
 * follows the reader's scroll: it quickens with scroll speed and turns to
 * run the way the page is moving. It rests while off screen, and under
 * reduced motion it becomes a still, wrapped list.
 */
export function CapabilityMarquee() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  // Two identical rows side by side: wrapping at -50% is seamless.
  const x = useTransform(baseX, (value) => `${wrap(-50, 0, value)}%`);
  const direction = useRef(-1);

  useAnimationFrame((_, delta) => {
    if (reduce || !inView) return;
    const factor = boost.get();
    if (factor < 0) direction.current = 1;
    else if (factor > 0) direction.current = -1;
    let step = direction.current * BASE_SPEED * (delta / 1000);
    step += step * Math.abs(factor);
    baseX.set(baseX.get() + step / 2);
  });

  return (
    <section ref={ref} className="marquee-section" aria-labelledby="marquee-heading">
      <h2 id="marquee-heading" className="sr-only">What we make</h2>
      <ul className="sr-only">
        {CAPABILITIES.map((capability) => <li key={capability}>{capability}</li>)}
      </ul>
      {/* One markup for both cases (the reduced-motion layout is CSS), so
          server and client render the same thing whatever the setting. */}
      <div className="marquee-viewport" aria-hidden="true">
        <motion.div className="marquee-track" style={{ x }}>
          <Row />
          <Row />
        </motion.div>
      </div>
    </section>
  );
}
