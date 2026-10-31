import Link from "next/link";
import { COMPANY_TAGLINE } from "@/content/company";

/**
 * The house-and-KMD mark from the company logo, drawn as a CSS mask so it
 * takes its colour from the section it sits in — bronze on light, pale
 * bronze on dark (see .brand-mark in globals.css). Decorative: whatever
 * contains it carries the company name.
 */
export function BrandMark({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`brand-mark ${className}`} />;
}

export function Logo({ className = "", withTagline = false }: { className?: string; withTagline?: boolean }) {
  return <Link href="/" aria-label="KMD Interiors Pvt. Ltd. — Home" className={`flex flex-col gap-5 text-current ${className}`}>
    <span className="brand-wordmark"><BrandMark /><span className="brand-descriptor">Interiors<br />Pvt. Ltd.</span></span>
    {withTagline && <span className="micro-label opacity-70">{COMPANY_TAGLINE}</span>}
  </Link>;
}
