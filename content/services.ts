export type Service = {
  index: string;
  title: string;
  description: string;
  capabilities: string[];
};

/**
 * The three services KMD Interior actually offers, as published on the
 * live site's Services page. Descriptions are faithful rewrites of that
 * copy — tightened for readability, with no claim added.
 *
 * This replaces an earlier four-service set written for the redesign
 * ("Interior Design / Turnkey Interior Solutions / Custom Carpentry /
 * Project Execution"): close in spirit, but KMD lists three services, and
 * leads with carpentry rather than treating it as a sub-service.
 *
 * Every entry in `capabilities` is drawn from the live site's own "Our
 * Expertise" list (see content/expertise.ts) — all eleven items are
 * covered across the three services, so nothing is dropped and nothing
 * is invented.
 */
export const SERVICES: Service[] = [
  {
    index: "01",
    title: "Artistry in Carpentry",
    description:
      "Carpentry is our inherited art and the craft the firm is built on. Our workforce of trained traditional artisans shapes each piece to the project, backed by the tooling that has come with the trade’s modernisation.",
    capabilities: [
      "Carpentry Work",
      "Customized Furniture",
      "Modular Kitchen",
      "Storage & Cabinets",
      "Loose Furniture",
    ],
  },
  {
    index: "02",
    title: "Turnkey Contracting",
    description:
      "Unlike most contracting firms, we take responsibility for nearly every aspect of a project, from design through to complete execution. Our in-house services cover civil and interior work, so one team is accountable for the finished space.",
    capabilities: [
      "Civil Work",
      "All Types of False Ceiling",
      "POP & Painting Works",
      "Metal Fabrication Works",
      "Carpets",
    ],
  },
  {
    index: "03",
    title: "Interior Design",
    description:
      "We design environments that deliver on every level — aesthetic, practical, commercial and experiential — by developing a personal vision for each project and working side by side with the client.",
    capabilities: [
      "Design",
      "Space planning",
      "Material selection",
      "3D visualisation",
    ],
  },
];
