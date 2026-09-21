"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "rise" | "image";
  as?: "div" | "figure";
  id?: string;
};

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "rise",
  as = "div",
  id,
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = as === "figure" ? motion.figure : motion.div;
  const isImage = variant === "image";

  return (
    <Tag
      id={id}
      className={className}
      initial={reduce ? false : isImage
        ? { opacity: 0, clipPath: "inset(0 0 8% 0)" }
        : { opacity: 0, y: 24 }}
      whileInView={isImage ? { opacity: 1, clipPath: "inset(0 0 0% 0)" } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: reduce ? 0 : isImage ? 1.05 : 0.85,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Tag>
  );
}
