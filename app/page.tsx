import { About } from "@/components/home/About";
import { Clients } from "@/components/home/Clients";
import { Expertise } from "@/components/home/Expertise";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { FinalCta } from "@/components/home/FinalCta";
import { HeroSplit as Hero } from "@/components/home/HeroSplit";
import { Philosophy } from "@/components/home/Philosophy";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";
import { Testimonials } from "@/components/home/Testimonials";

/**
 * Full homepage. Contact section is built separately.
 *
 * `Transformations` (the before/after slider) is deliberately not
 * included: KMD publishes no before/after photography, so the section
 * could only render a "content needed" panel on a live page. The
 * component and its slider are kept in the codebase, ready to drop back
 * in here once real pairs exist — see components/home/Transformations.tsx.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedProjects />
      <Services />
      <Process />
      <Philosophy />
      <Expertise />
      <Clients />
      <Testimonials />
      <FinalCta />
    </>
  );
}
