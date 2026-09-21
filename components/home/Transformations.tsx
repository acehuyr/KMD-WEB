import { SectionHeading } from "@/components/ui/SectionHeading";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";

type TransformationPair = {
  beforeLabel: string;
  afterLabel: string;
  caption?: string;
};

/**
 * No verified before/after project photography exists — the live site
 * publishes none. Leave this empty rather than inventing pairs.
 *
 * While it is empty the component renders nothing and is not mounted on
 * the homepage at all (see app/page.tsx). Add real pairs here and re-add
 * `<Transformations />` to the homepage to bring the slider back.
 */
const TRANSFORMATIONS: TransformationPair[] = [];

export function Transformations() {
  if (TRANSFORMATIONS.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="transformations-heading"
      className="bg-ivory py-section-md lg:py-section-lg"
    >
      <div className="wrapper flex flex-col gap-16">
        <SectionHeading
          id="transformations-heading"
          eyebrow="Transformations"
          lines={["See what thoughtful design can change."]}
        />

        <div className="grid gap-16 lg:grid-cols-2">
          {TRANSFORMATIONS.map((pair, index) => (
            <BeforeAfterSlider
              key={index}
              beforeLabel={pair.beforeLabel}
              afterLabel={pair.afterLabel}
              caption={pair.caption}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
