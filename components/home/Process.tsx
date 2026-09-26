"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { PROCESS } from "@/content/process";
import { MaskedLines } from "@/components/ui/MaskedLines";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 65%"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <section ref={ref} id="process" className="process-section wrapper" aria-labelledby="process-heading">
    <div className="section-index"><span className="eyebrow">04 / The journey</span><span className="micro-label">Personal from the very beginning</span></div>
    <div className="section-title-row"><h2 id="process-heading" className="editorial-heading"><MaskedLines lines={["Great spaces start", <>with <em>a conversation.</em></>]} /></h2><p className="process-intro">A clear process. An open dialogue.<br />And you, at the centre of it all.</p></div>
    <div className="process-track" aria-hidden="true"><motion.div style={{ scaleX: reduce ? 1 : scaleX }} /></div>
    <ol className="process-steps">{PROCESS.map((stage, i) => <li key={stage.index}><Reveal delay={i * 0.08}><span className="process-number">{stage.index}</span><h3>{stage.title}</h3><p>{stage.description}</p></Reveal></li>)}</ol>
  </section>;
}
