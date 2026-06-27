---
# DESIGN — CE Credits Online (current state, descriptive)
# Written by stardust:extract. Describes the live visual system.
colors:
  background: "#F5F3ED"   # warm ivory/cream
  surface: "#FFFFFF"
  text: "#2D2D2D"          # warm near-black
  primary: "#415D43"       # forest green (buttons, announcement bar)
  primary-dark: "#2D3D2E"
  border: "#211C1C"
  muted: "#E0E0E0"
typography:
  heading: "Mundial / Poppins (geometric-humanist sans)"
  card-heading: "Figtree, sans-serif (uppercase)"
  body: "Figtree, sans-serif"
  button-transform: uppercase
rounded: "4px"
spacing: "generous, section-banded (image+text split panels)"
components:
  - announcement-bar (green, full-bleed)
  - header (wordmark logo + horizontal nav + utility: login/cart)
  - hero (image-right split, headline + subhead + CTA)
  - value-prop / feature band
  - testimonial slider
  - stat band ("94% of 20,000 educators")
  - image+text split panels (university partners, FAQ teaser, newsletter)
  - course/collection card grid
  - blog teaser cards
  - footer (multi-column quick links + legal + newsletter)
---

# Visual System (descriptive)

CE Credits Online runs a warm, editorial Shopify theme. The signature is a
**cream (#F5F3ED) canvas with forest-green (#415D43) accents** — calm,
academic, trustworthy rather than loud. Typography pairs a geometric display
sans (Mundial, with Poppins observed) for headings against Figtree for body
and uppercase card headings. Buttons are squared-ish (4px radius), uppercase,
filled green for primary or white-with-dark-border for secondary.

Layout is **section-banded**: alternating full-width bands, many built as
image-and-text split panels (photo on one side, copy + CTA on the other).
Social proof recurs throughout — a testimonial slider, a large stat band, and
a university-partners logo/photo strip. The blog uses a standard card grid.

56 CSS custom properties (Shopify Dawn lineage) define the token system, so
the design is already systematized — the redesign can map cleanly onto tokens.

## Tensions (detectors)

- **Private font dependency** — headings compute to "Mundial" (a licensed
  cut, GT Standard captured); the redesign should substitute an open
  equivalent (Poppins/Figtree, both already loaded) to avoid licensing risk.
- **Generic OG image** — `og:image` is a generic "Shopify.jpg," not editorial;
  do not reuse as a hero.
- **Mojibake in body copy** — some source prose contains double-encoded
  em-dashes/apostrophes (`â€"`); normalize on migration.
- **Commerce → editorial** — the live site is a transactional storefront
  (cart/checkout); the EDS target is editorial. Reproduce course *content*;
  the live purchase flow is out of scope.
