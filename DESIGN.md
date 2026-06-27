---
# DESIGN — CE Credits Online (target system, Mode A brand-faithful)
# Resolved by stardust:direct. Tokens pinned to captured brand surface.
colors:
  # OKLCH (impeccable hard rule: OKLCH only, no pure black/white)
  background: "oklch(0.96 0.010 92)"    # #F5F3ED warm ivory/cream — brand ground (Mode C: cream wins)
  surface:    "oklch(0.99 0.005 92)"    # warm white (softened from #FFFFFF — no pure white)
  ink:        "oklch(0.32 0.004 60)"    # #2D2D2D warm near-black text
  border:     "oklch(0.27 0.006 40)"    # #211C1C
  primary:    "oklch(0.47 0.052 150)"   # #415D43 forest green — CTAs, accents
  primary-dark: "oklch(0.36 0.040 150)" # #2D3D2E hover/deep accent
  muted:      "oklch(0.90 0.002 90)"    # #E0E0E0 secondary surface
typography:
  heading: "Poppins, system-ui, sans-serif"   # substitutes private Mundial (both geometric sans)
  body:    "Figtree, system-ui, sans-serif"
  scaleRatio: 1.25                              # major third (brand register ≥ 1.25)
  baseSize: "1.0625rem"
  headingTransform: "none"                      # mixed-case (was uppercase) — see improvements #4
  eyebrowTransform: "uppercase"                 # reserve caps for eyebrows + CTAs
rounded: "4px"
spacing:
  base: "4pt"
  sectionPadding: { desktop: "64px", tablet: "48px", mobile: "32px" }   # balanced (multi-audience hard floor)
components:
  - button-primary
  - button-secondary
  - card
  - input
  - badge
  - link
---

# Visual System

CE Credits Online presents as a calm, trustworthy education authority: a **warm
cream canvas (`#F5F3ED`) with forest-green accents (`#415D43`)**, never loud.
This is brand-faithful Mode A — the palette and type are pinned to the captured
surface, modernized only where the source carried licensing or craft debt.

## 1. Color

A warm-neutral ground (cream `background`, near-white `surface`) carries warm
near-black ink (`#2D2D2D`). The single chromatic voice is **forest green** —
`primary` for CTAs, links, the announcement/accent band, and section eyebrows;
`primary-dark` for hover and deep accents. `muted` is the only grey, for
secondary surfaces and hairlines. No pure black, no pure white (OKLCH softened).
Green-on-cream and green-on-white both clear AA for large text and UI elements;
body copy uses ink for high contrast.

## 2. Typography

**Poppins** (geometric sans) for display/headings, substituting the source's
licensed *Mundial* — same geometric-humanist character, open-license, already
served by the source. **Figtree** for body and UI. Major-third scale (1.25).
Headings render **mixed-case** (modernization fix); uppercase is reserved for
short eyebrow labels and button text only. Card-heading letter-spacing -0.02em
carried from the brand.

## 3. Spacing & Layout

4pt base scale, **balanced** section rhythm (64/48/32px desktop/tablet/mobile)
— bounded by the multi-audience hard floor (the IA spans teachers, admins, and
prospects across 9 templates). Layout stays **section-banded**: alternating
full-width bands, many as image+text split panels, exactly as the source — IA
fidelity is verbatim, only the surface modernizes.

## 4. Components

- **button-primary** — forest-green fill, warm-white label, 4px radius, uppercase
  label. The single conversion CTA per section.
- **button-secondary** — white/cream fill, `border` outline, ink label, 4px radius.
- **card** — white surface, 1px `muted` hairline, 4px radius, subtle shadow;
  used for course/collection cards, blog teasers, testimonials.
- **input** — cream/white field, `border` 1px, 4px radius (newsletter, contact).
- **badge** — small uppercase eyebrow chip (credit-type / category labels).
- **link** — forest-green, underline on hover.

## 5. Motion

Restrained. The source hero is a static `<img>` (no video/canvas/Lottie), so no
signature motion to reproduce. Gentle entrance fades only; `prefers-reduced-motion`
honored. Register: `editorial` (publication-paced, calm).

## 6. Voice

Teacher-to-teacher, warm, credible. **Do:** "Earn accredited PD credit on your
schedule." "Trusted by 20,000+ educators." **Don't:** startup hype, ALL-CAPS
shouting, fabricated claims. All body copy is reproduced verbatim from the
source (entities decoded, mojibake normalized).
