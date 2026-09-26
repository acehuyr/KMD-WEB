import type { Metadata } from "next";
import { FinalCta } from "@/components/home/FinalCta";
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
            eyebrow="Our work / Selected interiors"
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

      <FinalCta />
    </>
  );
}
