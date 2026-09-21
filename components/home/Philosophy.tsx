import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { getPhoto } from "@/content/projects";

export function Philosophy() {
  return (
    <section className="philosophy-section section-dark" aria-labelledby="philosophy-heading">
      <div className="wrapper philosophy-grid">
        <Reveal variant="image" className="philosophy-image">
          <Photo photo={getPhoto("bedroom-agate-panels")} natural sizes="(min-width: 768px) 48vw, calc(100vw - 48px)" />
        </Reveal>
        <div className="philosophy-copy">
          <h2 id="philosophy-heading" className="eyebrow">The way we see it</h2>
          <blockquote>
            <RevealText
              as="p"
              trigger="inView"
              lines={["“We are interior designers", "from the soul.”"]}
              className="font-serif text-display leading-[1.15] tracking-tight text-ivory"
            />
          </blockquote>
          <p>It’s not about just putting things in a room. It’s much deeper and broader — it’s about self-discovery.</p>
          <span className="micro-label">The KMD philosophy</span>
        </div>
      </div>
    </section>
  );
}
