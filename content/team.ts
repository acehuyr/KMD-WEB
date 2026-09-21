export type TeamMember = {
  name: string;
  role: string;
};

/**
 * The team as published on the live site's About Us page. Names and roles
 * are reproduced exactly as given there — the live site lists no surnames
 * for the founders and no bios or photographs for anyone, so none are
 * added here.
 */
export const TEAM: TeamMember[] = [
  { name: "Manish and Kishan", role: "Founders" },
  { name: "Narshi Suthar", role: "Projects & Contractor" },
  { name: "Subhash Lawachh", role: "Project Head" },
];
