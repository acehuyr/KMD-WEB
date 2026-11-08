import Link from "next/link";
import Image from "next/image";
import { COMPANY_TAGLINE } from "@/content/company";

/** The supplied company artwork, including its original lettering. */
export function BrandMark({ className = "" }: { className?: string }) {
  return <Image src="/brand/kmd-logo.jpeg" width={640} height={640} alt="KMD Interiors Pvt. Ltd." unoptimized className={`brand-mark ${className}`} />;
}

export function Logo({ className = "", withTagline = false }: { className?: string; withTagline?: boolean }) {
  return <Link href="/" aria-label="KMD Interiors Pvt. Ltd. — Home" className={`flex flex-col gap-5 text-current ${className}`}>
    <span className="brand-wordmark"><BrandMark /></span>
    {withTagline && <span className="micro-label opacity-70">{COMPANY_TAGLINE}</span>}
  </Link>;
}
