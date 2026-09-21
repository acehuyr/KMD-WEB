/**
 * Core company facts, all sourced from the live site at kmdinterior.com
 * (Home / About Us / Services / Our Expertise pages, audited Sept 2026).
 *
 * Wording has been tightened for readability — the original copy is
 * grammatically rough — but no factual claim here goes beyond what the
 * live site states. Nothing in this file is inferred or invented.
 */

/** Strapline from the KMD Interior logo mark. */
export const COMPANY_TAGLINE = "The Interior Decorators Choice";

/** Homepage hero line on the live site. */
export const COMPANY_PROMISE =
  "We turn the best interior decoration ideas into reality";

/** About Us hero line on the live site. */
export const COMPANY_STATEMENT =
  "We don’t just design spaces — we craft experiences that reflect your dreams and lifestyle.";

/**
 * Pull-quote used on the live homepage, above the project section.
 * Kept verbatim apart from punctuation.
 */
export const COMPANY_QUOTE =
  "We are interior designers from the soul. It’s not about just putting things in a room. It’s much deeper and broader. It’s about self-discovery.";

/** Footer positioning line from the live site. */
export const COMPANY_FOOTER_NOTE =
  "We believe your space should tell your story. With a keen eye for detail and a passion for beautiful, livable interiors, we bring your vision to life.";

/**
 * The About narrative — a faithful rewrite of the live site's "About KMD
 * Interior" paragraph, split into readable paragraphs. Every claim
 * (11 years, full-service contracting firm, turnkey specialisation,
 * carpentry heritage, the mission wording) appears on the live site.
 */
export const COMPANY_STORY: string[] = [
  "KMD Interior is a full-service design and artistry contracting firm with over 11 years of experience, specialising in interior craftsmanship for turnkey projects.",
  "We have built a credible reputation as one of the most reliable service providers in the field — translating ideas and dreams into the language of interior architecture, and finding elegant solutions to complicated problems.",
  "Our mission is to deliver work that goes beyond standard practice, and to keep excelling as a company defined by dedication, transparency, quality and service.",
  "Our strength lies in a genuine passion for making things, bringing distinctive detail to both modern and traditional interiors. Carpentry is where the firm began, and it remains the craft at the centre of everything we build.",
];

/** Short version of the above, for the homepage About section. */
export const COMPANY_STORY_SHORT: string[] = [
  "For over 11 years, KMD Interior has worked as a full-service design and artistry contracting firm, specialising in interior craftsmanship for turnkey projects.",
  "Carpentry is where the firm began, and it remains the craft at the centre of everything we build — from a single fitted wardrobe to a complete interior delivered end to end.",
];

export type CompanyStat = {
  value: number;
  suffix: string;
  label: string;
};

/**
 * Counter figures published on the live site's Home and About pages.
 *
 * The live site also runs an "86+ Awards Win" counter. It is deliberately
 * NOT included here: no award is named anywhere on the site, and the
 * surrounding page is full of unmodified WordPress-theme demo content, so
 * the figure cannot be treated as verified. Add it back only once the
 * awards themselves can be named. See MIGRATION-NOTES.md.
 */
export const COMPANY_STATS: CompanyStat[] = [
  { value: 11, suffix: "+", label: "Years of Experience" },
  { value: 200, suffix: "+", label: "Successful Projects" },
  { value: 80, suffix: "+", label: "Satisfied Clients" },
  { value: 60, suffix: "+", label: "Team Members" },
];
