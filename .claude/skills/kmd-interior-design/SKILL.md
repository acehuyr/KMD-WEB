---
name: kmd-interior-design
description: Design and frontend development standard for the KMD Interior website — a premium interior-design studio site built on Next.js, React, TypeScript, and Tailwind CSS. Consult this skill whenever writing or reviewing ANY component, page, layout, style, or animation for KMD Interior, even for small changes like a button, section, or hover state — the goal is a restrained, editorial, architecture-studio aesthetic, not a generic SaaS/startup look. Trigger on requests to build or edit the homepage, navigation, hero section, project/portfolio grid, individual project case-study pages, about/studio page, contact page, footer, or any scroll/reveal animation, as well as requests to pick colors, fonts, spacing, or imagery treatment for this site. Also trigger when adding real project photography, writing copy that references clients/awards/stats, or touching app/globals.css, layout.tsx, or any file under app/ or components/ in this repo.
---

# KMD Interior — Design & Frontend Standard

KMD Interior's site must read like a premium architecture/interior-design studio's
portfolio — closer to an editorial magazine or gallery than a contractor or SaaS
website. Every design and code decision should be checked against that bar.

This skill governs **how** things are designed and built. It does not authorize
building the full site — only apply it when actually asked to design/implement
something (a page, component, section, animation, etc.).

## 0. Before writing any code in this repo

This repo's `AGENTS.md` (auto-loaded via `CLAUDE.md`) says this is **not the
Next.js you know** — APIs, conventions, and file structure may differ from
training data. Concretely, in this repo right now:

- **Next.js 16**: layouts/pages use typed route props (e.g. `LayoutProps<"/">`
  in `app/layout.tsx`) — don't fall back to older `{ children }: { children:
  React.ReactNode }` patterns without checking current conventions.
- **Tailwind v4, CSS-first config**: there is no `tailwind.config.js`. Theme
  tokens (colors, fonts, spacing) are declared as CSS custom properties inside
  an `@theme` block in `app/globals.css`, and the stylesheet starts with
  `@import "tailwindcss";` — not the old `@tailwind base/components/utilities`
  trio.
- Before adding anything unfamiliar (image handling, fonts, routing, metadata
  APIs), skim the relevant guide in `node_modules/next/dist/docs/` first. Don't
  assume pre-2025 Next.js/Tailwind conventions apply.

## 1. Design philosophy

- **Architecture, not marketing.** Think gallery wall and floor plan, not
  landing-page funnel. Layouts should feel composed and considered — deliberate
  asymmetry, generous margins, a clear grid — rather than symmetric "hero +
  3 feature cards + testimonials" SaaS patterns.
- **Photography is the product.** KMD's real project photography is the
  content. Design frames it (large, uncropped where possible, careful negative
  space) rather than competing with it (no busy overlays, no gradients across
  photos, no decorative shapes near images).
- **Confidence through restraint.** Luxury here means editing things out, not
  adding embellishment. If a section works without an animation, a border, a
  shadow, or an icon, leave it out.
- **Timeless over trendy.** Avoid anything that would date the site to "2020s
  AI-generated startup" — see the anti-pattern list in §7.

## 2. Color palette

The brand palette is ivory / warm off-white / charcoal / beige / muted bronze.
No exact brand hex values have been supplied yet, so treat the tokens below as
a **starting point** — refine them once real photography or brand assets are
available, and flag that refinement as a follow-up rather than silently
picking final values.

Define tokens as CSS custom properties in `app/globals.css` under `@theme`
(Tailwind v4 CSS-first config), not in a `tailwind.config.js`. See
`references/design-tokens.md` for the full draft token set (color, type
scale, spacing) and the exact `@theme` block to start from.

Working defaults:

| Token | Draft value | Use |
|---|---|---|
| `--color-ivory` | `#F7F3EC` | primary background |
| `--color-offwhite` | `#F1ECE3` | secondary surfaces, alternating sections |
| `--color-charcoal` | `#211E1B` | primary text, dark sections (never pure `#000`) |
| `--color-beige` | `#DCD2C2` | dividers, muted UI, borders |
| `--color-bronze` | `#8C6F4E` | accent only — links, small labels, focus states |

Rules:

- Bronze is an **accent**, used sparingly (a link hover, an eyebrow label, a
  thin rule) — never as a large fill, button background, or gradient stop.
  The brand brief explicitly warns against overusing gold/metallics; treat
  bronze the same way.
