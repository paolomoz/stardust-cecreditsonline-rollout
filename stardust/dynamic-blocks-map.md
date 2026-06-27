# Dynamic blocks map — CE Credits Online

> Phase 4.5 (PRE-IMPORT gate). Decide what must be dynamic and emit the metadata
> contract up front, so query-indexes are rich at import time.

## Blocks that LIST other pages → read a query-index (not static cards)

| Block | On pages | Lists | Index |
|---|---|---|---|
| `cards articles` (Latest Articles) | home, blog-index | blog posts | `/blogs/news` index (blog query) |
| collection/course listing | collections/*, /pages/courses | course products | `/products` + `/collections` index |
| blog-index feed | /blogs/news | all blog posts | blog query |

## Metadata contract per content type (emitted inline at author time)

### blog-article (`/blogs/news/*`)
- `PublishDate` (ISO 8601)
- `Category` (tag, e.g. classroom-management)
- `Author` (optional)
- `og:image` (lead image) — page-intrinsic
- `Description`

### product / course (`/products/*`)
- `Category` (subject area)
- `CreditType` (PD / clock-hours / CTLE / etc.)
- `og:image`
- `Description`

### collection (`/collections/*`)
- `Region` (state / district the collection targets)
- `Description`

## Query-index scopes (helix-query.yaml)
- **blog index** — include `/blogs/news/**`, target `/blogs/news/query-index.json`,
  properties: title, image, description, publishdate, category, lastModified.
- **products index** — include `/products/**`, target `/products/query-index.json`,
  properties: title, image, description, category, credittype.
- **default index** — include `/**` (pages), target `/query-index.json`,
  properties: title, image, description.

## Relationships (NOT in query-index)
- "Related courses" / "related articles" are many-to-many → keep static
  (authored teasers) until a join field is added and related items are indexed.

## Notes
- The query-index builds against the **LIVE** tree — every page must be published
  (`POST /live/`), not preview-only, or the index is empty.
- Article/course cards on the home are authored static now (real teasers) and
  switch to index-fed in Phase 7 once the indexes populate.
