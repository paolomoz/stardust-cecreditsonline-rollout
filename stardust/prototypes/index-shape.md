<!--
_provenance:
  writtenBy: stardust:prototype
  writtenAt: 2026-06-27T17:40:00Z
  readArtifacts:
    - stardust/current/pages/index.json
    - stardust/current/_brand-extraction.json
    - stardust/direction.md
    - DESIGN.md
    - DESIGN.json
  stardustVersion: 0.13.1
  mode: A
  variantId: A
  iaFidelity: verbatim
  surprise: low
  capturedSourceLineage:
    - "header → site-wide system-component (_brand-extraction.json#systemComponents.header)"
    - "hero → pages/index.json#landmarks[hero] (H1 + subhead + hero.webp)"
    - "testimonials → pages/index.json#landmarks (What Teachers Say section)"
    - "credits-wayfinding → pages/index.json (Get the Credits You Need)"
    - "about → pages/index.json (What is CE Credits Online?)"
    - "stat-band → pages/index.json (94% of 20,000 educators)"
    - "university-partners → pages/index.json (University Partners)"
    - "faq-teaser → pages/index.json (Have Questions?)"
    - "newsletter → pages/index.json (Subscribe to our Newsletter)"
    - "latest-articles → pages/index.json (Latest Articles, 3 real posts)"
    - "footer → site-wide system-component (_brand-extraction.json#systemComponents.footer)"
  antiTemplatePass:
    - pattern: "hero composition"
      defaultReflex: "centered-stack hero + dual-button CTA pair"
      alternatives: ["left-anchored editorial hero, photo-right", "type-led hero no photo"]
      picked: "left-anchored editorial hero, photo-right, single primary CTA"
      rationale: "Mode A reuses captured hero.webp at hero position; left-anchor + single CTA fixes improvements #1/#5 storefront chrome."
    - pattern: "social proof"
      defaultReflex: "thin stat strip + slick testimonial slider"
      alternatives: ["full-width editorial stat band + 3-up testimonial cards", "inline pull-quotes"]
      picked: "editorial stat band + 3-up testimonial cards"
      rationale: "improvements #3 — promote the brand's strongest trust asset; verbatim quotes."
  substrateTransitions:
    default: "cream (--background)"
    exceptions:
      - { substrate: "forest-green (--primary)", purpose: "stat band — the one high-emphasis social-proof moment" }
  voiceClassification:
    - { section: "hero", classification: "captured-verbatim", source: "pages/index.json#headings[h1] + subhead" }
    - { section: "testimonials", classification: "captured-verbatim", source: "pages/index.json body quotes" }
    - { section: "stat-band", classification: "captured-verbatim", source: "94% / 20,000 educators" }
    - { section: "latest-articles", classification: "captured-verbatim", source: "real post titles" }
    - { section: "all CTAs", classification: "direction-authorized rewrite", note: "single 'Browse Courses' canonical CTA per improvements #5" }
  copyCadenceBypass:
    rules: ["em-dash-overuse", "marketing-buzzword"]
    basis: "captured-verbatim source prose under ia-fidelity: verbatim (Discipline 9)"
  unsourcedContent: []
-->

# Shape brief — index (home)

**Surprise:** low (verbatim cap). **Variant:** A (single). **Register:** brand / editorial.

## Layout strategy
Section-banded, single cream substrate throughout except one forest-green stat band.
Generous balanced rhythm (64px desktop). Mixed-case headings (Poppins), Figtree body.
All imagery reused at the same semantic position via source Shopify CDN URLs.

## Sections (verbatim IA order)
1. **Header** — wordmark logo (ce-logo) left, 6-item nav (Courses, University Partners,
   Blog, Support, About Us, FAQ), single "Browse Courses" CTA. No live cart/account chrome.
2. **Hero** — H1 "Online Professional Development for K-12 Teachers"; subhead "Flexible,
   Self-Paced Online PD Courses for Teachers — Earn Accredited Credits for Salary
   Advancement & Recertification"; hero.webp photo-right; primary CTA "Browse Courses".
3. **Testimonials** — "What Teachers Say About CE Credits Online"; 3-up cards, verbatim quotes.
4. **Get the Credits You Need** — wayfinding by state/district; links to how-to-earn pages.
5. **About** — "What is CE Credits Online?" split panel; brand story (woman-owned, 2001, 20yrs).
6. **Stat band** (green substrate) — "94% of over 20,000 educators state they would take
   another CE Credits Online course."
7. **University Partners** — image+text split (Happy-young-woman-library.jpg) + accreditation note.
8. **Have Questions?** — FAQ teaser split panel (classroom-learning.webp), CTA to /pages/faq.
9. **Subscribe to our Newsletter** — split panel (smiling-friends.webp) + email input.
10. **Latest Articles** — 3 real blog teaser cards (The Importance of Professional Development;
    End-of-Year Checklist for K–12 Teachers; The First 10 Minutes) with real images + links.
11. **Footer** — quick links + legal + newsletter; wordmark.

## Key states
- Buttons: default / hover (primary-dark) / focus-visible ring.
- Newsletter input: empty / focus / (no live submit — editorial).
- Cards: hover lift (subtle shadow).

## Interaction model
Static editorial. Gentle entrance fades (editorial register), reduced-motion honored.
Mobile: nav collapses to hamburger; split panels stack; card grids → single column.

## Structural data attributes
Every section gets `data-section="<name>"`; blocks named per the EDS block plan
(eds-conversion-log.md): hero, cards (variants: testimonials/articles/partners),
columns (split panels), stat-band, newsletter, header, footer.
