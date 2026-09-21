export type NavLink = {
  label: string;
  href: string;
};

/**
 * Primary site navigation.
 *
 * Services, Expertise and Process are homepage sections rather than
 * standalone routes, so they link to anchors on `/`. They previously
 * pointed at `/services`, `/expertise`, `/process` and `/clients`, none
 * of which exist — every one of those was a 404 from the main nav.
 *
 * Clients has been dropped from the nav entirely: that section only
 * renders once a verified client list exists (see content/clients.ts),
 * so linking to it now would scroll to nothing.
 */
export const NAV_LINKS: NavLink[] = [
  { label: "The Studio", href: "/about" },
  { label: "Our Work", href: "/projects" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
];

/** Shorter link set for the footer. */
export const FOOTER_LINKS: NavLink[] = [
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/#process" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];
