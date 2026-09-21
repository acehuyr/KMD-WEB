export type SiteContact = {
  phoneDisplay: string;
  phoneTel: string;
  email: string;
  /** Address as separate lines, for display. */
  addressLines: string[];
  /** Single-line form, for meta tags and the maps query. */
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
export const SITE_CONTACT: SiteContact = {
  phoneDisplay: "+91 86209 20489",
  phoneTel: "+918620920489",
  email: "kmdinterior101@gmail.com",
  addressLines: [
    "KMD Interior, Office No. 23, I Wing",
    "Rizvi Park, Khira Nagar",
    "Santacruz West, Mumbai",
  ],
  addressSingleLine:
    "KMD Interior, Office No. 23, I Wing, Rizvi Park, Khira Nagar, Santacruz West, Mumbai",
  whatsappNumber: "918620920489",
};

export const SITE_CONTACT_MAPS_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  SITE_CONTACT.addressSingleLine
)}`;

export const SITE_CONTACT_WHATSAPP_HREF = `https://wa.me/${SITE_CONTACT.whatsappNumber}`;
