import type { Metadata } from "next";
import { RevealText } from "@/components/ui/RevealText";
import { Photo } from "@/components/ui/Photo";
import { OpenPositions } from "@/components/careers/OpenPositions";
import { ApplicationForm } from "@/components/careers/ApplicationForm";
import { getPhoto } from "@/content/projects";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join KMD Interior — designers, project professionals and craftsmen delivering interior design, turnkey contracting and carpentry in Mumbai.",
};

// A finished KMD interior rather than a "team at work" placeholder: no
// authentic photograph of the team or the workshop exists. (The live
// site's careers-adjacent imagery is a generic stock photo of two men in
// hi-vis on a building site, which is neither KMD nor this trade.)
const CAREERS_PHOTO = getPhoto("living-room-teak-floor");

export default function CareersPage() {
  return (
    <>
      <section aria-labelledby="careers-heading" className="bg-ivory pb-16 pt-32 md:pt-40 lg:pb-24">
        <div className="wrapper flex flex-col gap-10">
          <RevealText
            id="careers-heading"
            as="h1"
            trigger="mount"
            lines={["Build spaces.", "Build your career."]}
            className="max-w-3xl font-serif text-hero leading-[0.95] text-charcoal"
          />
          <p className="text-measure text-lg text-charcoal-soft">
            Join a team of designers, project professionals and craftsmen
            working together to create exceptional spaces.
          </p>
        </div>
      </section>

      <div className="wrapper pb-16 lg:pb-20">
        <Photo
          photo={CAREERS_PHOTO}
          sizes="(min-width: 1280px) 1200px, 100vw"
          natural
          className="w-full"
        />
      </div>

      <section aria-labelledby="open-positions-heading" className="bg-ivory pb-section-md lg:pb-section-lg">
        <div className="wrapper">
          <h2 id="open-positions-heading" className="sr-only">
            Open Positions
          </h2>
          <OpenPositions />
        </div>
      </section>

      <section aria-labelledby="apply-heading" className="bg-offwhite py-section-md lg:py-section-lg">
        <div className="wrapper flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <span className="eyebrow">Apply</span>
            <h2 id="apply-heading" className="font-serif text-display leading-[1.05] text-charcoal">
              Send us your CV.
            </h2>
          </div>
          <div className="max-w-3xl">
            <ApplicationForm />
          </div>
        </div>
      </section>
    </>
  );
}
