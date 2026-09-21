"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { NAV_LINKS } from "@/lib/nav-links";
import { SITE_CONTACT } from "@/content/contact";

export function MobileMenu({
  id,
  isOpen,
  onClose,
}: {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Focus the close button on open, and let Escape close the menu — the
  // toggle button in Header owns returning focus on close.
  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dialogRef}
          id={id}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-charcoal text-ivory lg:hidden"
        >
          <div className="wrapper flex h-20 items-center justify-between">
            <span className="font-serif text-xl tracking-wide">
              KMD Interior
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="inline-flex h-11 w-11 items-center justify-center text-ivory transition-colors hover:text-bronze"
              aria-label="Close menu"
            >
              <X aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="wrapper flex flex-1 flex-col justify-center gap-1 py-8"
          >
            {NAV_LINKS.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.4,
                  delay: prefersReducedMotion ? 0 : 0.05 * index,
                }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="flex min-h-[44px] items-center border-b border-charcoal-soft py-4 font-serif text-3xl tracking-wide text-ivory transition-colors hover:text-bronze sm:text-4xl"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="wrapper flex flex-col gap-6 pb-10 pt-4">
            <Link
              href="/contact"
              onClick={onClose}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-bronze px-6 py-4 text-sm tracking-wide text-ivory transition-colors hover:bg-bronze"
            >
              Start a Project
              <span aria-hidden="true">→</span>
            </Link>
            <a
              href={`tel:${SITE_CONTACT.phoneTel}`}
              className="text-sm text-ivory/70 transition-colors hover:text-bronze"
            >
              {SITE_CONTACT.phoneDisplay}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
