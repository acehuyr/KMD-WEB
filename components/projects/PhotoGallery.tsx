import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { GALLERY } from "@/content/projects";
import { cx } from "@/lib/cx";

// Keep the editorial rhythm, but let each photograph determine its height.
// This preserves every room's complete field of view, including triptychs.
const SPANS: Record<string, string> = {
  "living-room-city-view": "lg:col-span-12",
  "living-room-timber-ceiling": "lg:col-span-12",
  "residence-passages": "lg:col-span-12",
  "bedroom-agate-panels": "lg:col-span-7",
  "bedroom-blue-headboard": "lg:col-span-5",
  "living-room-teak-floor": "lg:col-span-7",
  "living-room-teak-floor-seating": "lg:col-span-5",
  "bedroom-contemporary-white": "lg:col-span-6",
  "bathroom-sculpted-white": "lg:col-span-6",
  "entrance-brass-screen": "lg:col-span-7",
  "powder-room-quartzite": "lg:col-span-5",
  "lounge-brass-chandelier": "lg:col-span-6",
  "living-room-evening": "lg:col-span-6",
  "living-room-marble-credenza": "lg:col-span-7",
  "corridor-fitted-joinery": "lg:col-span-5",
  "dining-room-crane-artwork": "lg:col-span-12",
};

export function PhotoGallery() {
  return (
    <div className="portfolio-gallery grid grid-cols-1 items-start gap-x-8 gap-y-14 lg:grid-cols-12 lg:gap-y-20">
      {GALLERY.map((photo, index) => {
        const span = SPANS[photo.id] ?? "lg:col-span-6";
        const columns = Number(span.split("-").at(-1));
        return (
          <Reveal
            as="figure"
            id={photo.id}
            key={photo.id}
            className={cx("gallery-figure col-span-1", span)}
          >
            <Photo
              photo={photo}
              natural
              sizes={`(min-width: 1024px) ${Math.round(columns / 12 * 94)}vw, calc(100vw - 48px)`}
              eager={index === 0}
              className="w-full"
            />
            <figcaption className="gallery-caption">
              <span className="gallery-number">{String(index + 1).padStart(2, "0")}</span>
              <span>{photo.caption}</span>
            </figcaption>
          </Reveal>
        );
      })}
    </div>
  );
}
