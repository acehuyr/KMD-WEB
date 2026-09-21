import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { getPhoto } from "@/content/projects";

const work = [
  { id: "living-room-evening", title: "The softer side of living", detail: "Living spaces / Material & mood" },
  { id: "powder-room-quartzite", title: "A study in natural textures", detail: "Intimate spaces / Stone & walnut" },
  { id: "bedroom-contemporary-white", title: "A moment of calm", detail: "Private spaces / Form & light" },
];

export function FeaturedProjects() {
  return (
    <section className="selected-section" aria-labelledby="selected-heading">
      <div className="wrapper">
        <div className="section-index"><span className="eyebrow">02 / Selected work</span><span className="micro-label">A glimpse into our world</span></div>
        <div className="section-title-row"><Reveal><h2 id="selected-heading" className="editorial-heading">Spaces with<br /><em>something to say.</em></h2></Reveal><Link href="/projects" className="text-link">Explore all interiors <ArrowUpRight size={18} /></Link></div>
        <div className="selected-grid">
          {work.map((item, index) => <Reveal className={`selected-item selected-item-${index + 1}`} key={item.id}>
            <Link href={`/projects#${item.id}`} className="work-link" aria-label={`Explore ${item.title}`}>
              <Reveal variant="image" className="work-image"><Photo photo={getPhoto(item.id)} natural sizes={index === 2 ? "(min-width: 768px) 70vw, 100vw" : index === 1 ? "(min-width: 768px) 33vw, 82vw" : "(min-width: 768px) 55vw, 100vw"} className="w-full" /></Reveal>
              <div className="work-caption"><div><span className="micro-label">{item.detail}</span><h3>{item.title}</h3></div><span className="work-arrow"><ArrowUpRight size={22} strokeWidth={1.25} /></span></div>
            </Link>
          </Reveal>)}
          <div className="selected-note"><span aria-hidden="true">✳</span><p>Different spaces.<br />The same obsession<br />with <em>detail.</em></p></div>
        </div>
      </div>
    </section>
  );
}
