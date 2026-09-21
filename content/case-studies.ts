export type GalleryBlock =
  | { type: "full"; id: string; photoLabel: string; caption?: string }
  | {
      type: "pair";
      id: string;
      photoLabelA: string;
      photoLabelB: string;
      captionA?: string;
      captionB?: string;
    }
  | { type: "detail"; id: string; photoLabel: string; caption?: string }
  | {
      type: "before-after";
      id: string;
      beforeLabel: string;
      afterLabel: string;
      caption?: string;
    };

export type CaseStudy = {
  slug: string;
  name: string;
  location: string;
  projectType: string;
  area: string;
  scopeOfWork: string[];
  completionYear: string;
  heroPhotoLabel: string;
  overview: string;
  designApproach: string;
  execution: string;
  gallery: GalleryBlock[];
};

/**
 * Empty until real project details exist.
 *
 * This previously held one "content model example" entry whose every
 * field was a `[CONFIRM: ...]` placeholder. Because /projects/[slug]
 * prerenders whatever is in this array, that entry published a live page
 * at /projects/content-model-example reading "[CONFIRM: project name]",
 * "[CONFIRM: location]" and so on — a placeholder page on a production
 * site. With the array empty, every slug under /projects/ now 404s, which
 * is the correct behaviour while no case study exists.
 *
 * The type above and `CaseStudyTemplate` are intentionally kept: the
 * content model is sound, it just has nothing to describe yet. KMD's live
 * site publishes no project name, client, location, size, scope or year
 * for any completed project — see the note at the top of
 * content/projects.ts.
 *
 * To publish the first real case study: add an entry here, then link to
 * it from the gallery (components/projects/PhotoGallery.tsx).
 */
export const CASE_STUDIES: CaseStudy[] = [];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}
