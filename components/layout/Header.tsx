"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { NAV_LINKS } from "@/lib/nav-links";
import { Logo } from "./Logo";
import { NavLink } from "./NavLink";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 35 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTucked, setIsTucked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    menuButton.current?.focus();
  }, []);

  // Tuck the header away while reading down the page and bring it back on
  // any scroll up. Small deltas are accumulated rather than acted on, so
  // trackpad jitter doesn't make it flicker.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 20);
      if (y < 480) {
        setIsTucked(false);
        lastY = y;
      } else if (Math.abs(y - lastY) > 8) {
        setIsTucked(y > lastY);
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onResize = () => { if (window.innerWidth >= 1024) closeMenu(); };
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("resize", onResize);
    };
  }, [isMenuOpen, closeMenu]);

  return (
    <header className={`site-header fixed inset-x-0 top-0 z-50 ${isScrolled ? "is-scrolled" : ""} ${isTucked && !isMenuOpen ? "is-tucked" : ""}`}>
      {!reduce && <motion.div aria-hidden="true" className="reading-progress" style={{ scaleX: progress }} />}
      <div className="wrapper header-inner">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map(link => <NavLink key={link.href} href={link.href}>{link.label}</NavLink>)}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/contact" className="header-cta hidden sm:inline-flex">Let’s talk <ArrowUpRight size={16} /></Link>
          <button ref={menuButton} type="button" onClick={() => setIsMenuOpen(true)} className="inline-flex h-11 w-11 items-center justify-center lg:hidden" aria-label="Open menu" aria-haspopup="dialog" aria-expanded={isMenuOpen} aria-controls="mobile-menu"><Menu size={23} strokeWidth={1.25} /></button>
        </div>
      </div>
      <MobileMenu id="mobile-menu" isOpen={isMenuOpen} onClose={closeMenu} />
    </header>
  );
}
