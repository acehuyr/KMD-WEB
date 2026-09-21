export type ClientLogo = {
  name: string;
  /** Logo asset, once available. Falls back to rendering `name` as text. */
  logoSrc?: string;
};

/**
 * Still empty after the content migration from kmdinterior.com — and this
 * is a finding, not an oversight.
 *
 * The live site does have an "Our Clients" logo strip, but every logo in
 * it is an unmodified WordPress theme demo asset served from
 * shtheme.com/demosd/interiorarcwp (client-1.png … client-5.png). They
 * are placeholder graphics from the purchased theme, carry no company
 * name, and evidence no real client relationship — so migrating them
 * would mean publishing fake clients.
 *
 * No verified client is named anywhere else on the live site either.
 *
 * Add real entries here once confirmed — the Clients section switches
 * from its empty state to real logos automatically once this is
 * non-empty (same pattern as careers.ts/OPENINGS).
 */
export const CLIENTS: ClientLogo[] = [];
