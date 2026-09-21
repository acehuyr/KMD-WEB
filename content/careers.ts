export type JobOpening = {
  title: string;
  location: string;
  type: string;
};

/**
 * No confirmed openings exist — leave this empty rather than inventing
 * roles. If real openings are supplied, add them here (each marked
 * clearly if still provisional) and the Careers page will render a
 * real listing instead of the empty state automatically.
 */
export const OPENINGS: JobOpening[] = [];
