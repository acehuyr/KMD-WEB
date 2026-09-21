import Image from "next/image";
import { cx } from "@/lib/cx";
import type { GalleryPhoto } from "@/content/projects";

/**
 * Real KMD project photography, framed to fill its container.
 *
 * Pairs with `PhotoPlaceholder`, which stays in use for the few places
 * where no authentic photograph exists yet — the two are deliberately
 * not merged, so an unfilled slot still reads as unfilled.
 *
 * `eager` marks an above-the-fold photograph. Note what it does *not*
 * use: `priority` is deprecated as of Next.js 16, and `preload` on its
 * own only adds a `<link rel="preload">` — it leaves `loading="lazy"` in
 * place, so the browser still discovers the LCP image late and Next logs
 * an LCP warning. The documented fix is `loading="eager"` (plus
 * `fetchPriority="high"` to move it up the queue); `preload` is ignored
 * once `loading` is set, so it is deliberately not passed alongside.
 * See node_modules/next/dist/docs/.../components/image.md §loading.
 *
 * `quality={90}` is deliberate, and needs the matching `images.qualities`
 * entry in next.config.ts to be accepted. Next 16 optimizes to quality 75
 * by default; these source photographs are only ~1080–1280px wide, so the
 * detail that survives is worth the extra few KB.
 */
export function Photo({
  photo,
  sizes = "100vw",
  className,
  eager = false,
  natural = false,
}: {
  photo: GalleryPhoto;
  sizes?: string;
  className?: string;
  /** Above the fold — load immediately instead of lazily. */
  eager?: boolean;
  /** Preserve the complete composition using the source photograph's ratio. */
  natural?: boolean;
}) {
  return (
    <div
      className={cx("photo-frame relative overflow-hidden bg-offwhite", className)}
      style={natural ? { aspectRatio: `${photo.width} / ${photo.height}` } : undefined}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        quality={90}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        className="object-cover"
      />
    </div>
  );
}
