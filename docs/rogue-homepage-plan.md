# Rogue Pest Solutions — Content Architecture & Build Plan

> Rebuild of https://roguepest.savagestrategic.io/ on the Payload Website Template (Payload CMS + Next.js).
> **Planning only — no code yet.** Decisions are explained against WordPress concepts you already know.

## How Payload concepts map to your WordPress mental model

| Payload | WordPress / ACF / Elementor equivalent | Use it for… |
|---|---|---|
| **Collection** | Custom Post Type | Many rows of the same shape: Services, Locations, Posts, Testimonials, FAQs |
| **Page (with `layout` blocks)** | A WP Page built with **ACF Flexible Content** / Elementor sections | One-off marketing pages: Home, About, Contact |
| **Block** | An ACF Flexible Content **layout** / an Elementor **widget or section** | A reusable section you stack onto a page |
| **Global** | **ACF Options Page** (singletons) | Site-wide data: header, footer, company phone/address/hours |
| **Relationship field** | ACF Relationship / Post Object | Linking a Service to its FAQs, a Testimonial to a Location |
| **Plugins already installed** | (form-builder = Gravity Forms, redirects = Redirection, seo = Yoast, search = SearchWP) | Reuse these — don't rebuild them |

**The single most important architectural decision:** the reference site hardcodes the phone number (`866-370-7378`), address, and hours in 15+ places. In Payload we put those in **one Global** (`Company Info`) — the ACF Options Page pattern — and read them everywhere. Change once, updates sitewide.

---

## Key decisions to confirm (flagged for your sign-off)

1. **Service/Location URLs.** The reference uses *flat* URLs (`/termite-control`, `/general-pest`). Your project already builds `/services/[slug]` and `/locations/[slug]`. **Recommendation:** keep the cleaner `/services/...` and `/locations/...` structure and use the **already-installed redirects plugin** to 301 the old flat URLs. Matches modern IA, no code thrown away.
2. **SEO field consistency.** Pages/Posts use the SEO-plugin **`meta` group** (title/description/image). Your new Services/Locations use **flat `metaTitle`/`metaDescription`**. **Recommendation:** migrate Services/Locations to the SEO-plugin `meta` group so all collections share one SEO pattern (and the existing `generateMeta` util works without the mapping shims currently in the frontend routes).
3. **Blog URL.** Reference calls it "Blog"; template serves it at `/posts`. **Recommendation:** keep `/posts`, optionally alias `/blog` via redirect.

---

## 1. Site Map

| Page | URL | Purpose | Content type |
|---|---|---|---|
| Home | `/` | Brand intro, lead capture, overview of services/areas/proof | **Page** (`home` slug, blocks) |
| About Us | `/about-us` | Story, stats, values, process, why-choose-us | **Page** (blocks) |
| Contact | `/contact` *(redirect `/contact-rogue`)* | Contact methods, office locations, forms | **Page** (blocks) + reads Locations |
| Services (archive) | `/services` | List all services | **Collection archive** (exists) |
| Service detail | `/services/[slug]` | One service (Termite, Mosquito, General) | **Collection** (Services, exists) |
| Locations (archive) | `/locations` | List all service areas | **Collection archive** (exists) |
| Location detail | `/locations/[slug]` | One service area (Huntsville, etc.) | **Collection** (Locations, exists) |
| Blog (archive) | `/posts` | List blog posts | **Collection archive** (exists) |
| Post detail | `/posts/[slug]` | One blog article | **Collection** (Posts, exists) |
| Testimonials | `/testimonials` | All reviews | **Page** rendering a Testimonials **block** (collection-driven) |
| FAQs | `/faqs` | All FAQs | **Page** rendering an FAQ **block** (collection-driven) |
| Privacy Policy | `/privacy-policy` | Legal | **Page** (simple content) |
| Terms & Conditions | `/terms-and-conditions` | Legal | **Page** (simple content) |
| Local Links | `/local-links` | Community/SEO links | **Page** (simple content) |
| Customer Portal | external (`key7app.com`) | Billing login | **Global** link (no page) |

**Globals (site-wide, no URL):** Header, Footer, **Company Info** (new).

---

## 2. Collection Map

### Existing — keep & extend

