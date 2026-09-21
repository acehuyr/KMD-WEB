"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { SERVICES } from "@/content/services";
import { getPhoto } from "@/content/projects";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";

const photos = ["living-room-marble-credenza", "entrance-brass-screen", "dining-room-crane-artwork"];
const ease = [0.22, 1, 0.36, 1] as const;

export function Services() {
  const [open, setOpen] = useState<number | null>(0);
  const [activePhoto, setActivePhoto] = useState(0);
  const reduce = useReducedMotion();

  function selectService(index: number) {
    setOpen(open === index ? null : index);
    setActivePhoto(index);
  }

  return (
    <section id="services" className="services-section section-dark" aria-labelledby="services-heading">
      <div className="wrapper">
        <div className="section-index">
          <span className="eyebrow">03 / What we do</span>
          <span className="micro-label">From a vision to a place of your own</span>
        </div>
        <div className="services-grid">
          <Reveal className="services-visual">
            <h2 id="services-heading" className="editorial-heading">One vision.<br /><em>Every detail.</em></h2>
            <div className="service-image">
              <AnimatePresence initial={false}>
                <motion.div key={activePhoto} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.5 }}>
                  <Photo photo={getPhoto(photos[activePhoto])} className="h-full w-full" sizes="(min-width: 768px) 45vw, calc(100vw - 48px)" />
                </motion.div>
              </AnimatePresence>
            </div>
            <span className="micro-label">The thought. The craft. The complete picture.</span>
          </Reveal>
          <div className="services-list">
            <p className="services-intro">Beautiful ideas deserve beautiful execution. We bring design and making together, with one team that sees it all through.</p>
            {SERVICES.map((service, index) => {
              const isOpen = open === index;
              return (
                <div className={`service-row ${isOpen ? "is-open" : ""}`} key={service.index}>
                  <h3>
                    <button type="button" onClick={() => selectService(index)} aria-expanded={isOpen} aria-controls={`service-panel-${index}`}>
                      <span className="micro-label">{service.index}</span>
                      <span>{service.title}</span>
                      <Plus size={20} className="service-plus" />
                    </button>
                  </h3>
                  <motion.div
                    id={`service-panel-${index}`}
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: reduce ? 0 : 0.5, ease }}
                    aria-hidden={!isOpen}
                    inert={!isOpen}
                    className="overflow-hidden"
                  >
                    <div className="service-panel">
                      <p>{service.description}</p>
                      <ul>{service.capabilities.map(capability => <li key={capability}>{capability}</li>)}</ul>
                    </div>
                  </motion.div>
                </div>
              );
            })}
            <Link href="/contact" className="text-link">Let’s talk about your space <ArrowUpRight size={18} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
