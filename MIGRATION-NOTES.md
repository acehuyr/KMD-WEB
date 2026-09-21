# Content migration from kmdinterior.com

Audit and migration of the live KMD Interior site into this redesign.
Source: <https://kmdinterior.com> — Home, About Us, Gallery, Our Expertise,
Services, Contact Us, and the three "Recent Project" posts.

The design, layout, component architecture and animation work in this repo
were left as they were. Only content, assets, metadata and broken links
changed.

## The most important finding

**The live site is a partly-configured WordPress theme, and a lot of what
looks like KMD content is unmodified demo content from the purchased
theme** (`shtheme.com/demosd/interiorarcwp`). Anything traced back to that
domain was *not* migrated, because it is not KMD's:

| On the live site | What it actually is |
|---|---|
| "Our Clients" logo strip (5 logos) | Theme demo placeholders `client-1.png`…`client-5.png` from shtheme.com. No company names, no real relationships. |
| Testimonial portrait photos | Theme demo avatars `1-big.jpg`, `2-big.jpg`, `3-big.jpg` from shtheme.com. |
| Homepage hero image | Theme demo image `1-1.jpg` from shtheme.com. |
| The 3 "Recent Project" entries | WordPress demo blog posts with Lorem ipsum Latin titles ("Vis evertitur referrentur ad, laoreet consetetur") and the default "A WordPress Commenter on Hello world!" comment. |
| Several page images | Stock photography (`office_design_trends.webp`, `6309.jpg`, `2149185414.jpg`, `globiana-medical-center-10.webp`, and a hi-vis construction stock photo). |

The testimonial *text* is genuine (it names KMD and reads as written for
them) — only the portraits are demo assets, so the quotes were migrated
without portraits.

## Migrated

**Company** (`content/company.ts`) — the About narrative, tagline
("The Interior Decorators Choice"), the "We are interior designers from the
soul" pull-quote, the footer positioning line, and the counter stats.
Wording was tightened for grammar and readability; no claim was extended.

**Services** (`content/services.ts`) — replaced the redesign's four
invented services with KMD's actual three: Artistry in Carpentry, Turnkey
Contracting, Interior Design.

**Expertise** (`content/expertise.ts`) — all eleven capabilities from the
Our Expertise page. Four were missing from the redesign entirely (POP &
Painting Works, Metal Fabrication Works, Loose Furniture, Carpets). Also
the four sectors KMD files its own work under: Apartment, Hospital,
Office, Restaurant.

**Process** (`content/process.ts`) — KMD's real four stages (Meet /
Discuss / Design / Implement), replacing an invented five-stage sequence.

**Team** (`content/team.ts`) — Manish and Kishan (Founders), Narshi Suthar
(Projects & Contractor), Subhash Lawachh (Project Head). Previously absent
from the redesign.

**Testimonials** (`content/testimonials.ts`) — all four real quotes,
replacing three `[CONFIRM: ...]` slots.

**Contact** (`content/contact.ts`) — full office address (was only
"Santacruz West, Mumbai"), phone, email.

**Photography** (`public/projects/`) — nine authentic photographs, the
only real KMD imagery on the live site. Downloaded, deduplicated (the
Gallery uploads and the company-profile PDF exports are the same rooms at
different crops — the wider crop was kept), converted to WebP at quality
92, no crop or upscale.

**Brand** — the real logo lockup (`public/brand/kmd-interior-logo.png`)
and square mark (`public/brand/kmd-interior-mark.png`, 1080×1080). The
mark is now the site icon at `app/icon.png` (512×512, 46 KB), replacing
the default `favicon.ico` that shipped with `create-next-app`.

### Image resolution — what the ceiling actually is

The WordPress media library (`/wp-json/wp/v2/media`, 99 items) was queried
directly to establish the true original dimensions rather than guessing
from what the pages happen to render. Results:

- **Seven of the nine photographs top out at 1073×631.** That is the
  original upload, not a resized variant — there is nothing larger to
  fetch. They ship at native size, uncropped.
- **Two were upgraded to 1280×960** (~1.8× the pixels, and a wider
  framing that shows more of each room). The higher-resolution originals
  were sitting in the media library under WhatsApp export filenames,
  unused by any page: `bathroom-sculpted-white` and
  `bedroom-contemporary-white`.
- **The brand mark went from 300×300 to 1080×1080** — the favicon had
  been built from a resized crop while the full-resolution original
  (`fgsaukbdcas.png`) was also unused.

Two encoding fixes matter as much as the source resolution:

1. **`images.qualities` in `next.config.ts`.** Next.js 16 defaults this to
   `[75]` and rejects any other `quality` value, so every photograph was
   being re-encoded down to quality 75 at request time no matter how the
   source file was prepared. `Photo.tsx` now requests `quality={90}`, and
   90 is on the allowlist. Measured effect on the hero photograph:
   55 KB → 96 KB served, i.e. ~74% more image data actually reaching the
   browser.
2. **Source encode raised from WebP q88 to q92**, since these sources have
   no spare pixels to trade away.

Whole gallery: ~885 KB across nine lazy-loaded photographs.

