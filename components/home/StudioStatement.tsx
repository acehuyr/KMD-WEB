"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

const lines = ["Good design is felt.", "In the details. In the everyday.", "In the way you feel at home."];
const totalWords = lines.join(" ").split(" ").length;

function Word({ children, index, progress }: { children: string; index: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const color = useTransform(progress, [index / totalWords, (index + 1) / totalWords], ["#858776", "#292e25"]);
  return <motion.span className="studio-word" style={{ color: reduce ? "#292e25" : color }}>{children}{" "}</motion.span>;
}

export function StudioStatement() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "end 45%"] });
  let wordIndex = 0;

  return (
    <h2 ref={ref} id="studio-heading" className="studio-statement" aria-label={lines.join(" ")}>
      {lines.map((line, index) => (
        <span key={line} className={`studio-line studio-line-${index + 1}`} aria-hidden="true">
          {line.split(" ").map((word) => <Word key={wordIndex} index={wordIndex++} progress={scrollYProgress}>{word}</Word>)}
        </span>
      ))}
    </h2>
  );
}
