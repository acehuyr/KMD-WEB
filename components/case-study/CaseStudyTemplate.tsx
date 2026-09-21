import Link from "next/link";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { CaseStudyMeta } from "./CaseStudyMeta";
import { CaseStudyGallery } from "./CaseStudyGallery";
import type { CaseStudy } from "@/content/case-studies";

/** Reusable premium editorial case-study page — data-driven, no per-project markup. */
export function CaseStudyTemplate({ study }: { study: CaseStudy }) {
  const metaItems = [
    { label: "Location", value: study.location },
    { label: "Project Type", value: study.projectType },
    { label: "Area", value: study.area },
    { label: "Scope of Work", value: study.scopeOfWork.join(" · ") },
    { label: "Completion Year", value: study.completionYear },
  ];

  return (
    <article>
      <header className="bg-ivory pb-16 pt-32 md:pt-40 lg:pb-20">
        <div className="wrapper flex flex-col gap-10">
          <Link
            href="/projects"
            className="group inline-flex w-fit items-center gap-2 text-sm tracking-wide text-charcoal-soft transition-colors duration-300 hover:text-bronze"
          >
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-x-1"
            >
              ←
            </span>
            All Projects
          </Link>

          <h1 className="max-w-4xl font-serif text-hero leading-[0.95] text-charcoal">
            {study.name}
          </h1>

          <CaseStudyMeta items={metaItems} />
        </div>
      </header>

      <div className="wrapper pb-16 lg:pb-20">
        <div className="aspect-[16/9] lg:aspect-[21/9]">
          <PhotoPlaceholder
            tone="dark"
            label={study.heroPhotoLabel}
            className="h-full w-full"
          />
        </div>
      </div>

      <div className="wrapper flex flex-col gap-14 pb-section-md lg:gap-20 lg:pb-section-lg">
        <NarrativeSection index="01" label="Project Overview" text={study.overview} />
        <NarrativeSection index="02" label="Design Approach" text={study.designApproach} />
        <NarrativeSection index="03" label="Execution" text={study.execution} />
      </div>

      <div className="wrapper pb-section-md lg:pb-section-lg">
        <CaseStudyGallery blocks={study.gallery} />
      </div>

      <section
        aria-labelledby="case-study-cta-heading"
        className="section-dark py-section-md lg:py-section-lg"
      >
        <div className="wrapper flex flex-col items-center gap-8 text-center">
          <h2
            id="case-study-cta-heading"
            className="max-w-2xl font-serif text-display leading-[1.05] text-ivory"
          >
            Have a project in mind?
          </h2>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 border border-bronze px-6 py-3.5 text-sm tracking-wide text-ivory transition-colors duration-300 hover:bg-bronze"
          >
            Let&rsquo;s Create Something Together
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </section>
    </article>
  );
}

function NarrativeSection({
  index,
  label,
  text,
}: {
  index: string;
  label: string;
  text: string;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-[10rem_1fr] lg:gap-16">
      <div className="flex items-baseline gap-3 lg:flex-col lg:items-start lg:gap-2">
        <span className="font-serif text-sm text-bronze">{index}</span>
        <h2 className="eyebrow">{label}</h2>
      </div>
      <p className="text-measure text-lg text-charcoal-soft">{text}</p>
    </div>
  );
}
