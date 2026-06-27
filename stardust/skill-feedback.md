# Skill feedback — notes to report back to the skills

Living log of issues, gaps, and improvements surfaced while running the
stardust pipeline (extract → direct → prototype → migrate → deploy → rollout)
plus impeccable and da-content, on the CE Credits Online → EDS migration.
Each note names the **target skill** and a concrete change to propose.

---

## 1. Hero should default to full-bleed when image resolution allows
**Skills:** `stardust:prototype`, `stardust:migrate` (+ boilerplate `hero` block)
**Priority:** P1 (user preference, recurring)

User preference (2026-06-27): *"For the hero I usually prefer full-bleed
background image when we have an image with enough resolution, as it makes the
home page more experience-led."*

Today prototype/migrate produced an editorial **split** hero (text + image
side-by-side) by default. The brand-faithful default should be a **full-bleed
photographic hero** (background image, overlaid headline, legibility scrim,
`prefers-reduced-motion` safe) whenever the captured hero image is high enough
resolution (used **≥ 1200px intrinsic width** as the gate here), falling back
to the split layout for low-res images.

**Proposed change:** make the hero block decorator resolution-aware
(full-bleed ≥ threshold, split otherwise); have `prototype`'s shape brief pick
full-bleed for image-led `brand`-register heroes by default. Implementation
landed in this repo: `blocks/hero/hero.js` + `blocks/hero/hero.css`
(`hero-fullbleed` / `hero-split` variants). A hero that animates in the source
still needs the cinematic treatment; this note is about the static default.

---

## 2. Two CTAs in one paragraph silently ship as plain text (no buttons)
**Skills:** `stardust:migrate`/`deploy` authoring, `da-content` (html-content ref)
**Priority:** P1 (silent fidelity defect)

EDS `decorateButtons` only buttonizes an `<a>` that is the **sole content of
its `<p>`** (`p.textContent.trim() !== linkText` → early return). Authoring a
hero/CTA row as `<p><strong><a>A</a></strong> <em><a>B</a></em></p>` ships
**both as unstyled text** — and it's invisible on a light ground, glaring on a
full-bleed photo. The home hit this on every multi-CTA section.

**Proposed change:** the authoring contract must emit **one CTA per
`<p>`**. Add this to `da-content` html-content.md (button rules) and to the
stardust authoring step as a validator: a `<p>` containing >1 buttonizable
link is a defect.

---

## 3. `createOptimizedPicture` breaks cross-origin (source-CDN) images
**Skills:** boilerplate blocks consuming images; note for `stardust:migrate`
**Priority:** P1

`createOptimizedPicture` rebuilds the URL from `origin + pathname` and appends
`?width=&format=webply&optimize=medium`, **dropping the original query** (e.g.
Shopify's `?v=` cache key) and adding params foreign CDNs mishandle → broken
`<source>`/renditions. Any block that runs it over reused source imagery
(cards, columns) corrupts cross-origin images.

**Proposed change:** blocks should **skip optimization for cross-origin**
images (keep the original `<img>`), only optimizing same-origin (Content Bus)
assets. Patched here in `blocks/cards/cards.js`. Worth baking into the
stardust block templates + a da-content note.

---

## 4. `about:error` from the wrong source-CDN host
**Skills:** `stardust:migrate` image-fidelity gate, `da-content` media.md
**Priority:** P2

Images on `www.cecreditsonline.org/cdn/shop/...` (the store's own domain)
render fine; the identical asset family on `cdn.shopify.com/s/files/...`
rendered `about:error` on EDS. The image-fidelity check must test the **actual
host** and prefer the store-domain CDN rewrite when both exist. One thin
PDF-download page tripped this (its only image was a `cdn.shopify.com` button).

---

## 5. Rollout verify must be fragment-aware
**Skills:** `stardust:rollout` verify
**Priority:** P2

Nav/footer fragments have **no `<h1>`**, so an `<h1>`-presence verify false-
fails them (they were actually deployed fine: PUT/preview/live all 200). The
verify should classify `/nav`, `/footer`, and other fragments separately
(check for decorated content, not an `<h1>`).

---

## 6. Boilerplate lint toolchain is broken out of the box
**Skills:** `stardust:deploy` runtime bootstrap / Phase 0
**Priority:** P2

`npm install` fails (`ERESOLVE`: `@babel/eslint-parser@8` peer-needs eslint 9,
boilerplate pins eslint 8) and even with `--legacy-peer-deps`, `eslint` errors
(`Cannot find package '@babel/core'`). Needs `--legacy-peer-deps` **and** an
explicit `@babel/core` dev dep before `npm run lint` works. Phase 0 should
either pin a working toolchain or document the workaround.

---

## 7. Blog `publishdate` not captured → empty in query-index
**Skills:** `stardust:extract`/`migrate` metadata extraction
**Priority:** P2

Source blog articles didn't expose `article:published_time` in a form the
generic extractor caught, so the blog query-index `publishdate` is empty and
the dynamic sort falls back to last-modified. Metadata extraction should also
read **JSON-LD `datePublished`** and platform-specific meta (Shopify article
schema) before giving up.

---

## 8. zsh-in-loop PATH gotcha — confirmed live
**Skills:** already learning #12 in the migration prompt
**Priority:** info

`curl` lost PATH inside a zsh `for` loop (`command not found: curl`), exactly
as the prompt warns. Use `node`'s `fetch` or absolute binary paths for batched
network checks. Confirmed on this run; keep the warning.

---

## 9. Standard EDS runtime is a viable simpler alternative to AuthorKit
**Skills:** `stardust:deploy` Phase 0
**Priority:** info

Phase 0 strongly recommends porting the AuthorKit runtime for vanilla
boilerplate. For this faithful migration the **standard boilerplate runtime**
worked cleanly end-to-end (95 pages, fragments, dynamic block) and **avoided**
the AuthorKit-specific gotchas entirely (the `.btn`/`.btn-group` button classes
and the fragment-`<script>`-via-innerHTML trap). Worth offering standard
runtime as a documented, lower-friction path when AuthorKit chrome isn't
required.

---

## 11. Social-proof blocks default to the banned identical-card-grid
**Skills:** `stardust:prototype`/`migrate` (testimonials/social-proof pattern)
**Priority:** P1 (impeccable absolute-ban escape)

The generic `cards testimonials` variant ships the exact **"identical card
grids"** impeccable bans. A `delight` pass produced a reusable, on-objective
alternative — **"featured voice + chorus"**: one featured quote (larger, warm
tint, oversized brand quotation glyph) + a supporting chorus at smaller scale,
asymmetric grid, staggered reveal-as-enhancement (reduced-motion safe, failsafe,
never strands content). Verbatim quotes only — trust intact. Reference
implementation: `blocks/testimonials/testimonials.{js,css}`.

**Proposed change:** ship a dedicated `testimonials` block pattern (not a
`cards` variant) in the stardust block library so social proof escapes the
identical-grid cliché by default. Generalizes to any "wall of short quotes"
surface.

---

## 10. impeccable design hook replays a stale finding cache
**Skills:** `impeccable` hooks
**Priority:** P3 (DX noise)

After the initial `Write`, the design hook kept reporting the **same findings
with frozen line numbers** on subsequent edits even once each was fixed (e.g.
`design-system-color:164:rgba(0,0,0,.15)` persisted after the rgba was
removed). Re-scan against current file state instead of replaying the first
scan's cache.
