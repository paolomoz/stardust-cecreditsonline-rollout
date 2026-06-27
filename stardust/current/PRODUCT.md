# PRODUCT — CE Credits Online (current state, descriptive)

> Descriptive snapshot written by `stardust:extract`. Describes what the
> live site **is**, not what the redesign should be. Source:
> https://www.cecreditsonline.org (10 archetype pages, Playwright-rendered).

## Register

`brand` — marketing/commerce site for an education service. Reads as a
trust-forward, teacher-facing brand, not a tool/dashboard.

## Product Purpose

CE Credits Online sells **online, self-paced graduate-level professional
development (PD) courses for K-12 teachers**. Teachers buy courses to earn
accredited credits/clock-hours used for **recertification and salary
advancement**. Credit is granted through partnerships with regionally
accredited universities. The storefront is Shopify; each course is a
product, organized into collections by **state / school district / credit
type** (e.g. Chicago Public Schools lane credits, Washington State clock
hours, NYC DOE ASPDP, Texas CPE, Wyoming PTSB).

## Users

- **K-12 classroom teachers** seeking PD credit for license renewal or
  pay-scale movement — the primary buyer.
- **District / ESD administrators** routing staff to pre-approved courses
  (district-specific "how-to-earn" landing pages target this).
- **Prospective teachers / education students** browsing the blog and
  course catalog.

## Brand Personality

Trustworthy, established, warm, academic-but-approachable. 20+ years in
business (founded 2001), **woman-owned**, "professional development should
be worth a teacher's time." Emphasizes flexibility (self-paced, anytime),
accreditation/legitimacy, and real classroom applicability. Social proof is
heavy: "94% of over 20,000 educators would take another course," hundreds of
thousands of educators served, teacher testimonials.

## Anti-references

- Not a flashy edtech SaaS — no neon-gradient startup energy.
- Not a MOOC marketplace (Udemy/Coursera) — curated, accreditation-anchored.
- Not corporate-LMS sterile — warm and human, teacher-to-teacher voice.

## Design Principles (observed)

1. **Warmth + trust over hype** — cream background, forest green, serious-but-friendly.
2. **Social proof front and center** — testimonials, stats, university partner logos.
3. **Wayfinding by credit type** — collections and "how-to-earn" pages route
   teachers to exactly the credit their state/district accepts.
4. **Editorial blog as top-of-funnel** — 190+ classroom-tips articles drive SEO and trust.

## Information Architecture

- **Home** — hero, value props, testimonials slider, "get the credits you need,"
  university partners, FAQ teaser, newsletter, blog teasers.
- **Courses** (`/pages/courses`, `/collections/*`) — catalog + filtered collections.
- **Product** (`/products/*`) — individual course detail (description, credit info, price).
- **How-to-earn** (`/pages/how-to-earn-*`) — per-state/district credit instructions (~17).
- **Info** (`/pages/about-us`, `/university-partners`, `/contact`, `/faq`, policies).
- **Blog** (`/blogs/news` + 193 articles) — classroom tips, seasonal activities.

_provenance: register from brand surface; users/purpose/IA inferred from
captured copy, nav, and sitemap (~304 pages)._
