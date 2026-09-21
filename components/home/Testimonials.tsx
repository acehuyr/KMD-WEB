"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/content/testimonials";
import { cx } from "@/lib/cx";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const testimonial = TESTIMONIALS[index];

  const go = (direction: 1 | -1) => {
    setIndex((prev) => (prev + direction + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-offwhite py-section-md lg:py-section-lg"
    >
      <div className="wrapper flex flex-col gap-16">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Client Stories"
          lines={["What our clients say."]}
          align="center"
        />

        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8">
          <div className="relative w-full">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -12 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: EASE }}
                className="flex flex-col items-center gap-6 text-center"
              >
                <span aria-hidden="true" className="font-serif text-6xl leading-none text-bronze">
                  “
                </span>
                <p className="font-serif text-2xl leading-snug text-charcoal sm:text-3xl">
                  {testimonial.quote}
                </p>
                <div className="flex flex-col gap-1 text-sm text-charcoal-soft">
                  <span className="font-medium text-charcoal">{testimonial.name}</span>
                  {testimonial.detail && <span>{testimonial.detail}</span>}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-6 pt-4">
            {/* The controls are padded out to a 24px hit area (WCAG 2.5.8
                Target Size (Minimum)) while the dot itself stays a 6px
                mark. Sizing the button to the dot would have made these
                6px targets — unusable on a touch screen, and the smallest
                interactive elements on the site. */}
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="-m-2 flex h-11 w-11 items-center justify-center text-charcoal-soft transition-colors duration-300 hover:text-bronze"
            >
              ←
            </button>
            <div className="flex items-center">
              {TESTIMONIALS.map((_, dotIndex) => (
                <button
                  key={dotIndex}
                  type="button"
                  onClick={() => setIndex(dotIndex)}
                  aria-label={`Show testimonial ${dotIndex + 1}`}
                  aria-current={dotIndex === index}
                  className="flex h-6 w-6 items-center justify-center"
                >
                  <span
                    aria-hidden="true"
                    className={cx(
                      "h-1.5 w-1.5 rounded-full transition-colors duration-300",
                      dotIndex === index ? "bg-bronze" : "bg-beige"
                    )}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="-m-2 flex h-11 w-11 items-center justify-center text-charcoal-soft transition-colors duration-300 hover:text-bronze"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
