"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
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
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const photo = active === null ? null : GALLERY[active];
  const isOpen = active !== null;

  useEffect(() => {
    if (!isOpen) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const step = (direction: number) => setActive((current) => current === null ? null : (current + direction + GALLERY.length) % GALLERY.length);

  return (
    <>
    <div className="gallery-intro"><span className="micro-label">{String(GALLERY.length).padStart(2, "0")} / A closer look</span><span>Select a photograph to explore</span></div>
    <div className="portfolio-gallery grid grid-cols-1 items-start gap-x-8 gap-y-14 lg:grid-cols-12 lg:gap-y-20">
      {GALLERY.map((photo, index) => {
        const span = SPANS[photo.id] ?? "lg:col-span-6";
        const columns = Number(span.split("-").at(-1));
        return (
          <Reveal
            as="figure"
            variant="image"
            id={photo.id}
            key={photo.id}
            className={cx("gallery-figure col-span-1", span)}
          >
            <button type="button" className="gallery-open" onClick={() => setActive(index)} aria-label={`View full image: ${photo.caption}`} aria-haspopup="dialog">
            <Photo
              photo={photo}
              natural
              sizes={`(min-width: 1024px) ${Math.round(columns / 12 * 94)}vw, calc(100vw - 48px)`}
              eager={index === 0}
              className="w-full"
            />
            <span className="gallery-open-label" aria-hidden="true">View space <Maximize2 size={15} strokeWidth={1.5} /></span>
            </button>
            <figcaption className="gallery-caption">
              <span className="gallery-number">{String(index + 1).padStart(2, "0")}</span>
              <span>{photo.caption}</span>
            </figcaption>
          </Reveal>
        );
      })}
    </div>
    <dialog ref={dialog} className="photo-dialog" aria-labelledby="photo-dialog-title" onClose={() => setActive(null)} onKeyDown={(event) => { if (event.key === "ArrowRight") { event.preventDefault(); step(1); } if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); } }}>
      {photo && <div className="photo-dialog-layout">
        <header className="photo-dialog-header"><span className="micro-label">KMD Interior / Selected spaces</span><button type="button" className="circle-control" aria-label="Close photo viewer" onClick={() => dialog.current?.close()}><X size={22} /></button></header>
        <div className="photo-dialog-image" key={photo.id}><Image src={photo.src} alt={photo.alt} fill sizes="95vw" quality={90} className="object-contain" loading="eager" /></div>
        <div className="photo-dialog-footer">
          <div aria-live="polite" aria-atomic="true"><span className="micro-label">{String((active ?? 0) + 1).padStart(2, "0")} / {GALLERY.length}</span><h2 id="photo-dialog-title">{photo.caption}</h2></div>
          <div className="photo-dialog-controls"><button type="button" className="circle-control" aria-label="Previous photograph" onClick={() => step(-1)}><ArrowLeft size={20} /></button><button type="button" className="circle-control" aria-label="Next photograph" onClick={() => step(1)}><ArrowRight size={20} /></button></div>
        </div>
      </div>}
    </dialog>
    </>
  );
}
