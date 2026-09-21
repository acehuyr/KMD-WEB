"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { RevealText } from "@/components/ui/RevealText";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-dvh flex-col justify-end overflow-hidden bg-charcoal text-ivory">
      {/* Background layer — real hero photography/video goes here.
          Kept as an explicit placeholder rather than stock imagery. */}
      <div className="absolute inset-0">
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1 }}
          animate={{ scale: prefersReducedMotion ? 1 : 1.06 }}
          transition={{ duration: 20, ease: "linear" }}
        >
          <PhotoPlaceholder
            tone="dark"
            label="cinematic hero — finished interior / carpentry detail (full-bleed)"
            className="h-full w-full"
          />
        </motion.div>
        {/* Functional legibility scrim for text over imagery — not a
            decorative gradient. Single hue (charcoal), not a "glow". */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/10"
        />
      </div>

      <div className="wrapper relative z-10 flex flex-col gap-8 pb-24 pt-40 sm:pb-28 lg:pb-32">
        <motion.p
          className="eyebrow text-beige"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: prefersReducedMotion ? 0 : 0.1 }}
        >
          Interior Design • Turnkey Execution • Mumbai
        </motion.p>

        <RevealText
          as="h1"
          trigger="mount"
          delay={0.3}
          lines={["Spaces Designed", "Around the Way You Live."]}
          className="max-w-4xl font-serif text-hero leading-[0.95] text-ivory"
        />

        <motion.p
          className="text-measure text-lg text-ivory/80"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: prefersReducedMotion ? 0 : 0.9 }}
        >
          From the first idea to the final detail, KMD Interior designs and
          executes thoughtfully crafted residential, commercial and
          hospitality spaces.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: prefersReducedMotion ? 0 : 1.1 }}
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 border border-bronze px-6 py-3.5 text-sm tracking-wide text-ivory transition-colors duration-300 hover:bg-bronze"
          >
            Explore Our Projects
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
          <Link
            href="/contact"
            className="text-sm tracking-wide text-ivory/85 underline decoration-ivory/30 underline-offset-4 transition-colors duration-300 hover:text-bronze hover:decoration-bronze"
          >
            Start Your Project
          </Link>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}

function ScrollIndicator() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center gap-3 pb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: prefersReducedMotion ? 0 : 1.5 }}
    >
      <span className="text-xs uppercase tracking-[0.2em] text-ivory/70">
        Scroll to explore
      </span>
      <motion.span
        aria-hidden="true"
        className="h-10 w-px bg-ivory/40"
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: [0.3, 1, 0.3] }
        }
        transition={{ duration: 2, repeat: Infinity, ease: EASE }}
      />
    </motion.div>
  );
}
