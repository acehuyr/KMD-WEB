"use client";

import { useEffect } from "react";
import Image from "next/image";
import { setStageReady } from "@/lib/stage";

/** Must match the `intro-lift` delay on the front panel in globals.css. */
const LIFT_DELAY_MS = 1700;
/**
 * The panels rise from the bottom, so the hero headline near the top of
 * the viewport is uncovered roughly half a second into the lift. Starting
 * its rise then means it is seen moving rather than already in place.
 */
const HEADLINE_LEAD_MS = 450;
/** When the trailing back panel has cleared the viewport. */
const INTRO_END_MS = 2900;

function liftAnimation(selector: string) {
  return document
    .querySelector(selector)
    ?.getAnimations()
    .find((animation) => (animation as CSSAnimation).animationName === "intro-lift");
}

/**
 * The first-visit curtain: badge and wordmark on charcoal, then the panel
 * lifts away to reveal the page.
 *
 * The whole sequence is CSS. The inline script in app/layout.tsx decides
 * before first paint whether it plays (once per browser session, never
 * under reduced motion), so it starts with the page rather than waiting
 * on hydration — and if the JavaScript never arrives, the curtain still
 * lifts on its own. This component only listens: it opens the stage
 * as the panel starts moving, so the hero headline rises into view
 * behind it, and removes the curtain once it has gone.
 */
export function Intro() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "play") return;

    const front = liftAnimation(".intro-panel-front");
    const back = liftAnimation(".intro-panel-back");
    // Both animations started with the page, so either clock will do; the
    // page clock is the fallback where CSS animations aren't exposed.
    const elapsed = Number(front?.currentTime ?? performance.now());

    const openTimer = window.setTimeout(
      () => setStageReady(true),
      Math.max(0, LIFT_DELAY_MS + HEADLINE_LEAD_MS - elapsed),
    );

    let removed = false;
    const remove = () => {
      if (removed) return;
      removed = true;
      setStageReady(true);
      delete root.dataset.intro;
    };
    back?.finished.then(remove, remove);
    const removeTimer = window.setTimeout(remove, Math.max(0, INTRO_END_MS + 100 - elapsed));

    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  return (
    <div className="intro" aria-hidden="true">
      <div className="intro-panel intro-panel-back" />
      <div className="intro-panel intro-panel-front">
        <div className="intro-content">
          <Image
            src="/brand/kmd-interior-badge.webp"
            alt=""
            width={80}
            height={80}
            quality={90}
            loading="eager"
            className="intro-badge"
          />
          <div className="intro-wordmark">
            {["K", "M", "D"].map((letter, index) => (
              <span key={letter} className="intro-letter-mask">
                <span style={{ animationDelay: `${0.2 + index * 0.08}s` }}>{letter}</span>
              </span>
            ))}
          </div>
          <div className="intro-rule"><span /></div>
          <span className="intro-tagline">Interior · Design &amp; craft</span>
        </div>
      </div>
    </div>
  );
}
