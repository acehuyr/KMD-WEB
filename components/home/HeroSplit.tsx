"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { getPhoto } from "@/content/projects";
import { useStageReady } from "@/lib/stage";

const scenes = [
  { photo: getPhoto("lounge-brass-chandelier"), title: "A quieter kind of luxury", material: "Stone, brass & soft textures" },
  { photo: getPhoto("dining-room-crane-artwork"), title: "Room for the everyday", material: "Natural light & thoughtful detail" },
  { photo: getPhoto("entrance-brass-screen"), title: "An entrance, reimagined", material: "Etched brass & book-matched marble" },
];
const ease = [0.22, 1, 0.36, 1] as const;
const wipe = [0.76, 0, 0.24, 1] as const;
const WIPE_SECONDS = 1.3;

type Slides = { active: number; previous: number | null; direction: 1 | -1 };

function slidesReducer(state: Slides, step: 1 | -1): Slides {
  return {
    active: (state.active + step + scenes.length) % scenes.length,
    previous: state.active,
    direction: step,
  };
}

export function HeroSplit() {
  const [{ active, previous, direction }, go] = useReducer(slidesReducer, { active: 0, previous: null, direction: 1 });
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.15 });
  const reduce = useReducedMotion();
  const ready = useStageReady();
  const playing = !reduce && ready && !paused && !hovered && !focused && visible && inView;
  const scene = scenes[active];

  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => go(1), 6000);
    return () => window.clearTimeout(timer);
  }, [active, playing]);

  // Held below their masks until the intro curtain lifts (or at once when
  // there is no intro), then rise as it clears.
  const rise = (delay: number, duration: number) => ({
    initial: { y: reduce ? 0 : "110%" },
    animate: ready ? { y: 0 } : undefined,
    transition: { duration: reduce ? 0 : duration, delay: reduce ? 0 : delay, ease },
  });

  return (
    <section ref={ref} className="editorial-hero" aria-labelledby="hero-heading">
      <div className="wrapper">
        <div className="hero-kicker" data-ready={ready || undefined}><span className="eyebrow">Interior design & craftsmanship</span><span className="micro-label">Mumbai, India <span aria-hidden="true">↗</span></span></div>
        <div className="hero-intro">
          <h1 id="hero-heading" className="hero-title">
            <span className="title-mask"><motion.span {...rise(0.15, 1.35)}>The art of</motion.span></span>
            <span className="title-mask"><motion.em {...rise(0.35, 1.45)}>living well.</motion.em></span>
          </h1>
          <motion.div className="hero-note" initial={{ opacity: 0, y: 16 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.4 }}>
            <span className="hero-note-mark" aria-hidden="true">✳</span>
            <p>Thoughtfully designed.<br />Beautifully made.<br />Entirely yours.</p>
            <Link href="/projects" className="text-link">Discover our work <ArrowUpRight size={17} /></Link>
          </motion.div>
        </div>
      </div>
      <div className="hero-slideshow" onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }} onPointerLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div className="wrapper">
      <Reveal variant="image" className="hero-scene" >
      <div role="group" aria-roledescription="carousel" aria-label="Selected interiors">
        {/* All three slides stay mounted and stacked, so each photograph is
            loaded before its turn and a change never waits on the network.
            The incoming slide wipes across the outgoing one, its picture
            pushing in from the side while the old one drifts away. */}
        <div className="hero-scene-inner">
          {scenes.map((item, index) => {
            const isActive = index === active;
            const isPrevious = index === previous;
            const from = direction > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)";
            return (
              <motion.div
                key={item.photo.id}
                className="hero-scene-image"
                style={{ zIndex: isActive ? 2 : isPrevious ? 1 : 0 }}
                aria-hidden={!isActive}
                initial={false}
                animate={{ clipPath: isActive && previous !== null ? [from, "inset(0 0% 0 0%)"] : "inset(0 0% 0 0%)" }}
                transition={{ duration: reduce ? 0 : WIPE_SECONDS, ease: wipe }}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={false}
                  animate={
                    reduce ? { x: 0 }
                      : isActive && previous !== null ? { x: [`${direction * 14}%`, "0%"], scale: [1.08, 1] }
                      : isPrevious ? { x: `${direction * -9}%` }
                      : { x: "0%", scale: 1 }
                  }
                  // The push-in matches the wipe; the zoom is the slow settle
                  // each slide makes while on screen (the first slide's comes
                  // from the CSS `scene-settle` on load).
                  transition={reduce ? { duration: 0 } : {
                    x: { duration: WIPE_SECONDS, ease: wipe },
                    scale: { duration: 7, ease: [0.25, 0.1, 0.25, 1] },
                  }}
                >
                  <Photo photo={item.photo} eager={index === 0} sizes="(min-width: 1500px) 1460px, (min-width: 1024px) calc(100vw - 96px), calc(100vw - 48px)" className="h-full w-full" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
      </Reveal>
      </div>
      <div className="wrapper hero-caption">
        <div className="hero-caption-copy" aria-live={playing ? "off" : "polite"} aria-atomic="true"><span className="micro-label">{String(active + 1).padStart(2, "0")} / Selected spaces</span><motion.div key={active} initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.65, delay: reduce || previous === null ? 0 : 0.35 }}><p>{scene.title}</p><span className="hero-material micro-label">{scene.material}</span></motion.div></div>
        <a href="#studio" className="hero-explore" aria-label="Scroll to discover the studio"><ArrowDown size={18} /><span>Explore the studio</span></a>
        <div className="scene-controls">
          {!reduce && <button type="button" data-magnetic aria-label={paused ? "Play slideshow" : "Pause slideshow"} onClick={() => { if (paused) { setFocused(false); setHovered(false); } setPaused(!paused); }}>{paused ? <Play size={16} /> : <Pause size={16} />}</button>}
          <button type="button" data-magnetic aria-label="Previous interior" onClick={() => go(-1)}><ArrowLeft size={18} /></button>
          <span className="scene-count">{String(active + 1).padStart(2, "0")} <span>/ 03</span></span>
          <button type="button" data-magnetic aria-label="Next interior" onClick={() => go(1)}><ArrowRight size={18} /></button>
        </div>
      </div>
      <div className="wrapper"><div className="scene-progress" aria-hidden="true">{scenes.map((item, index) => <span key={item.photo.id}>{index === active && <motion.span key={`${active}-${playing}`} className="scene-progress-fill" initial={{ scaleX: playing ? 0 : 1 }} animate={{ scaleX: 1 }} transition={{ duration: playing ? 6 : 0, ease: "linear" }} />}</span>)}</div></div>
      </div>
    </section>
  );
}
