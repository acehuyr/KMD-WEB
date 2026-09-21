import { SECTORS } from "@/content/expertise";
import { Reveal } from "@/components/ui/Reveal";

export function Expertise() {
  return <section id="expertise" className="expertise-compact wrapper" aria-labelledby="expertise-heading">
    <div className="section-index"><span className="eyebrow">05 / Our expertise</span><span className="micro-label">Thoughtful design, wherever life happens</span></div>
    <div className="expertise-layout"><Reveal><h2 id="expertise-heading" className="editorial-heading">A sense of<br /><em>place.</em></h2></Reveal>
      <div className="expertise-list">{SECTORS.map((sector, index) => <Reveal key={sector.index} delay={index * .06}><h3>{sector.title}</h3><p>{sector.description}</p></Reveal>)}</div>
    </div>
  </section>;
}
