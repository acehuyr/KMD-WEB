export type SiteContact = {
  phoneDisplay: string;
  phoneTel: string;
  email: string;
  /** Address as separate lines, for display. */
  addressLines: string[];
  /** The same address without the company name, for places that set the name on its own (the map card). */
  officeLines: string[];
  /** Single-line form, for meta tags. */
  addressSingleLine: string;
  /** wa.me expects digits only (no "+"). See the note below. */
  whatsappNumber: string;
};

/**
 * The site's single verified contact record (not a list) — used by the
 * Contact page, Footer, mobile nav and the homepage's final CTA. Edit
 * once here to update it everywhere.
 *
 * Phone, email and address all match the live site's Contact Us page and
 * its header bar. The address was previously only the neighbourhood
 * ("Santacruz West, Mumbai") — it now carries the full office address as
 * published, with capitalisation and spacing tidied.
 *
 * whatsappNumber is still an assumption: it reuses the verified phone
 * number because no distinct WhatsApp number is published anywhere on the
 * live site. [CONFIRM: whatsapp number] before launch.
 */
const OFFICE_LINES = ["Office No. 23, I Wing", "Rizvi Park, Khira Nagar", "Santacruz West, Mumbai"];

export const SITE_CONTACT: SiteContact = {
  phoneDisplay: "+91 86209 20489",
  phoneTel: "+918620920489",
  email: "kmdinterior101@gmail.com",
  addressLines: [`KMD Interior, ${OFFICE_LINES[0]}`, ...OFFICE_LINES.slice(1)],
  officeLines: OFFICE_LINES,
  addressSingleLine:
    "KMD Interior, Office No. 23, I Wing, Rizvi Park, Khira Nagar, Santacruz West, Mumbai",
  whatsappNumber: "918620920489",
};

/**
 * Opens Google Maps on the office building itself, not on a search.
 *
 * KMD Interior has no Google Maps business listing, so searching for the
 * address text returned a results list of *other* interior firms across
 * Mumbai. This links the building the office is in — WING-I, Rizvi Park —
 * by its Maps place id (the `1s0x…:0x…` segment), with its exact pin, so it
 * always lands on that one place. If KMD later creates a Google Business
 * Profile, swap this for that listing's link.
 */
/** Pin of the office building (WING-I, Rizvi Park), as Google Maps places it. */
const OFFICE_PIN = "19.089076,72.8374007";

export const SITE_CONTACT_MAPS_HREF =
  "https://www.google.com/maps/place/WING-I,+Rizvi+Park,+Khira+Nagar,+Santacruz+West,+Mumbai,+Maharashtra+400054/@19.089076,72.8374007,18z/data=!3m1!4b1!4m6!3m5!1s0x3be7c9a5af0b19e9:0x25f7f981aeb2e40a!8m2!3d19.089076!4d72.8374007!16s%2Fg%2F11bw4rjrsw";

/**
 * Embedded map for the Contact page. Deliberately a bare coordinate pin:
 * Google's embed ignores any name passed to it and, given the building's
 * place id, labels the card "WING-I". Pinned by coordinates it shows the
 * pin with no card, and the site draws its own "KMD Interior" card on top
 * (components/contact/OfficeMap.tsx).
 */
export const SITE_CONTACT_MAP_EMBED_SRC = `https://maps.google.com/maps?q=${OFFICE_PIN}&z=17&hl=en&output=embed`;

export const SITE_CONTACT_WHATSAPP_HREF = `https://wa.me/${SITE_CONTACT.whatsappNumber}`;
