import type { SVGProps } from "react";

/**
 * Hand-drawn, monoline placeholder glyphs (not the official brand marks) —
 * `lucide-react` ships no social/brand icons in the version installed here.
 * Swap for the real brand assets if/when licensing requires it.
 */

export function IconInstagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.3" cy="7.7" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconLinkedin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="7" y1="10" x2="7" y2="17" />
      <circle cx="7" cy="6.2" r="0.75" fill="currentColor" stroke="none" />
      <path d="M11 17v-4.2a2.4 2.4 0 0 1 4.8 0V17" />
      <line x1="11" y1="10" x2="11" y2="17" />
    </svg>
  );
}

export function IconFacebook(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14 20v-7h2.2l.4-3H14V8a1 1 0 0 1 1-1h1.6V4.3A20 20 0 0 0 14.2 4 3.6 3.6 0 0 0 10.6 7.8V10H8.5v3h2.1v7" />
    </svg>
  );
}
