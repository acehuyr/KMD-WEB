import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoGallery } from "@/components/projects/PhotoGallery";

const DESCRIPTION =
  "Completed interiors by KMD Interior — living spaces, bedrooms, bathrooms and entrance passages, photographed on site in Mumbai.";

export const metadata: Metadata = {
  title: "Projects",
  description: DESCRIPTION,
  openGraph: {
    title: "Projects | KMD Interior",
    description: DESCRIPTION,
    images: [
      {
        url: "/projects/entrance-brass-screen.webp",
        width: 2048,
        height: 1536,
        alt: "Entrance threshold framed by sliding brass screens etched with a gold floral motif, set into book-matched white marble",
      },
    ],
  },
};

export default function ProjectsPage() {
  return (
    <>
      <section
        aria-labelledby="projects-heading"
        className="bg-ivory pb-16 pt-32 md:pt-40 lg:pb-20"
      >
        <div className="wrapper flex flex-col gap-8">
          <SectionHeading
            as="h1"
            id="projects-heading"
            eyebrow="Projects"
            lines={["Considered spaces.", "Beautifully brought to life."]}
          />
          <p className="text-measure text-lg text-charcoal-soft">
            A selection of completed interiors — carpentry, joinery, false
            ceilings, stonework and finishing carried out by our own team.
          </p>
        </div>
      </section>

      <section className="bg-ivory pb-section-md lg:pb-section-lg">
        <div className="wrapper">
          <PhotoGallery />
        </div>
      </section>

      <section className="bg-offwhite py-section-sm lg:py-section-md">
        <div className="wrapper flex flex-col items-center gap-6 text-center">
          <p className="text-measure text-charcoal-soft">
            Planning something similar? We can walk you through how a project
            like this comes together.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 border border-bronze px-6 py-3.5 text-sm tracking-wide text-charcoal transition-colors duration-300 hover:bg-bronze hover:text-ivory"
          >
            Start a Project
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
