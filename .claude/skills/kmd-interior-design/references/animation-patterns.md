# Animation patterns

Starting-point implementations for this stack (Framer Motion, GSAP +
ScrollTrigger, Lenis) on Next.js App Router. Treat these as patterns to adapt,
not code to paste verbatim — and re-check the current Framer Motion / GSAP
APIs against their installed versions (`package.json`) if something doesn't
match, since versions move fast.

All patterns below respect `prefers-reduced-motion` — do not skip that check
when adapting them.

## Reduced-motion guard

Central hook, reusable anywhere motion is added:

```ts
// lib/use-reduced-motion.ts
"use client";
import { useEffect, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  return reduced;
}
```

Use it to branch: skip GSAP ScrollTrigger pinning/parallax entirely, and pass
instant/no-op variants to Framer Motion, when `reduced` is true.

## Lenis smooth scroll

Mount once near the app root (a client component wrapping `children` in
`app/layout.tsx`, or a dedicated provider). Don't initialize Lenis on pages
that don't need it (e.g. skip on very short/simple pages if it adds no value).

```tsx
// components/smooth-scroll-provider.tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return; // skip Lenis entirely for reduced motion

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
```

If GSAP ScrollTrigger is also used on the page, sync Lenis's scroll events
with ScrollTrigger's `update` (see GSAP + Lenis integration docs for the
`lenis.on("scroll", ScrollTrigger.update)` + `gsap.ticker` wiring) — don't run
them uncoordinated, or scroll-triggered animations will desync.

## GSAP ScrollTrigger — image/text reveal

Use for scroll-driven storytelling (staggered reveals, parallax, pinning).
Register the plugin once, animate `transform`/`opacity` only, and clean up on
unmount:

```tsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export function ScrollReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!ref.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            once: true, // one-shot reveal, not scrub, unless the design calls for scrubbing
          },
        }
      );
    }, ref);

    return () => ctx.revert(); // kills the ScrollTrigger + tween on unmount
  }, [reducedMotion]);

  return <div ref={ref}>{children}</div>;
}
```

For parallax (e.g. a hero image moving slower than scroll), use `scrub: true`
on the ScrollTrigger and animate `yPercent`/`y`, not `top`/`margin`. Keep
parallax subtle (a 10–20% speed differential reads; 50%+ feels gimmicky) and
never apply it to body text.

## Framer Motion — text/image reveal + page transitions

Good default for on-load hero reveals, hover states, and menu open/close —
anything not driven by scroll position.

```tsx
"use client";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export function RevealText({ children }: { children: React.ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : "hidden"}
      whileInView={reducedMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "-10%" }}
      variants={revealVariants}
    >
      {children}
    </motion.div>
  );
}
```

For staggered word/line reveals on a headline, split text into `span`s and
apply `staggerChildren` on the parent variant — keep the stagger interval
small (0.03–0.06s per unit) so it reads as one fluid motion, not a typewriter
effect.

For project-card → case-study-page continuity, `layoutId` on the shared
image/title element gives a smooth shared-element transition between routes
when combined with Next.js App Router transitions — skip it under reduced
motion in favor of an instant navigation.

## When to pick which tool

- **Menu open/close, hover/tap feedback, on-load hero reveal, shared-element
  transitions** → Framer Motion.
- **Scroll-position-driven reveals, staggered multi-element scroll sequences,
  pinning, parallax** → GSAP + ScrollTrigger.
- **Overall scroll feel on long pages** → Lenis (optional; skip if the page
  is short or native scroll already feels good).

Don't reach for all three on a single small section — pick the one tool the
interaction actually needs.
