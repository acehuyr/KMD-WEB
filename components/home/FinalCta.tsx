import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MaskedLines } from "@/components/ui/MaskedLines";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCta() {
  return <section className="contact-invitation" aria-labelledby="final-cta-heading"><div className="wrapper">
    <span className="eyebrow">Your next chapter</span>
    <Link href="/contact" className="invitation-link"><h2 id="final-cta-heading"><MaskedLines lines={["Let’s make", <em key="em">room for you.</em>]} /></h2><Reveal className="shrink-0" delay={0.35}><span className="invitation-arrow"><ArrowUpRight strokeWidth={1} /></span></Reveal></Link>
    <div className="invitation-bottom"><p>A new home. A fresh perspective. A space that feels like you.</p><Link href="/contact" className="text-link">Start a conversation <ArrowUpRight size={18} /></Link></div>
  </div></section>;
}
