import Link from "next/link";
import { COMPANY_TAGLINE } from "@/content/company";

export function Logo({ className = "", withTagline = false }: { className?: string; withTagline?: boolean }) {
  return <Link href="/" aria-label="KMD Interior — Home" className={`flex flex-col gap-5 text-current ${className}`}>
    <span className="brand-wordmark"><span className="brand-monogram">KMD</span><span className="brand-descriptor">Interior<br />Design & craft</span></span>
    {withTagline && <span className="micro-label opacity-70">{COMPANY_TAGLINE}</span>}
  </Link>;
}
