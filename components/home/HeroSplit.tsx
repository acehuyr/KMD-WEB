"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { getPhoto } from "@/content/projects";

const scenes = [
  { photo: getPhoto("lounge-brass-chandelier"), title: "A quieter kind of luxury", material: "Stone, brass & soft textures" },
  { photo: getPhoto("dining-room-crane-artwork"), title: "Room for the everyday", material: "Natural light & thoughtful detail" },
  { photo: getPhoto("entrance-brass-screen"), title: "An entrance, reimagined", material: "Etched brass & book-matched marble" },
];
const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSplit() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const scene = scenes[active];

  return (
    <section className="editorial-hero" aria-labelledby="hero-heading">
      <div className="wrapper">
        <div className="hero-kicker"><span className="eyebrow">Interior design & craftsmanship</span><span className="micro-label">Mumbai, India <span aria-hidden="true">↗</span></span></div>
        <div className="hero-intro">
          <h1 id="hero-heading" className="hero-title">
            <span className="title-mask"><motion.span initial={{ y: reduce ? 0 : "105%" }} animate={{ y: 0 }} transition={{ duration: reduce ? 0 : 1, ease }}>The art of</motion.span></span>
            <span className="title-mask"><motion.em initial={{ y: reduce ? 0 : "105%" }} animate={{ y: 0 }} transition={{ duration: reduce ? 0 : 1.1, delay: reduce ? 0 : 0.12, ease }}>living well.</motion.em></span>
          </h1>
          <motion.div className="hero-note" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.4 }}>
            <span className="hero-note-mark" aria-hidden="true">✳</span>
            <p>Thoughtfully designed.<br />Beautifully made.<br />Entirely yours.</p>
            <Link href="/projects" className="text-link">Discover our work <ArrowUpRight size={17} /></Link>
          </motion.div>
        </div>
      </div>
      <div className="wrapper">
      <div className="hero-scene" aria-roledescription="carousel" aria-label="Selected interiors">
        <div className="hero-scene-inner">
          <AnimatePresence initial={false}>
            <motion.div key={scene.photo.id} className="hero-scene-image" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.65, ease }}>
              <Photo photo={scene.photo} eager sizes="(min-width: 1500px) 1460px, (min-width: 1024px) calc(100vw - 96px), calc(100vw - 48px)" className="h-full w-full" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      </div>
      <div className="wrapper hero-caption">
        <div className="hero-caption-copy" aria-live="polite" aria-atomic="true"><span className="micro-label">{String(active + 1).padStart(2, "0")} / Selected spaces</span><p>{scene.title}</p><span className="hero-material micro-label">{scene.material}</span></div>
        <a href="#studio" className="hero-explore" aria-label="Scroll to discover the studio"><ArrowDown size={18} /><span>Explore the studio</span></a>
        <div className="scene-controls">
          <button type="button" aria-label="Previous interior" onClick={() => setActive((active + scenes.length - 1) % scenes.length)}><ArrowLeft size={18} /></button>
          <span className="scene-count">{String(active + 1).padStart(2, "0")} <span>/ 03</span></span>
          <button type="button" aria-label="Next interior" onClick={() => setActive((active + 1) % scenes.length)}><ArrowRight size={18} /></button>
        </div>
      </div>
      <div className="wrapper"><div className="scene-progress" aria-hidden="true">{scenes.map((item, index) => <span key={item.photo.id} className={active === index ? "is-active" : ""} />)}</div></div>
    </section>
  );
}
