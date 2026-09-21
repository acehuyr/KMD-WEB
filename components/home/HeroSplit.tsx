"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { getPhoto } from "@/content/projects";

const scenes = [
  { photo: getPhoto("lounge-brass-chandelier"), title: "A quieter kind of luxury", material: "Stone, brass & soft textures" },
  { photo: getPhoto("dining-room-crane-artwork"), title: "Room for the everyday", material: "Natural light & thoughtful detail" },
  { photo: getPhoto("entrance-brass-screen"), title: "An entrance, reimagined", material: "Etched brass & book-matched marble" },
];
const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSplit() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.15 });
  const reduce = useReducedMotion();
  const playing = !reduce && !paused && !hovered && !focused && visible && inView;
  const scene = scenes[active];

  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % scenes.length), 6000);
    return () => window.clearTimeout(timer);
  }, [active, playing]);

  return (
    <section ref={ref} className="editorial-hero" aria-labelledby="hero-heading">
      <div className="wrapper">
        <div className="hero-kicker"><span className="eyebrow">Interior design & craftsmanship</span><span className="micro-label">Mumbai, India <span aria-hidden="true">↗</span></span></div>
        <div className="hero-intro">
          <h1 id="hero-heading" className="hero-title">
            <span className="title-mask"><motion.span initial={{ y: reduce ? 0 : "110%" }} animate={{ y: 0 }} transition={{ duration: reduce ? 0 : 1.35, delay: reduce ? 0 : 0.15, ease }}>The art of</motion.span></span>
            <span className="title-mask"><motion.em initial={{ y: reduce ? 0 : "110%" }} animate={{ y: 0 }} transition={{ duration: reduce ? 0 : 1.45, delay: reduce ? 0 : 0.35, ease }}>living well.</motion.em></span>
          </h1>
          <motion.div className="hero-note" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.4 }}>
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
        <div className="hero-scene-inner">
          <AnimatePresence initial={false}>
            <motion.div key={scene.photo.id} className="hero-scene-image" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 1.2, ease }}>
              <Photo photo={scene.photo} eager sizes="(min-width: 1500px) 1460px, (min-width: 1024px) calc(100vw - 96px), calc(100vw - 48px)" className="h-full w-full" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      </Reveal>
      </div>
      <div className="wrapper hero-caption">
        <div className="hero-caption-copy" aria-live={playing ? "off" : "polite"} aria-atomic="true"><span className="micro-label">{String(active + 1).padStart(2, "0")} / Selected spaces</span><motion.div key={active} initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.65 }}><p>{scene.title}</p><span className="hero-material micro-label">{scene.material}</span></motion.div></div>
        <a href="#studio" className="hero-explore" aria-label="Scroll to discover the studio"><ArrowDown size={18} /><span>Explore the studio</span></a>
        <div className="scene-controls">
          {!reduce && <button type="button" aria-label={paused ? "Play slideshow" : "Pause slideshow"} onClick={() => { if (paused) { setFocused(false); setHovered(false); } setPaused(!paused); }}>{paused ? <Play size={16} /> : <Pause size={16} />}</button>}
          <button type="button" aria-label="Previous interior" onClick={() => setActive((active + scenes.length - 1) % scenes.length)}><ArrowLeft size={18} /></button>
          <span className="scene-count">{String(active + 1).padStart(2, "0")} <span>/ 03</span></span>
          <button type="button" aria-label="Next interior" onClick={() => setActive((active + 1) % scenes.length)}><ArrowRight size={18} /></button>
        </div>
      </div>
      <div className="wrapper"><div className="scene-progress" aria-hidden="true">{scenes.map((item, index) => <span key={item.photo.id}>{index === active && <motion.span key={`${active}-${playing}`} className="scene-progress-fill" initial={{ scaleX: playing ? 0 : 1 }} animate={{ scaleX: 1 }} transition={{ duration: playing ? 6 : 0, ease: "linear" }} />}</span>)}</div></div>
      </div>
    </section>
  );
}
