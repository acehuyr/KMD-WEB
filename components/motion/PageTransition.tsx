"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ANCHOR_OFFSET, getLenis } from "@/lib/lenis";
import { setStageReady } from "@/lib/stage";

const LABELS: Record<string, string> = {
  "/": "Home",
  "/about": "The Studio",
  "/projects": "Our Work",
  "/contact": "Contact",
  "/careers": "Careers",
};

function labelFor(pathname: string) {
  if (LABELS[pathname]) return LABELS[pathname];
  if (pathname.startsWith("/projects/")) return "Our Work";
  return "KMD Interior";
}

const CURTAIN_EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
const TEXT_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

type Phase = "idle" | "covering" | "covered" | "revealing";

// With a timeout, since hidden tabs stop delivering frames altogether.
const nextFrame = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve());
    window.setTimeout(resolve, 100);
  });

/**
 * Route changes play as a curtain: a charcoal panel rises over the page
 * carrying the destination's name, the route changes behind it, and it
 * lifts away as the new page's headings rise.
 *
 * It works by listening for link clicks in the capture phase, ahead of
 * React. Calling preventDefault there makes next/link skip its own
 * navigation (it checks `defaultPrevented` after running any onClick, so
 * handlers like the mobile menu's close still fire); the router push
 * happens once the panel has covered the screen. Modified clicks, new-tab
 * links, downloads, other origins and reduced motion are all left alone.
 *
 * Same-page hash links (the nav's "/#services" on the homepage, "Explore
 * the studio", back to top) are handed to Lenis so they glide rather than
 * jump, with focus moved to the target as a native fragment jump would.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const phase = useRef<Phase>("idle");
  const revealRef = useRef<() => void>(() => {});

  useEffect(() => {
    const curtain = curtainRef.current;
    const label = labelRef.current;
    if (!curtain || !label) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let running: Animation[] = [];
    let fallbackTimer = 0;
    let waitingTimer = 0;

    // Resolves when the animation ends — or shortly after it should have,
    // in case the browser is throttling frames (a background tab, a busy
    // device). Navigation must never hang on a curtain that won't finish.
    const play = (element: Element, keyframes: Keyframe[], options: KeyframeAnimationOptions) => {
      const animation = element.animate(keyframes, { fill: "forwards", ...options });
      running.push(animation);
      const limit = Number(options.duration ?? 0) + Number(options.delay ?? 0) + 250;
      return Promise.race([
        animation.finished.then(() => undefined, () => undefined),
        new Promise<void>((resolve) => window.setTimeout(resolve, limit)),
      ]);
    };

    const reset = () => {
      running.forEach((animation) => animation.cancel());
      running = [];
      curtain.classList.remove("is-active", "is-waiting");
      phase.current = "idle";
    };

    const reveal = async () => {
      if (phase.current !== "covered") return;
      phase.current = "revealing";
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(waitingTimer);
      curtain.classList.remove("is-waiting");

      // Let the new page paint once before lifting off it.
      await nextFrame();
      await nextFrame();
      setStageReady(true);
      play(label, [
        { transform: "translate3d(0, 0, 0)", opacity: 1 },
        { transform: "translate3d(0, -40%, 0)", opacity: 0 },
      ], { duration: 450, easing: "cubic-bezier(0.5, 0, 0.75, 0)" });
      await play(curtain, [
        { transform: "translate3d(0, 0, 0)" },
        { transform: "translate3d(0, -100%, 0)" },
      ], { duration: 850, easing: CURTAIN_EASE });
      reset();
    };
    revealRef.current = reveal;

    const navigate = async (url: URL) => {
      phase.current = "covering";
      setStageReady(false);
      const href = url.pathname + url.search + url.hash;
      router.prefetch(href);

      label.textContent = labelFor(url.pathname);
      curtain.classList.add("is-active");
      play(label, [
        { transform: "translate3d(0, 110%, 0)" },
        { transform: "translate3d(0, 0, 0)" },
      ], { duration: 750, delay: 220, easing: TEXT_EASE });
      await play(curtain, [
        { transform: "translate3d(0, 100%, 0)" },
        { transform: "translate3d(0, 0, 0)" },
      ], { duration: 700, easing: CURTAIN_EASE });

      // Drop any wheel inertia still in flight, so Lenis can't carry the
      // new page back down after Next scrolls it to the top.
      const lenis = getLenis();
      lenis?.scrollTo(window.scrollY, { immediate: true, force: true });

      phase.current = "covered";
      router.push(href);
      waitingTimer = window.setTimeout(() => curtain.classList.add("is-waiting"), 600);
      // If the navigation never lands (offline, server error), don't
      // leave the visitor staring at a charcoal screen.
      fallbackTimer = window.setTimeout(reveal, 8000);
    };

    const scrollToHash = (event: MouseEvent, url: URL) => {
      const lenis = getLenis();
      const id = decodeURIComponent(url.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!lenis || !target) return;

      event.preventDefault();
      lenis.scrollTo(target, { offset: ANCHOR_OFFSET, duration: 1.4 });
      if (url.hash !== window.location.hash) window.history.pushState(null, "", url.hash);
      if (!target.matches("a[href], button, input, select, textarea, [tabindex]")) {
        target.setAttribute("tabindex", "-1");
      }
      target.focus({ preventScroll: true });
    };

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) return;

      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.classList.contains("skip-link")) return;
      if ((anchor.target && anchor.target !== "_self") || anchor.hasAttribute("download")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;

      const here = window.location;
      if (url.pathname === here.pathname) {
        if (url.search === here.search && url.hash) scrollToHash(event, url);
        return;
      }
      if (reduced.matches) return;

      event.preventDefault();
      if (phase.current === "idle") navigate(url);
    };

    window.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("click", onClick, true);
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(waitingTimer);
      reset();
      setStageReady(true);
    };
  }, [router]);

  useEffect(() => {
    if (phase.current === "covered") revealRef.current();
  }, [pathname]);

  return (
    <div ref={curtainRef} className="page-curtain" aria-hidden="true">
      <div className="page-curtain-inner">
        <span className="page-curtain-eyebrow">KMD Interior</span>
        <span className="page-curtain-mask">
          <span ref={labelRef} className="page-curtain-label" />
        </span>
      </div>
      <span className="page-curtain-loader" />
    </div>
  );
}
