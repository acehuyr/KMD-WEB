# Content layer

Every piece of editable content on the site — company copy, projects,
photography, services, expertise, process, team, testimonials, client
logos, careers, contact details — lives here as typed data, not hardcoded
inside page/component files. Components import from `@/content/*` and
render whatever's there.

No CMS is set up yet. This is a plain TypeScript data layer chosen
deliberately over adding a CMS dependency this early — see "Swapping in a
CMS later" below for why that's a safe choice.

Most of this was migrated from the live site at kmdinterior.com. What was
taken, what was deliberately left behind and why, and what still needs a
human decision are all in [`../MIGRATION-NOTES.md`](../MIGRATION-NOTES.md).

## Files

| File | Exports | Status |
|---|---|---|
| `company.ts` | `COMPANY_STORY`, `COMPANY_STORY_SHORT`, `COMPANY_STATS`, `COMPANY_QUOTE`, `COMPANY_TAGLINE`, `COMPANY_STATEMENT`, `COMPANY_PROMISE`, `COMPANY_FOOTER_NOTE` | Real — migrated from the live About/Home pages |
| `projects.ts` | `GALLERY`, `FEATURED_GALLERY` | 9 real photographs. A gallery, not named projects — see below |
| `case-studies.ts` | `CASE_STUDIES`, `getCaseStudy()` | Empty — no real project details exist to publish |
| `services.ts` | `SERVICES` | Real — KMD's actual three services |
| `expertise.ts` | `CAPABILITIES`, `SECTORS` | Real — all 11 capabilities, 4 sectors |
| `process.ts` | `PROCESS` | Real — KMD's actual four stages |
| `team.ts` | `TEAM` | Real — 3 entries, names and roles as published |
| `testimonials.ts` | `TESTIMONIALS` | Real — 4 published quotes |
| `clients.ts` | `CLIENTS` | Empty on purpose — the live site's logos are theme demo assets |
| `careers.ts` | `OPENINGS` | Empty — no confirmed openings |
| `contact.ts` | `SITE_CONTACT`, `SITE_CONTACT_MAPS_HREF`, `SITE_CONTACT_WHATSAPP_HREF` | Phone/email/address verified; WhatsApp number is an assumption (see file) |

Each file's own comments are the source of truth for *what* needs
confirmation — this table is a map, not a duplicate.

## How a content editor updates the site today

No code changes beyond editing the arrays below — nothing in `app/` or
`components/` needs to change when content changes, as long as the shape
matches the exported type.

- **Add a photograph to the gallery** — drop the file in
  `public/projects/` and add an entry to `GALLERY` in `projects.ts`
  (`id`, `src`, `alt`, `caption`, `width`, `height`). To control how big
  it runs on the projects page, add a matching `id` to the `LAYOUT` map in
  `components/projects/PhotoGallery.tsx`; without one it falls back to a
  half-width frame.
- **Change which photos lead the homepage** — edit `FEATURED_GALLERY`.
- **Update the company story or the stats** — edit `company.ts`. The
  story feeds the About page and homepage; the stats feed both.
- **Update a service, capability, sector or process stage** — edit
  `services.ts`, `expertise.ts` or `process.ts`.
- **Add/edit a testimonial** — edit `TESTIMONIALS` (`testimonials.ts`).
  `detail` is optional; leave it off unless the quote itself names the
  space.
- **Add a client logo** — add an entry to `CLIENTS` in `clients.ts`
  (`{ name, logoSrc? }`). The homepage Clients section is hidden entirely
  while this is empty and reappears automatically once it isn't.
- **Add a job opening** — add an entry to `OPENINGS` in `careers.ts`. The
  Careers page switches from the "we're always interested…" empty state to
  a real listing once `OPENINGS.length > 0`.
- **Update phone/email/address** — edit the single `SITE_CONTACT` record
  in `contact.ts`. It's read by the Contact page, Footer and mobile nav —
  one edit updates all of them.

## Projects: a gallery, not a project list

`projects.ts` deliberately models photographs rather than named projects,
because KMD publishes no name, client, location, size or year for any
completed work. Inventing those to fill a card grid would be fabrication,
so the gallery shows the real photography and says only what each frame
shows.

The case-study architecture is still in place and unused:
`case-studies.ts` holds the type, `CaseStudyTemplate` renders it, and
`/projects/[slug]` is wired up — it just 404s for every slug while
`CASE_STUDIES` is empty.

**To publish the first real project**, once details are confirmed: add a
`CASE_STUDIES` entry, then link to it from `PhotoGallery.tsx`. Adding
`name`/`location`/`year` fields to `GalleryPhoto` and rendering them in
the gallery captions is the natural next step after that.

## Images

Real photography lives in `public/projects/` as WebP and is rendered
through `components/ui/Photo.tsx` (a `next/image` wrapper — note it uses
`preload`, not the deprecated `priority`). `alt` describes the space; it
is not a filename.

`components/ui/PhotoPlaceholder.tsx` still exists for slots where no
authentic photograph exists. Nothing on the site currently uses it, and
that is the point: a visible "Photography needed" panel is the correct
thing to render rather than substituting stock imagery. Reach for it
rather than filling a gap with a stock photo.

## Swapping in a CMS later

Nothing here assumes a CMS won't exist eventually — it's structured so
adding one is additive, not a rewrite:

1. Every content file exports the same typed consts a CMS-backed version
   would need to produce (`SERVICES: Service[]`, `GALLERY: GalleryPhoto[]`,
   etc.). A CMS integration replaces *how* that value is produced (a fetch
   at build/request time instead of a literal array) without changing its
   shape — so components never need to change.
2. Swap one file at a time — e.g. `testimonials.ts` becomes `export const
   TESTIMONIALS = await getTestimonials()` backed by whatever CMS is
   chosen, while `services.ts` stays a plain array. No all-or-nothing
   migration.

No specific CMS has been chosen — that's a real decision for the team
(headless CMS like Sanity/Contentful, or a simpler Markdown/MDX-based
approach, are all reasonable fits for a site this size). Introducing one
now, before an editor workflow exists to justify it, would be premature —
a typed local data layer is the appropriate size of solution today, and
this structure is what makes swapping it out later a contained change
instead of a rewrite.
