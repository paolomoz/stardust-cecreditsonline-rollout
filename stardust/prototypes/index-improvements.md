<!--
_provenance:
  writtenBy: stardust:direct
  writtenAt: 2026-06-27T17:30:00Z
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/brand-review.html
    - stardust/current/pages/index.json
  stardustVersion: 0.13.1
  mode: A (brand-faithful)
-->

# Improvements — index (home)

1. **[dated-pattern]** The home is a stock Shopify Dawn theme: split hero
   (photo-right, headline-left) + uppercase eyebrow + dual button pair, the
   2021-era commerce-template silhouette. The H1 ("Online Professional
   Development for K-12 Teachers") and a 1500×747 real hero photo carry the
   brand fine, but the chrome reads as a storefront, not an authority in
   teacher PD.
   *Fix:* Keep the same hero photo and headline (Mode A image-reuse), recompose
   as a calm editorial hero — left-anchored headline + subhead + single primary
   CTA, secondary text-link — on the cream ground.

2. **[private-font]** Headings compute to "Mundial," a licensed cut not in the
   captured woff2 set (only GT Standard/Poppins/Figtree were served).
   *Fix:* Substitute **Poppins** for display headings and **Figtree** for body
   — both already loaded by the source, both open-license (OFL). Identity holds;
   licensing risk gone.

3. **[missed-opportunity]** The strongest trust asset — "94% of over 20,000
   educators would take another course" plus authentic teacher testimonials —
   is rendered small inside a slick-slider and a thin stat strip. For a
   credential-buying audience, social proof IS the conversion.
   *Fix:* Promote to a full-width editorial **stat band** (large numerals) and a
   3-up **testimonial card** grid with the real quotes verbatim.

4. **[cliché]** Card headings and buttons are uppercase site-wide via CSS,
   including multi-word section openers — the shout reads as urgency at the
   first heading and fatigue by the third.
   *Fix:* Mixed-case for section headings ≥3 words; reserve uppercase for short
   eyebrow labels and CTAs only. Keeps the brand's voice, reads current.

5. **[ia-clutter / commerce-chrome]** Commerce furniture ("Subscribe and Save!"
   announcement bar, Cart, Log in/Create account) competes with the editorial
   credibility the brand is actually selling. The EDS target is editorial, not a
   live storefront.
   *Fix:* Drop the live cart/account chrome; keep a single "Browse Courses" CTA
   to the catalog. Reproduce course *content*, not the purchase flow.
