"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { MaskedLines } from "@/components/ui/MaskedLines";
import { GALLERY, getPhoto } from "@/content/projects";
import { onLenis } from "@/lib/lenis";

// Photographs not already on the homepage, so the reel adds rooms rather
// than repeating the hero and the selected-work spread.
const REEL = [
  "living-room-city-view",
  "residence-passages",
  "bedroom-blue-headboard",
  "living-room-timber-ceiling",
  "bathroom-sculpted-white",
  "living-room-teak-floor",
  "living-room-teak-floor-seating",
].map(getPhoto);

/** Matches the CSS that switches the track from a swipe row to a pinned reel. */
const PINNED = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

/**
 * A pinned horizontal reel: on desktop the section holds still while the
 * photographs travel sideways with the scroll, each image drifting a
 * little inside its frame. On smaller screens, and under reduced motion,
 * it is a plain swipeable row with scroll snapping instead — the pinned
 * choreography doesn't survive being squeezed onto a phone.
 *
 * GSAP only loads with this component, so it ships on the homepage alone.
 */
export function GalleryReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add(PINNED, () => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const travel = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: ({ progress }) => {
            if (fillRef.current) fillRef.current.style.transform = `scaleX(${progress})`;
            if (countRef.current) {
              countRef.current.textContent = String(Math.round(progress * (REEL.length - 1)) + 1).padStart(2, "0");
            }
          },
        },
      });

      gsap.utils.toArray<HTMLElement>(".reel-item img", track).forEach((image) => {
        gsap.fromTo(image, { xPercent: -7 }, {
          xPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: image.closest(".reel-item"),
            containerAnimation: travel,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        });
      });
    });

    // Lenis moves the page on its own animation frame; update ScrollTrigger
    // on that same frame, or the pinned reel trails the scroll by one.
    let detach: (() => void) | undefined;
    const unsubscribe = onLenis((lenis) => {
      detach?.();
      detach = lenis?.on("scroll", ScrollTrigger.update);
    });

    // Photographs are lazy; the reel's length is only final once they have
    // their widths, which the aspect-ratio frames already reserve — but the
    // page above can still shift as fonts settle.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    // After a client-side navigation the page fades up 14px (app/template.tsx);
    // measure again once it has settled, or the pin engages 14px early.
    const enter = section.closest(".page-enter");
    const onEntered = (event: Event) => {
      // animationend bubbles; only the wrapper's own fade counts.
      if (event.target === enter) refresh();
    };
    enter?.addEventListener("animationend", onEntered);

    return () => {
      window.removeEventListener("load", refresh);
      enter?.removeEventListener("animationend", onEntered);
      unsubscribe();
      detach?.();
      mm.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="reel-section" aria-labelledby="reel-heading">
      <div className="wrapper reel-head">
        <div className="section-index">
          <span className="eyebrow">03 / The collection</span>
          <span className="micro-label">Room by room</span>
        </div>
        <div className="reel-title-row">
          <h2 id="reel-heading" className="editorial-heading">
            <MaskedLines lines={["Every room,", <em key="em">its own story.</em>]} />
          </h2>
          <div className="reel-meter" aria-hidden="true">
            <span className="micro-label"><span ref={countRef}>01</span> / {String(REEL.length).padStart(2, "0")}</span>
            <span className="reel-progress"><span ref={fillRef} /></span>
          </div>
        </div>
      </div>

      <div className="reel-viewport">
        <div ref={trackRef} className="reel-track">
          {REEL.map((photo, index) => (
            <figure key={photo.id} className={`reel-item reel-item-${index % 3}`}>
              <Link
                href={`/projects#${photo.id}`}
                className="reel-link"
                data-cursor="view"
                aria-label={`${photo.caption} — see it in the gallery`}
              >
                <Photo
                  photo={photo}
                  natural
                  sizes="(min-width: 1024px) 62vw, 84vw"
                  className="reel-photo"
                />
              </Link>
              <figcaption className="reel-caption">
                <span className="gallery-number">{String(index + 1).padStart(2, "0")}</span>
                <span>{photo.caption}</span>
              </figcaption>
            </figure>
          ))}
          <Link href="/projects" className="reel-end" data-cursor="view" data-cursor-label="Open">
            <span className="micro-label">{GALLERY.length} photographs</span>
            <span className="reel-end-title">See the <em>full collection</em></span>
            <span className="work-arrow" data-magnetic><ArrowUpRight size={22} strokeWidth={1.25} /></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