- No purple/blue anywhere. No gradients as a decorative device. Flat color
  and photography carry the palette.
- Dark sections use charcoal, not black, with off-white/ivory text — keep
  contrast AA-compliant (check with real values, not just visually).

## 3. Typography

- Large, confident editorial type for headlines — this is a hallmark of the
  aesthetic (think a magazine masthead / gallery wall text, not a hero H1
  sized for a SaaS pricing page).
- Pair a refined **serif or high-contrast display face** for headlines with a
  clean, neutral **sans/grotesk** for body copy and UI — this pairing (display
  serif + workhorse sans) is what reads "studio," not "tech product." Specific
  paid/licensed fonts haven't been chosen — don't hardcode a named commercial
  font without confirming it's licensed for this project; use `next/font`
  once a choice is confirmed, and use a comparable web-safe/Google Fonts
  serif in the meantime, clearly noted as a placeholder.
- Wide type scale jumps between headline and body sizes reinforce hierarchy —
  don't let heading sizes creep toward body-text proportions "for balance."
- Generous line-height on body copy, tighter (but not cramped) leading on
  large display headlines. Avoid centered paragraph text at wide measures.
- See `references/design-tokens.md` for a draft type scale.

## 4. Layout & whitespace

- Build on a clear column grid (12-col desktop is a reasonable default) but
  break it deliberately — full-bleed photography, off-grid captions, asymmetric
  two-up layouts — rather than centering everything in a max-width container.
- Whitespace is a design element, not empty space to fill. When in doubt, add
  margin before adding another element.
- Section rhythm should feel like turning pages in a monograph: one strong
  idea (a project, a statement, an image) per viewport, not dense stacked
  content.
- Avoid rounded "cards" as the default container. Use flat imagery, hairline
  rules (1px, low-contrast), and typographic hierarchy to separate content
  instead of boxes/shadows/heavy rounding.

## 5. Imagery

- Real KMD project photography is the visual centerpiece — always prefer it
  over stock or placeholder imagery. If a section needs a photo and no real
  asset exists yet, say so explicitly (e.g. a visible `[Photography needed:
  living room, Project X]` placeholder or a comment) instead of substituting
  generic stock photography that looks like it belongs.
- Use `next/image` for all photography for automatic responsive/optimized
  output — check current `next/image` API in the docs per §0 before using it,
  since Next 16 may differ from older patterns.
- Prefer large, mostly-uncropped images with intentional aspect ratios over
  tightly cropped thumbnails. Let a hero image be genuinely large.
- Hover/interaction treatments on images should be subtle: a slow scale
  (e.g. 1 → 1.03 over 600–800ms), a slight reveal/mask, or a caption fade-in —
  never a flashy zoom, rotation, or filter shift.

## 6. Animation

Stack: **Framer Motion** for standard UI transitions (menus, page/section
enter states, hover/tap feedback), **GSAP + ScrollTrigger** for scroll-driven
storytelling (pinning, staggered scroll reveals, parallax), **Lenis** for
smooth scrolling where it genuinely improves the feel of long editorial pages.
Concrete setup patterns for each are in `references/animation-patterns.md` —
use them as a starting point rather than reinventing scroll-trigger
boilerplate per page.

Principles:

- **Motion should feel cinematic, not decorative.** A restrained fade+rise on
  scroll or a slow image reveal supports the editorial feel; a bounce,
  spin, or staggered icon animation undercuts it. If an animation could be
  removed without weakening the page, remove it.
- **Text reveals and image reveals are the signature moves** — e.g. headline
  lines/words revealing on load or scroll, images unmasking as they enter
  view. Use these purposefully at key moments (hero, project transitions),
  not on every single element on the page.
- **Parallax only where it adds depth** (e.g. a hero image moving slower than
  scroll) — never parallax on body text or UI chrome, and never so much that
  it fights readability.
- **Always respect `prefers-reduced-motion`** — provide a reduced/no-motion
  variant for every non-trivial animation, not just a global disable switch.
  See `references/animation-patterns.md` for the guard pattern.
- **60fps first.** Animate `transform`/`opacity`, not layout-triggering
  properties. Kill/clean up GSAP ScrollTriggers and Lenis instances on
  unmount. Test scroll-heavy pages for jank, especially on mobile.
- Don't run all three animation libraries on every page — pick the tool
  that fits the interaction, and keep the animation surface area small and
  intentional.