**Services** *(exists — add fields)*
- Current: `title, slug, featuredImage, shortDescription, content, metaTitle, metaDescription`
- **Add:** `features` (array: `title`, `description`, optional `icon`) — the "Elimination Process / Detailed Inspections" bullets; `featuredSolution` (group: `heading`, `body`, `image`, `bullets[]`) — the Sentricon callout; `order` (number, for sorting); `relatedFaqs` (relationship → FAQs, hasMany)
- **Relationships:** → FAQs (hasMany); ← Testimonials & Locations point back to it
- **SEO:** migrate to `meta` group (see decision #2)

**Locations** *(exists — add fields)*
- Current: `name, slug, heroImage, shortDescription, content, metaTitle, metaDescription`
- **Add:** `address` (group: `street`, `city`, `state`, `zip`, `mapUrl`); `phone` (optional override of Company Info); `hours` (optional override); `servicesOffered` (relationship → Services, hasMany); `serviceAreaBlurb` (text — "Huntsville, Madison, Harvest…"); `relatedFaqs` (relationship → FAQs, hasMany); optional `geo` (point — note: not supported on SQLite, fine on your Postgres)
- **Relationships:** → Services (hasMany), → FAQs (hasMany); ← Testimonials point back
- **SEO:** migrate to `meta` group

**Posts** *(exists — keep)* — blog. Already has categories, related posts, SEO. Only change: remove the **Code** block from its rich-text editor (dev-blog leftover).

**Categories** *(exists — keep)* — blog taxonomy (ACF/WP categories).

**Media** *(exists — keep)* — the Media Library.

### New collections

**Testimonials** *(new — Custom Post Type)*
- **Fields:** `quote` (textarea, required), `authorName` (text, required), `authorRole` (text — "Founder, CEO" / "Homeowner"), `rating` (number 1–5, default 5), `photo` (upload → media, optional), `location` (relationship → Locations, optional), `service` (relationship → Services, optional), `featured` (checkbox)
- **Relationships:** → Locations, → Services (so a block can show region- or service-specific reviews)
- **SEO:** none (not standalone pages)
- **Why a collection, not a block field:** reviews are reused across home, service, and location pages — exactly the ACF "create once, reference many" case.

**FAQs** *(new — Custom Post Type)*
- **Fields:** `question` (text, required), `answer` (richText, required), `topic` (select: General/Termite/Mosquito/Rodent/Safety…), `relatedService` (relationship → Services, optional), `relatedLocation` (relationship → Locations, optional), `order` (number)
- **Relationships:** → Services, → Locations
- **SEO:** none per item (the `/faqs` page carries SEO + FAQ schema)
- **Why a collection:** the same 9–10 questions repeat on home, service, and location pages. One source, filtered per context.

### Optional / future (not in MVP)

**Pests** *(optional)* — the quote-form pest dropdown (Ants, Termites, Mosquitoes…) could become a collection if you later want per-pest landing pages for SEO. Today the reference maps pests → services, so **skip for MVP**; the form can use a plain select.

---

## 3. Block Map

### Reuse existing template blocks (no work)

| Block | Reused for |
|---|---|
| **Content** (`content`) | Generic rich-text/columns copy on any page |
| **Call to Action** (`cta`) | The "Contact us / Get a quote" + phone CTA bars |
| **Media Block** (`mediaBlock`) | Standalone images |
| **Archive** (`archive`) | **Blog preview** (3 latest posts) — already queries Posts ✅ |
| **Form** (`formBlock`) | Both the Free Quote form and the bottom Instant Estimate form (via form-builder) ✅ |
| **Banner** (`banner`) | Optional inline notices inside post bodies |

### Remove / replace for a pest-control site

| Block | Action | Reason |
|---|---|---|
| **Code** (`code`) | **Remove** from Posts rich-text `BlocksFeature` (keep file or delete) | Developer-blog feature; no use on a pest site |
| **Archive** `relationTo` | **Extend** to optionally target Services/Locations, *or* leave Posts-only and use new collection blocks | Currently Posts-only |

### New blocks required — **6 (minimum), + 1 optional**

Designed to cover every distinct homepage/section pattern with the fewest new layouts:

| # | Block | Fields | Data source | Covers these sections |
|---|---|---|---|---|
| 1 | **Stats Counter** (`stats`) | `intro?`, `stats[]` (`value`, `label`, `suffix?`) | Manual (or future Global) | Homepage stats, About stats |
| 2 | **Feature Grid** (`featureGrid`) | `heading`, `intro?`, `layout` (grid / numbered-steps), `items[]` (`icon?`, `title`, `text`, `link?`) | Manual | Why Choose Us, Our Story values, **Process Steps** (numbered mode) — *one block, two layouts* |
| 3 | **Testimonials** (`testimonials`) | `heading`, `subheading?`, `source` (all / by location / by service / hand-picked), `location?`, `service?`, `limit` | **Testimonials collection** | "What Our Customers Say" everywhere |
| 4 | **FAQ** (`faq`) | `heading`, `source` (all / by topic / by service / by location / hand-picked), filters, `limit` | **FAQs collection** | FAQ accordion on home/service/location |
| 5 | **Services Showcase** (`servicesShowcase`) | `heading`, `intro?`, `source` (all / hand-picked), `services[]?`, `style` (tabs / cards) | **Services collection** | Homepage tabbed "Our Pest Control Services" |
| 6 | **Service Areas** (`serviceAreas`) | `heading`, `intro?`, `source` (all / hand-picked), `locations[]?` | **Locations collection** | "Local Service You Can Count On" strip |
| 7 *(optional)* | **Media + Text** (`mediaText`) | `heading`, `body` (richText), `image`, `imageSide`, `bullets[]?`, `link?` | Manual | "Our Story", Sentricon featured-solution — *can be approximated by Content + Media Block to avoid building it* |

**Why merge Process Steps into Feature Grid (#2):** both are "icon/number + title + short text" repeaters; a `layout` toggle (grid vs numbered steps) gives you both with one block — the ACF lesson of "don't build two layouts that share a field shape."

**Hero:** *not a new block.* The template's existing **Hero field** (the "Hero" tab, rendered by `RenderHero`) handles the homepage/service/location hero. It likely needs a small extension: add a `bullets[]` field (Experienced Team / Clear Communication / Result Guarantee) and an optional `ratingBadge` (the Facebook 5.0 stars). Treat as a hero-variant tweak, not a block.

**Promo bar** ("Keep your backyard bite-free — Call Now"): **Global** (add to Header), not a block — it's site-wide.

**Net new blocks to build: 6** (Stats, Feature Grid, Testimonials, FAQ, Services Showcase, Service Areas). Media+Text is optional.

---

## 4. Relationship Diagram

```
                         ┌─────────────────────┐
                         │   GLOBAL: Company    │  phone, email, address(es),
                         │   Info (Options Page)│  hours, social, portal URL, logo
                         └──────────┬───────────┘
                                    │ read by
        ┌───────────────────────────┼───────────────────────────┐
        ▼                            ▼                            ▼
  GLOBAL: Header              GLOBAL: Footer               Every Page/Collection
  (promo bar, nested nav,     (4 link columns,             (CTA blocks, contact info)
   CTA, portal link)           contact block, social)

  COLLECTIONS
  ───────────
   Services ◄───────────── servicesOffered (hasMany) ─────────── Locations
      ▲  ▲                                                          ▲  ▲
      │  │ relatedFaqs (hasMany)                  relatedFaqs ──────┘  │
      │  └──────────────► FAQs ◄────── relatedLocation ──────────────┘
      │                    ▲
      │ service (rel)      │ relatedService (rel)
      │                    │
   Testimonials ───── location (rel) ─────► Locations
      ▲
      │ (reverse-referenced by blocks)
      │
   Posts ──── categories (hasMany) ────► Categories
   (all uploads) ──────────────────────► Media

  BLOCKS THAT QUERY COLLECTIONS
  ─────────────────────────────
   Archive            ─► Posts
   Services Showcase  ─► Services
   Service Areas      ─► Locations
   Testimonials block ─► Testimonials (optionally filtered by Location/Service)
   FAQ block          ─► FAQs (optionally filtered by Topic/Service/Location)
```

Read it like ACF Relationship fields: a **Service** owns a list of **FAQs**; a **Location** owns lists of **Services** and **FAQs**; **Testimonials** point at the Location/Service they belong to so blocks can filter them.

---

## 5. Homepage Build Plan (section by section)

| # | Section | Block | Data from collection? | Exists? | New? |
|---|---|---|---|---|---|
| 1 | Promo bar (phone CTA) | *Header Global* | — | extend | — |
| 2 | Hero (headline, bullets, rating) | *Hero field* | — | extend | — |
| 3 | Free Quote form | **Form** (`formBlock`) | Forms (form-builder) | ✅ | — |
| 4 | "What Our Customers Say" | **Testimonials** | Testimonials | ✗ | **NEW #3** |
| 5 | "Our Story" (text + truck + bullets) | **Media + Text** *(or Content + Media)* | — | optional | **NEW #7 (opt)** |
| 6 | Stats counters | **Stats Counter** | — | ✗ | **NEW #1** |
| 7 | Services overview (tabbed cards) | **Services Showcase** | Services | ✗ | **NEW #5** |
| 8 | Process steps (4 steps) | **Feature Grid** (steps mode) | — | ✗ | **NEW #2** |
| 9 | Why Choose Us (value cards) | **Feature Grid** (grid mode) | — | ✗ | reuse #2 |
| 10 | FAQ accordion | **FAQ** | FAQs | ✗ | **NEW #4** |
| 11 | Blog preview (3 latest) | **Archive** | Posts | ✅ | — |
| 12 | Service Areas strip | **Service Areas** | Locations | ✗ | **NEW #6** |
| 13 | Bottom Instant Estimate form | **Form** (`formBlock`) | Forms | ✅ | — |
| 14 | Footer | *Footer Global* | reads Company Info | extend | — |

The homepage becomes a `home` **Page** whose `layout` stacks: Testimonials → (Media+Text) → Stats → Services Showcase → Feature Grid(steps) → Feature Grid(cards) → FAQ → Archive → Service Areas → Form. (Hero + promo + footer come from the Hero field and Globals.)

---

## 6. Recommended Build Order

Build the **data layer first, presentation second** — the WP lesson of "register your CPTs and Options before you build templates."

**Phase 1 — Foundations (data & site-wide)**
1. **Company Info Global** (phone/address/hours/social/portal/logo) — unblocks every CTA and the footer.
2. Extend **Header** (promo bar, nested nav for Services/Locations submenus, CTA, portal link).
3. Extend **Footer** (4 columns + contact block reading Company Info + social).
4. Migrate **Services** & **Locations** SEO to the `meta` group (decision #2) and add their new fields.

**Phase 2 — New collections**
5. **Testimonials** collection (+ seed a few).
6. **FAQs** collection (+ seed the ~10 questions).

**Phase 3 — New blocks** (each: config + component + register in `RenderBlocks` + add to Pages `layout`)
7. **Stats Counter**
8. **Feature Grid** (grid + steps modes)
9. **Testimonials** block
10. **FAQ** block
11. **Services Showcase** block
12. **Service Areas** block
13. *(optional)* **Media + Text** block
14. Remove **Code** block from Posts rich text.

**Phase 4 — Hero & forms**
15. Extend **Hero** (bullets + rating badge).
16. Build the two **Forms** in form-builder (Free Quote, Instant Estimate); confirm Form block renders them.

**Phase 5 — Assemble pages**
17. **Home** page (stack the blocks per §5).
18. **About**, **Contact**, **Testimonials**, **FAQs**, **Privacy**, **Terms**, **Local Links** pages.
19. Populate **Services** (Termite, Mosquito, General) and **Locations** (5 areas) content.

**Phase 6 — Polish**
20. **Redirects** for flat reference URLs (`/termite-control` → `/services/termite-control`, `/contact-rogue` → `/contact`).
21. Wire **Search** (plugin installed) and confirm sitemaps include Services/Locations.
22. QA: live preview, draft/publish, mobile nav, form submissions.

---

## Summary of what gets created vs reused

- **New collections (2):** Testimonials, FAQs
- **Extend collections (2):** Services, Locations (fields + SEO)
- **New global (1):** Company Info · **Extend globals (2):** Header, Footer
- **New blocks (6, +1 optional):** Stats, Feature Grid, Testimonials, FAQ, Services Showcase, Service Areas (+ Media+Text optional)
- **Reused blocks (6):** Content, CTA, Media, Archive, Form, Banner
- **Removed (1):** Code block
- **Reused plugins (5):** form-builder, redirects, SEO, nested-docs, search
