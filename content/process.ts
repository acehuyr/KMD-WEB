export type ProcessStage = {
  index: string;
  title: string;
  description: string;
};

/**
 * The four-stage "Work Process" published on the live site's Home and
 * About pages. Descriptions follow the live copy closely, edited only for
 * grammar and length.
 *
 * This replaces an earlier five-stage sequence (Discover / Design / Plan /
 * Execute / Deliver) that was written for the redesign before the real
 * process was available — KMD describes four stages, not five.
 */
export const PROCESS: ProcessStage[] = [
  {
    index: "01",
    title: "Meet",
    description:
      "We start by understanding your vision, needs and expectations. Talking directly gives us the insight to lay the foundation for a personal design journey.",
  },
  {
    index: "02",
    title: "Discuss",
    description:
      "We work closely with you to refine ideas, suggest solutions and align on the goals of the project — keeping communication clear so every detail matches both the vision and how the space needs to work.",
  },
  {
    index: "03",
    title: "Design",
    description:
      "We translate the ideas into detailed drawings and 3D visualisations, balancing creativity with practicality so the result is as workable as it is beautiful.",
  },
  {
    index: "04",
    title: "Implement",
    description:
      "We execute the project on site — from carpentry through to the finishing touches — with close attention to craftsmanship and delivery.",
  },
];
