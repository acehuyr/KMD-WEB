# Design tokens (draft)

These are a starting point, not final brand values — no brand guide or exact
hex values have been supplied. Revisit once real photography and/or a brand
guide are available, and say so when you use them rather than presenting them
as confirmed brand colors.

## Color

| Token | Draft hex | Role |
|---|---|---|
| `--color-ivory` | `#F7F3EC` | primary light background |
| `--color-offwhite` | `#F1ECE3` | secondary surface / alternating section bg |
| `--color-charcoal` | `#211E1B` | primary text; dark section background |
| `--color-charcoal-soft` | `#3A3531` | secondary text on light backgrounds |
| `--color-beige` | `#DCD2C2` | hairline borders, muted chips, dividers |
| `--color-bronze` | `#8C6F4E` | accent only: links, small labels, focus ring |
| `--color-bronze-dark` | `#6E5539` | bronze hover/active state |

Contrast check before shipping real copy: charcoal-on-ivory and ivory-on-
charcoal should both clear WCAG AA for body text (4.5:1) — verify with the
final chosen values, since the drafts above are approximate.

## Tailwind v4 `@theme` block

Add to `app/globals.css` (this repo has no `tailwind.config.js` — Tailwind v4
is CSS-first). Extend the existing `@theme inline` block rather than
replacing it, keeping the current `--font-sans`/`--font-mono` wiring intact
unless the font decision in SKILL.md §3 has been finalized:

```css
@import "tailwindcss";

:root {
  --ivory: #F7F3EC;
  --offwhite: #F1ECE3;
  --charcoal: #211E1B;
  --charcoal-soft: #3A3531;
  --beige: #DCD2C2;
  --bronze: #8C6F4E;
  --bronze-dark: #6E5539;
}

@theme inline {
  --color-ivory: var(--ivory);
  --color-offwhite: var(--offwhite);
  --color-charcoal: var(--charcoal);
  --color-charcoal-soft: var(--charcoal-soft);
  --color-beige: var(--beige);
  --color-bronze: var(--bronze);
  --color-bronze-dark: var(--bronze-dark);
}
```

This makes `bg-ivory`, `text-charcoal`, `border-beige`, `text-bronze`, etc.
available as Tailwind utilities.

## Type scale (draft)

A wide jump between display and body sizes is the point — don't compress it
"for consistency."

| Role | Mobile | Desktop | Notes |
|---|---|---|---|
| Display / hero headline | `clamp(2.5rem, 8vw, 4.5rem)` | up to `~7rem` on very wide viewports | tight leading (`leading-[0.95]`–`1.05`) |
| Section headline | `2rem`–`2.75rem` | `3rem`–`4rem` | |
| Eyebrow / label | `0.75rem`, letter-spacing `0.15em`+, uppercase | same | bronze accent color is appropriate here |
| Body | `1rem`–`1.125rem` | `1.125rem`–`1.25rem` | `leading-relaxed` (1.6–1.7) |
| Caption | `0.875rem` | `0.875rem` | muted (charcoal-soft) |

## Spacing rhythm

Favor large section paddings over tight stacking — this is part of what
reads as "editorial" rather than "app":

- Section vertical padding: `py-24` to `py-40` on desktop, `py-16`–`py-24` on
  mobile (adjust per breakpoint, don't hardcode one value everywhere).
- Content gutters: at least `px-6` mobile, `px-8`–`px-12` desktop, with a
  max content width for text-heavy sections (e.g. `max-w-3xl`) while imagery
  can go full-bleed.
