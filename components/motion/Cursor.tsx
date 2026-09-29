"use client";

import { useEffect, useRef } from "react";

const DARK_SURFACES = ".section-dark, footer, .photo-dialog, #mobile-menu, .page-curtain, .intro";
const INTERACTIVE = "a[href], button:not(:disabled), [role='button'], label, select, summary";

type Magnet = { x: number; y: number; tx: number; ty: number };

/**
 * A ring that trails the pointer, grows over anything clickable and turns
 * into a "View" disc over photographs that open — plus a gentle magnetic
 * pull on the round controls (`data-magnetic`).
 *
 * Only for a real mouse: it never mounts its loop on touch or pen input,
 * and stays off entirely under reduced motion. The native cursor is left
 * in place, so text selection, inputs and the map all behave as normal;
 * the ring is decoration on top.
 *
 * Everything runs on one requestAnimationFrame loop writing transforms
 * directly, with no React state, and the loop idles once the ring and
 * every magnet have settled. Magnets move through the individual
 * `translate` property, so they compose with whatever `transform` the
 * element's own hover state or entrance animation is using.
 */
export function Cursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const label = labelRef.current;
    if (!root || !label) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let shown = false;
    let frame = 0;
    const magnets = new Map<HTMLElement, Magnet>();

    const tick = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      root.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      let moving = Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1;

      magnets.forEach((magnet, element) => {
        magnet.x += (magnet.tx - magnet.x) * 0.16;
        magnet.y += (magnet.ty - magnet.y) * 0.16;
        const settled = Math.abs(magnet.tx - magnet.x) < 0.05 && Math.abs(magnet.ty - magnet.y) < 0.05;
        if (settled && magnet.tx === 0 && magnet.ty === 0) {
          element.style.translate = "";
          magnets.delete(element);
          return;
        }
        element.style.translate = `${magnet.x.toFixed(2)}px ${magnet.y.toFixed(2)}px`;
        if (!settled) moving = true;
      });

      frame = moving ? requestAnimationFrame(tick) : 0;
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const pull = () => {
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((element) => {
        const rect = element.getBoundingClientRect();
        const current = magnets.get(element);
        // Measure from where the element sits at rest, not where the pull
        // has already moved it, or it creeps after the pointer.
        const cx = rect.left + rect.width / 2 - (current?.x ?? 0);
        const cy = rect.top + rect.height / 2 - (current?.y ?? 0);
        const dx = tx - cx;
        const dy = ty - cy;
        const reach = Math.max(rect.width, rect.height) / 2 + 36;
        const inside = Math.hypot(dx, dy) < reach;
        if (inside) {
          const magnet = current ?? { x: 0, y: 0, tx: 0, ty: 0 };
          magnet.tx = dx * 0.32;
          magnet.ty = dy * 0.32;
          magnets.set(element, magnet);
        } else if (current) {
          current.tx = 0;
          current.ty = 0;
        }
      });
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      tx = event.clientX;
      ty = event.clientY;
      if (!shown) {
        x = tx;
        y = ty;
        shown = true;
        root.classList.add("is-visible");
      }
      pull();
      wake();
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (!target?.closest) return;
      const view = target.closest<HTMLElement>("[data-cursor]");
      let mode = "";
      if (target.closest("iframe")) mode = "hidden";
      else if (view) {
        mode = view.dataset.cursor ?? "view";
        label.textContent = view.dataset.cursorLabel ?? "View";
      } else if (target.closest("input, textarea, [contenteditable='true']")) mode = "text";
      else if (target.closest(INTERACTIVE)) mode = "link";
      root.dataset.mode = mode;
      root.dataset.tone = target.closest(DARK_SURFACES) ? "light" : "dark";
    };

    const onLeave = () => {
      shown = false;
      root.classList.remove("is-visible");
      magnets.forEach((magnet) => {
        magnet.tx = 0;
        magnet.ty = 0;
      });
      wake();
    };
    const onDown = () => root.classList.add("is-pressed");
    const onUp = () => root.classList.remove("is-pressed");
    // Scrolling moves the controls under a still pointer.
    const onScroll = () => {
      if (!shown) return;
      pull();
      wake();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      magnets.forEach((_, element) => {
        element.style.translate = "";
      });
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div ref={rootRef} className="cursor" aria-hidden="true">
      <span className="cursor-ring" />
      <span className="cursor-disc"><span ref={labelRef}>View</span></span>
    </div>
  );
}
