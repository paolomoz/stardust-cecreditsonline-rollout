# EDS conversion log — block name locks

> Rule: one prototype `<section>` = one EDS block (safe default). Same-pattern
> sections collapse to one block + variant classes. Never name a block after a
> reserved class (section, default-content, button, wrap).

## Locked block names (from index-proposed.html sections)

| Prototype section (data-section) | EDS block | Variant | Notes |
|---|---|---|---|
| announcement | `announcement` | — | green promo bar; site-wide |
| header | `header` | — | system component (nav fragment) |
| hero | `hero` | — | reuse boilerplate `hero` block; image-right split |
| testimonials | `cards` | `cards testimonials` | 3-up verbatim teacher quotes |
| credits-wayfinding | `cta` | — | "Get the Credits You Need" + dual CTA |
| about | `columns` | `columns split` | image+text split panel |
| stat-band | `stat-band` | — | green band, big numeral + caption |
| university-partners | `columns` | `columns split reverse` | image+text + partner logo strip |
| faq-teaser | `columns` | `columns split` | image+text + CTA |
| newsletter | `columns` | `columns split reverse` | image+text + email form |
| latest-articles | `cards` | `cards articles` | 3 blog teasers (dynamic later: blog-index) |
| footer | `footer` | — | system component (footer fragment) |

## Reuse decisions
- `cards` block serves testimonials AND article teasers via variant classes
  (`cards testimonials`, `cards articles`) — same pattern, different content.
- `columns` block (with `split` / `split reverse` variants) serves all four
  image+text panels (about, partners, faq-teaser, newsletter).
- `hero`, `header`, `footer`, `cards`, `columns` already exist in the
  boilerplate — extend their CSS to the CE brand tokens rather than new blocks.
- New blocks to author: `announcement`, `stat-band`, `cta`.

## Dynamic blocks (see dynamic-blocks-map.md)
- `latest-articles` (cards articles) → reads the blog query-index.
- collection/course listing → reads product/collection query-index.
