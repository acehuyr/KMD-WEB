import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { getPhoto } from "@/content/projects";
import { StudioStatement } from "@/components/home/StudioStatement";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export function About() {
  return (
    <section id="studio" className="studio-section wrapper" aria-labelledby="studio-heading">
      <div className="section-index"><span className="eyebrow">01 / The studio</span><span className="micro-label">Designed with intent. Made with care.</span></div>
      <StudioStatement />
      <div className="studio-bottom">
        <Reveal className="studio-detail" variant="image"><Photo photo={getPhoto("corridor-fitted-joinery")} natural sizes="(min-width: 768px) 25vw, 70vw" /><span className="micro-label">Craft, in every corner.</span></Reveal>
        <Reveal className="studio-copy" delay={0.12}>
          <p>We are KMD Interior, a Mumbai-based design and artistry contracting firm. We bring spaces to life through considered design, honest materials and a deep-rooted love for making.</p>
          <p>From the first sketch to the final finish, our designers and craftspeople work as one. Over 11 years of experience. One thoughtful, seamless journey.</p>
          <Link href="/about" className="text-link">A little more about us <ArrowUpRight size={18} /></Link>
        </Reveal>
        <div className="studio-aside"><span className="studio-number"><AnimatedCounter value={11} duration={1900} /><sup>+</sup></span><span className="micro-label">Years of<br />considered craft</span></div>
      </div>
    </section>
  );
}
