import type { Metadata } from "next";
import { FinalCta } from "@/components/home/FinalCta";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { Photo } from "@/components/ui/Photo";
import { Statistics } from "@/components/home/Statistics";
import { COMPANY_STATEMENT, COMPANY_STORY } from "@/content/company";
import { getPhoto } from "@/content/projects";
import { TEAM } from "@/content/team";

const DESCRIPTION =
  "KMD Interior is a Mumbai-based design and artistry contracting firm with over 11 years of experience, specialising in interior craftsmanship for turnkey projects.";

export const metadata: Metadata = {
  title: "About",
  description: DESCRIPTION,
  openGraph: {
    title: "About | KMD Interior",
    description: DESCRIPTION,
    images: [
      {
        url: "/projects/residence-passages.webp",
        width: 1072,
        height: 566,
        alt: "Residence entrance passages finished in fluted timber, backlit onyx and etched glass",
      },
    ],
  },
};

const STORY_PHOTO = getPhoto("residence-passages");

export default function AboutPage() {
  return (
    <>
      <section
        aria-labelledby="about-heading"
        className="bg-ivory pb-16 pt-32 md:pt-40 lg:pb-24"
      >
        <div className="wrapper flex flex-col gap-8">
          <span className="eyebrow">The studio / Design & craft</span>
          <RevealText
            id="about-heading"
            as="h1"
            trigger="mount"
            lines={["Eleven years of craft.", "One team that sees it through."]}
            className="max-w-4xl font-serif text-hero leading-[0.95] text-charcoal"
          />
          <p className="text-measure text-lg text-charcoal-soft">
            {COMPANY_STATEMENT}
          </p>
        </div>
      </section>

      <section className="bg-ivory pb-section-md lg:pb-section-lg">
        <div className="wrapper flex flex-col gap-12">
          <Reveal variant="image"><Photo
            photo={STORY_PHOTO}
            sizes="(min-width: 1280px) 1200px, 100vw"
            natural
            className="w-full"
          /></Reveal>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <span className="eyebrow lg:pt-2">Who We Are</span>
            <div className="flex flex-col gap-5 text-measure text-lg text-charcoal-soft">
              {COMPANY_STORY.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="team-heading"
        className="bg-offwhite py-section-md lg:py-section-lg"
      >
        <div className="wrapper flex flex-col gap-16">
          <div className="flex flex-col gap-5">
            <span className="eyebrow">Our Team</span>
            <h2
              id="team-heading"
              className="max-w-3xl font-serif text-display leading-[1.05] text-charcoal"
            >
              The people behind the work.
            </h2>
          </div>

          <div className="flex flex-col border-t border-beige">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="flex flex-col gap-2 border-b border-beige py-8 sm:flex-row sm:items-baseline sm:gap-10 lg:py-10"
              >
                <span className="eyebrow sm:w-64 sm:shrink-0">
                  {member.role}
                </span>
                <h3 className="font-serif text-2xl text-charcoal lg:text-3xl">
                  {member.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Statistics />

      <FinalCta />
    </>
  );
}