## 7. Explicitly avoid

These read as "generic AI-generated landing page," not "design studio," and
should be treated as defaults to actively design away from:

- Symmetric hero + 3-icon-feature-card + testimonial-carousel SaaS layout
- Heavy rounded corners on cards/buttons/images as a default style
- Gradients (backgrounds, text, buttons, "glow" effects) and glassmorphism/
  frosted-blur panels
- Purple/blue/indigo palettes or any "tech startup" color logic
- Gold/metallic overuse — bronze is a sparing accent, not a fill color
- Decorative blobs, floating shapes, particle effects, generic line-art icons
  scattered for texture
- Animation added because a section "feels empty," rather than to support
  content
- Stock photography anywhere a real KMD project photo could go

## 8. Project presentation

Projects are the strongest content KMD has — treat the portfolio as the core
of the site, not a secondary "our work" section.

- Avoid a basic uniform image grid as the primary portfolio layout. Prefer
  editorial variation: mixed image sizes, occasional full-bleed entries,
  asymmetric pairings — like a monograph spread, not a stock gallery grid.
- Each project should have its own **case-study page**: a considered sequence
  of large images, a short project narrative, and any *verified* details
  (scope, location, etc. — see §9). Don't just link out to an image lightbox.
- Hover interactions on portfolio entries should be elegant and restrained:
  a subtle image scale, a caption/label fade-in, a thin underline on the
  title — not color overlays, icon badges, or shadow pop.
- Project → case study transitions are a good place for a purposeful shared-
  element/image transition (Framer Motion `layoutId` or a GSAP-driven
  transition) since it reinforces continuity — but keep it fast and skip it
  entirely under reduced motion.

## 9. Brand integrity — never invent

Do not fabricate, and treat as **hard constraints**, not stylistic
preferences:

- Clients or client names
- Awards or recognitions
- Testimonials/quotes
- Project statistics (sq ft, budgets, timelines, counts)
- Project names or locations
- Certifications
- Years of experience / founding date
- Team size or team member names/bios

If content needs one of these and it hasn't been supplied, use a clearly
marked placeholder (e.g. `[CONFIRM: project location]`) or ask, rather than
writing plausible-sounding filler. This applies to copy you write as much as
to structured data/config.

## 10. Mobile

Mobile is a first-class layout, not a squeezed-down desktop version:

- Full-screen takeover menu on mobile nav (not a small dropdown), with clear
  large touch targets (44px+ hit areas).
- Responsive type scale — headline sizes should scale meaningfully across
  breakpoints, not just shrink to a fixed smaller size.
- Simplify animation on mobile where it would hurt performance or feel: e.g.
  trade a pinned GSAP scroll sequence for a simpler fade/stagger reveal on
  small screens rather than forcing the desktop choreography down.
- No horizontal overflow, ever — audit anything full-bleed, any negative
  margins, and any fixed-width elements against small viewports.
- Verify real device performance for image-heavy pages (largest contentful
  paint, scroll jank), not just visual correctness in a resized desktop
  browser.

## 11. Technical baseline

- Next.js (App Router) + React + TypeScript + Tailwind CSS v4, per §0.
- Semantic HTML: `<nav>`, `<main>`, `<article>` per project, proper heading
  order (one `h1` per page), `<figure>`/`<figcaption>` for captioned images.
- Accessibility: meaningful `alt` text for real project photography
  (describe the space, not "image1.jpg"), visible focus states (can use the
  bronze accent here), keyboard-operable nav and menus, sufficient color
  contrast for the palette in §2.
- SEO: per-page metadata (title/description/OG image) using real project
  imagery, sensible URL structure for case-study pages.
- Performance: `next/image` everywhere, lazy-load below-the-fold content,
  avoid shipping GSAP/Lenis code to routes that don't use them, keep JS
  animation libraries client-only (`"use client"`) and scoped to the
  components that need them.
- Build reusable components (e.g. a `ProjectCard`, `SectionHeading`,
  `RevealText`) rather than one-off markup per page, but don't over-abstract
  before a second real use case exists.

## Reference files

- `references/design-tokens.md` — draft color tokens, `@theme` CSS block,
  and type scale to start a page/component from.
- `references/animation-patterns.md` — Lenis setup, a GSAP ScrollTrigger
  reveal pattern, a Framer Motion text/image reveal pattern, and the
  `prefers-reduced-motion` guard, written for this stack.
