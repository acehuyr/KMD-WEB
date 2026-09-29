import type Lenis from "lenis";

/**
 * The page's single Lenis instance, for the few places that need to drive
 * scrolling themselves (in-page anchors, back to top, route changes) or
 * sync with it (GSAP ScrollTrigger). Null when smooth scrolling is off —
 * reduced motion, or before SmoothScroll has mounted — and every caller
 * falls back to native scrolling in that case.
 */
let instance: Lenis | null = null;
const listeners = new Set<(lenis: Lenis | null) => void>();

export function getLenis() {
  return instance;
}

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
  listeners.forEach((listener) => listener(lenis));
}

/** Calls back now and on every change; returns an unsubscribe. */
export function onLenis(listener: (lenis: Lenis | null) => void) {
  listeners.add(listener);
  listener(instance);
  return () => {
    listeners.delete(listener);
  };
}

/** Header height plus breathing room — mirrors `scroll-padding-top`. */
export const ANCHOR_OFFSET = -110;
