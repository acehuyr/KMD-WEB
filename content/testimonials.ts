export type Testimonial = {
  quote: string;
  name: string;
  /**
   * Optional short descriptor. Only filled in where the quote itself
   * names the space — the live site publishes no project, location or
   * company against any of these names, so nothing is added beyond that.
   */
  detail?: string;
};

/**
 * The four client quotes published in the "Client's Feedback" section of
 * the live site's Home and About pages, reproduced as written (apart from
 * punctuation) with the names as given.
 *
 * Note: the avatar images shown beside these quotes on the live site are
 * WordPress theme demo assets served from shtheme.com, not photographs of
 * these clients — so no portraits are carried over. See MIGRATION-NOTES.md.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Absolutely loved working with KMD Interiors! They took my vague ideas and turned them into a beautiful, functional space. Every corner feels thoughtful and perfectly balanced.",
    name: "Rahul Kumar",
  },
  {
    quote:
      "Professional, punctual, and full of fresh ideas. Our office space now feels open, creative, and exactly aligned with our brand thanks to their design.",
    name: "Karan Tandon",
    detail: "Office interior",
  },
  {
    quote:
      "Their design turned our ordinary 2BHK into a stunning space that feels luxurious and cozy at the same time. Totally worth it.",
    name: "Aisha Q.",
    detail: "Apartment interior",
  },
  {
    quote:
      "They have a unique eye for design and a calming presence that makes the renovation process stress-free. I get compliments on my living room all the time.",
    name: "Nisha Yadav",
    detail: "Residential renovation",
  },
];
