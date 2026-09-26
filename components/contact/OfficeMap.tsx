import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SITE_CONTACT, SITE_CONTACT_MAPS_HREF, SITE_CONTACT_MAP_EMBED_SRC } from "@/content/contact";

/**
 * Where the office is, labelled as KMD Interior. Google Maps itself can't
 * show that name until KMD has a Google Business Profile — see
 * SITE_CONTACT_MAP_EMBED_SRC — so the name and address are this card's
 * job, and the map underneath only supplies the pin.
 */
export function OfficeMap() {
  return (
    <section aria-labelledby="office-map-heading" className="bg-ivory pb-section-md lg:pb-section-lg">
      <div className="wrapper office-map-layout">
        <Reveal variant="image" className="office-map">
          <iframe
            src={SITE_CONTACT_MAP_EMBED_SRC}
            title="Map showing the KMD Interior office at Rizvi Park, Santacruz West, Mumbai"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
        <Reveal className="office-map-card" delay={0.2}>
          <span className="eyebrow">Visit the studio</span>
          <div className="office-map-name">
            <Image src="/brand/kmd-interior-badge.webp" alt="" width={80} height={80} quality={90} />
            <h2 id="office-map-heading">KMD Interior</h2>
          </div>
          <address>
            {SITE_CONTACT.officeLines.map((line) => <span key={line} className="block">{line}</span>)}
          </address>
          <a href={SITE_CONTACT_MAPS_HREF} target="_blank" rel="noopener noreferrer" className="text-link">
            Open in Google Maps <ArrowUpRight size={17} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
