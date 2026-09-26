import { SECTORS } from "@/content/expertise";
import { MaskedLines } from "@/components/ui/MaskedLines";
import { Reveal } from "@/components/ui/Reveal";

export function Expertise() {
  return <section id="expertise" className="expertise-compact wrapper" aria-labelledby="expertise-heading">
    <div className="section-index"><span className="eyebrow">05 / Our expertise</span><span className="micro-label">Thoughtful design, wherever life happens</span></div>
    <div className="expertise-layout"><h2 id="expertise-heading" className="editorial-heading"><MaskedLines lines={["A sense of", <em key="em">place.</em>]} /></h2>
      <div className="expertise-list">{SECTORS.map((sector, index) => <Reveal key={sector.index} delay={index * .06}><h3>{sector.title}</h3><p>{sector.description}</p></Reveal>)}</div>
    </div>
  </section>;
}
