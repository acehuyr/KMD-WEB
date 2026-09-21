/**
 * The eleven capabilities listed on the live site's "Our Expertise" page,
 * in the same order. Titles are lightly normalised for casing only.
 */
export const CAPABILITIES: string[] = [
  "Design",
  "Carpentry Work",
  "Civil Work",
  "POP & Painting Works",
  "All Types of False Ceiling",
  "Metal Fabrication Works",
  "Modular Kitchen",
  "Loose Furniture",
  "Customized Furniture",
  "Storage & Cabinets",
  "Carpets",
];

export type Sector = {
  index: string;
  title: string;
  description: string;
};

/**
 * Sectors KMD works in. These are the four categories the live site uses
 * to file its own projects (Apartment / Hospital / Office / Restaurant) —
 * the site's own taxonomy, not an assumption about scope.
 *
 * Descriptions are written for this site; they characterise the sector
 * rather than claiming any specific project, since the live site names
 * none. No project counts or client names are implied.
 */
export const SECTORS: Sector[] = [
  {
    index: "01",
    title: "Apartments",
    description:
      "Homes fitted out end to end — living spaces, bedrooms, kitchens and the joinery that ties them together.",
  },
  {
    index: "02",
    title: "Offices",
    description:
      "Workplaces built for daily use, where finish quality has to survive years of it.",
  },
  {
    index: "03",
    title: "Hospitals",
    description:
      "Healthcare interiors, where durable materials and precise, clean detailing matter more than ornament.",
  },
  {
    index: "04",
    title: "Restaurants",
    description:
      "Hospitality spaces where bespoke carpentry and considered lighting set the atmosphere.",
  },
];
