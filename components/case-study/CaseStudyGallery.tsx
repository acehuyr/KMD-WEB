import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import type { GalleryBlock } from "@/content/case-studies";

/**
 * Renders each gallery block per its type — full-width, two-column
 * pair, detail (narrower, close-up framing), or a before/after slider.
 * Reuses PhotoPlaceholder and BeforeAfterSlider rather than
 * reimplementing image/comparison handling here.
 */
export function CaseStudyGallery({ blocks }: { blocks: GalleryBlock[] }) {
  return (
    <div className="flex flex-col gap-16 lg:gap-24">
      {blocks.map((block) => {
        switch (block.type) {
          case "full":
            return (
              <figure key={block.id} className="flex flex-col gap-3">
                <div className="aspect-[16/9]">
                  <PhotoPlaceholder
                    tone="light"
                    label={block.photoLabel}
                    className="h-full w-full"
                  />
                </div>
                {block.caption && (
                  <figcaption className="text-sm text-charcoal-soft">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "pair":
            return (
              <div key={block.id} className="grid gap-8 sm:grid-cols-2">
                <figure className="flex flex-col gap-3">
                  <div className="aspect-[4/5]">
                    <PhotoPlaceholder
                      tone="light"
                      label={block.photoLabelA}
                      className="h-full w-full"
                    />
                  </div>
                  {block.captionA && (
                    <figcaption className="text-sm text-charcoal-soft">
                      {block.captionA}
                    </figcaption>
                  )}
                </figure>
                <figure className="flex flex-col gap-3">
                  <div className="aspect-[4/5]">
                    <PhotoPlaceholder
                      tone="light"
                      label={block.photoLabelB}
                      className="h-full w-full"
                    />
                  </div>
                  {block.captionB && (
                    <figcaption className="text-sm text-charcoal-soft">
                      {block.captionB}
                    </figcaption>
                  )}
                </figure>
              </div>
            );

          case "detail":
            return (
              <figure
                key={block.id}
                className="mx-auto flex w-full max-w-2xl flex-col gap-3"
              >
                <div className="aspect-[4/5]">
                  <PhotoPlaceholder
                    tone="light"
                    label={block.photoLabel}
                    className="h-full w-full"
                  />
                </div>
                {block.caption && (
                  <figcaption className="text-center text-sm text-charcoal-soft">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "before-after":
            return (
              <div key={block.id} className="mx-auto w-full max-w-3xl">
                <BeforeAfterSlider
                  beforeLabel={block.beforeLabel}
                  afterLabel={block.afterLabel}
                  caption={block.caption}
                />
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
