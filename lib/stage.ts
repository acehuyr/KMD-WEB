import { useEffect, useState } from "react";

/**
 * Whether the page is on show, or hidden behind a curtain — the first-visit
 * intro, or the panel that covers a route change.
 *
 * Entrance animations wait on this so they play as the curtain lifts
 * rather than finishing unseen beneath it. The inline script in
 * app/layout.tsx marks <html data-intro="play"> before first paint when the
 * intro will run, so the client starts out "not ready" in exactly that case.
 */
let ready =
  typeof document !== "undefined" &&
  document.documentElement.dataset.intro !== "play";
const listeners = new Set<() => void>();

export function isStageReady() {
  return ready;
}

export function setStageReady(value: boolean) {
  if (ready === value) return;
  ready = value;
  listeners.forEach((listener) => listener());
}

export function subscribeStage(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * True once the stage has been ready at any point since this component
 * mounted — it latches. A page already on screen when the next route
 * change covers it must keep its headings in place, not drop them back
 * below their masks while the curtain rises over them.
 *
 * It always starts false and flips a tick after mount: the server can't
 * know whether the intro will play, so the first client render has to
 * match its "not ready" markup or hydration breaks.
 */
export function useStageReady() {
  const [latched, setLatched] = useState(false);

  useEffect(() => {
    if (latched) return;
    const check = () => {
      if (ready) setLatched(true);
    };
    const unsubscribe = subscribeStage(check);
    // Usually already open (no intro, no route change in flight).
    queueMicrotask(check);
    return unsubscribe;
  }, [latched]);

  return latched;
}
