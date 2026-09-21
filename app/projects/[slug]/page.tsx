import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyTemplate } from "@/components/case-study/CaseStudyTemplate";
import { CASE_STUDIES, getCaseStudy } from "@/content/case-studies";

// CASE_STUDIES is currently empty (see content/case-studies.ts), so
// nothing is prerendered and every slug falls through to notFound()
// below. That is intentional: no real case study exists to publish yet.
// The route stays wired up so adding the first entry is all it takes.
export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const study = getCaseStudy(slug);

  if (!study) {
    return {};
  }

  const title = `${study.name} | KMD Interior`;

  return {
    title,
    description: study.overview,
    openGraph: {
      title,
      description: study.overview,
    },
  };
}

export default async function CaseStudyPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  return <CaseStudyTemplate study={study} />;
}
