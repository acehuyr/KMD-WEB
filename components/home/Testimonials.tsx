"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MaskedLines } from "@/components/ui/MaskedLines";
import { Reveal } from "@/components/ui/Reveal";
import { TESTIMONIALS } from "@/content/testimonials";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const go = (direction: number) => setIndex((current) => (current + direction + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section aria-labelledby="testimonials-heading" className="stories-section">
      <div className="wrapper">
        <div className="section-index"><span className="eyebrow">06 / Client stories</span><span className="micro-label">The spaces we make. The people who live in them.</span></div>
        <div className="stories-layout">
          <div className="stories-heading"><h2 id="testimonials-heading" className="editorial-heading"><MaskedLines lines={["At home.", <em key="em">In their words.</em>]} /></h2><Reveal delay={0.25}><p>A few words from the people<br />we’ve had the pleasure of working with.</p></Reveal></div>
          <div className="stories-content">
            <span className="stories-quote-mark" aria-hidden="true">“</span>
            <div className="stories-quotes" aria-live="polite">
              {TESTIMONIALS.map((testimonial, quoteIndex) => <motion.figure
                key={testimonial.name}
                className="stories-quote"
                initial={false}
                animate={{ opacity: index === quoteIndex ? 1 : 0, y: reduce || index === quoteIndex ? 0 : 14 }}
                transition={{ duration: reduce ? 0 : .55, ease: [.22, 1, .36, 1] }}
                aria-hidden={index !== quoteIndex}
                style={{ pointerEvents: index === quoteIndex ? "auto" : "none" }}
              >
                <blockquote>{testimonial.quote}</blockquote>
                <figcaption><span className="stories-author-line" /><span>{testimonial.name}{testimonial.detail && <small>{testimonial.detail}</small>}</span></figcaption>
              </motion.figure>)}
            </div>
            <div className="stories-controls">
              <span className="micro-label">{String(index + 1).padStart(2, "0")} <span className="stories-total">/ {String(TESTIMONIALS.length).padStart(2, "0")}</span></span>
              <div className="stories-pagination">{TESTIMONIALS.map((item, i) => <button key={item.name} type="button" aria-label={`Show testimonial ${i + 1}`} aria-current={i === index ? "true" : undefined} onClick={() => setIndex(i)}><span className={i === index ? "is-active" : ""} /></button>)}</div>
              <div className="photo-dialog-controls"><button className="circle-control" type="button" aria-label="Previous testimonial" onClick={() => go(-1)}><ArrowLeft size={18} /></button><button className="circle-control" type="button" aria-label="Next testimonial" onClick={() => go(1)}><ArrowRight size={18} /></button></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