`bathroom-sculpted-white` now closes the gallery on a 3:2 frame rather
than 21:9, because its upgraded source is 4:3 and the old crop would have
discarded a third of the tallest photograph on the page.

**Not used:** `bedroom-interior-design-decor-services.jpeg` (1280×1024).
It is larger than most of the gallery, but it is a **3D render**, not a
photograph of built work — CGI lighting, a rendered ceiling fan, and a
generic SEO filename. Publishing it as completed work would misrepresent
the portfolio.

**If genuinely higher-resolution photography is wanted, it has to come
from KMD.** The camera originals behind these images (or the source
`KMD INTERIOR PROFILE.pdf` these were screenshotted from) would be a
significant upgrade — most of the gallery is currently a ~1MP screenshot
of a PDF. Nothing here was upscaled, because upscaling invents detail that
was never photographed.

## Deliberately not migrated

- **Client logos.** See the table above — all five are theme demo assets.
  `content/clients.ts` stays empty and the homepage Clients section now
  renders nothing rather than five `[CONFIRM: client name]` boxes.
- **"86+ Awards Win".** The live site runs this counter, but no award is
  named anywhere on the site and the surrounding page is full of demo
  content, so it cannot be treated as verified. The other three counters
  (80+ clients, 60+ team, 200+ projects) and "11 years" were migrated.
  **This one needs a human decision** — see below.
- **Stock and demo imagery**, per the table above.
- **The old site's visual design**, per the brief.

## Structural changes forced by the content

**There are no named projects.** The live site publishes no project name,
client, location, size, scope or year for any completed work — its project
carousel is empty and the entries behind it are demo posts. So:

- `content/projects.ts` is now a **photo gallery** (`GALLERY`), not a list
  of named projects. It replaced eight placeholder entries whose every
  field was `[CONFIRM: ...]`.
- `/projects` renders an editorial gallery
  (`components/projects/PhotoGallery.tsx`) instead of a filtered card
  grid. The old category filter would have offered three empty categories,
  since all authentic photography is residential.
- `components/ui/ProjectCard.tsx` and `components/projects/ProjectsGrid.tsx`
  were deleted — both encoded a name/location/year model that has no data.
- `content/case-studies.ts` is now empty. It previously held one entry
  that **published a live page at `/projects/content-model-example`
  reading "[CONFIRM: project name]"**. Every `/projects/[slug]` now 404s,
  which is correct until a real case study exists. The type and
  `CaseStudyTemplate` were kept — the model is fine, it just has nothing
  to describe.
- The **Transformations** before/after section was removed from the
  homepage — no before/after photography exists, so it could only render a
  "content needed" panel. Component kept for when pairs exist.
- The homepage **Expertise** section is typographic rather than
  photo-led, because only residential photography exists and a
  photo-per-sector layout would have needed three stock images.

## Bugs found and fixed along the way

- **Four main-nav links were 404s.** `/services`, `/expertise`, `/process`
  and `/clients` are not routes. They now point at homepage anchors
  (`/#services`, `/#expertise`, `/#process`); Clients was dropped from the
  nav since that section only renders once a real client list exists.
- **Two footer links were 404s** — `/privacy` and `/terms`, on every page.
  Removed; add the pages before linking them.
- **Three dead `href="#"` social icons** in the footer. The live site
  links to no social profile on any page, so there was nothing to migrate.
  Removed; the icon components are kept in `components/icons/social.tsx`.

## Needs a human decision

1. **The contact and careers forms silently discard every submission.**
   Both validate their fields and then tell the visitor their enquiry or
   application was received, but no email service, CRM or ATS is wired up
   and the form data is dropped. This is the highest-priority item — it is
   lost business, not a cosmetic issue. See `app/contact/actions.ts` and
   `app/careers/actions.ts`.
2. **"86+ Awards Win"** — publish it or drop it. If KMD can name the
   awards, add the stat back in `content/company.ts` and consider an
   awards section. If not, it should stay off the site.
3. **WhatsApp number** — assumed to be the same as the phone line, since
   no separate number is published. Confirm before launch.
4. **Testimonial permissions** — the quotes are published on KMD's current
   site, so they are already public, but confirm the four named clients are
   happy to appear on the new one.
5. **Logo usage** — the real logo is in the repo but the header and footer
   still use the typographic wordmark. The asset is a 197×55 raster built
   around an orange house pictogram with no light-on-dark variant, so it is
   illegible on the charcoal footer and fights the palette. If the mark
   should lead, it needs an SVG with a light variant.
6. **`metadataBase`** in `app/layout.tsx` is set to
   `https://kmdinterior.com`. Change it if the redesign launches elsewhere.
7. **Project details.** The single biggest content gap. Names, locations,
   years, scope and client permissions for even three or four projects
   would turn the gallery into a real portfolio with case-study pages —
   the architecture is already there and waiting.

## Could not verify

- Whether the four counter figures (80 / 60 / 200 and 11 years) are
  current. They are reproduced as the live site states them.
- Which rooms belong to the same project. Several photographs are
  clearly the same residence, but the site does not group them, so the
  gallery does not claim they are.
- Any founding date, registration detail, certification or award — none
  is published anywhere on the live site.
