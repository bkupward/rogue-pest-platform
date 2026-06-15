# PARITY-GAPS.md — Implementation vs Reference (user-visible only)

> Reference: https://roguepest.savagestrategic.io/
> Only **user-visible** gaps. CMS architecture excluded. Grouped by severity.

## 🔴 Critical gaps (block visual parity / pages look broken or empty)

1. **Colored bands are inset, not edge-to-edge.** The `my-16` block wrapper puts white gaps around `Stats`/`Testimonials` bands. Reference bands transition directly. (Fix scoped in SPACING-AUDIT.)
2. **Hero not flush under header.** `pt-16` on the page `<article>` leaves a gap between the sticky header and the full-bleed hero.
3. **Homepage forms missing.** The Free Quote (top) and Instant Estimate (bottom) forms — prominent in the reference — are omitted because `formBlock` needs a Forms record. Homepage looks incomplete without them.
4. **Homepage images missing.** Our Story and Why Choose Us images (Media blocks) omitted (need uploads); hero has no background image until one is set.
5. **Collection-driven sections render headings only** until content exists (Services, Locations, Testimonials, FAQs, Posts). Reviewer will see empty sections.
6. **Contact page does not exist.** `/contact` 404s — no Page created yet.
7. **Content blocks show heading only.** "Our Story" / "Why Choose Us" intros have no body copy in the scaffold.

## 🟠 Medium gaps (recognizable layout/feature differences)

1. **Services section is cards, not tabs.** Reference uses a tabbed switcher (General / Mosquito / Termite); we render a 3-card grid.
2. **Our Story is stacked, not side-by-side.** Reference pairs text beside an image; our Content + Media + Feature Grid stack vertically.
3. **No per-service feature bullets** on service cards/detail ("Elimination Process", "Detailed Inspections") and no Sentricon featured-solution block (data not modeled).
4. **Location detail lacks address/hours/services-offered** sections the reference shows.
5. **Process steps have no connector line** between the numbered badges (reference draws a line across).
6. **Testimonials layout differs.** Reference leans on a single large quote + imagery; we show a 3-up card grid.
7. **Header nav grouping differs.** Reference Services dropdown includes Residential/Commercial sub-entries and specific pest pages; ours lists Service records. Locations match closely.
8. **Stats are static** (no count-up animation; reference animates from 0).
9. **Service Areas decorative marquee strip** (scrolling area names) not implemented.

## 🟡 Polish items (fine-grained, do last)

1. **Brand font unconfirmed** — still Geist; reference may use a specific display/body font.
2. **Exact button shape/shadow/padding** vs reference (radius, weight, hover darkness).
3. **Rating-badge pill styling** (icon, spacing) approximate.
4. **Promo bar exact styling** (height, color, letter-spacing).
5. **Card shadow/border/radius** fine-tuning to match reference depth.
6. **Red-on-white small-text contrast** — `#BE1E2D` is borderline AA for small text; verify captions/links.
7. **Footer social icons** absent (no social-links data field).
8. **Image aspect ratios / cropping** consistency across cards.
9. **Section heading sizes/letter-spacing** vs reference display type (e.g. "WE STOP BUGS").
10. **Logo asset** — confirm the real Rogue Pest logo (not template placeholder) and its light/dark variants.

## Notes for the reviewer
- Items needing content (Critical 3–7) are **expected** at this stage — populate the minimum-viable content set first (see content audit), then re-QA.
- Medium gaps 1–2 are the highest-value layout changes for closer parity if you want them after the spacing fix.
- Nothing here requires schema/block/collection changes **except** the data-dependent gaps (per-service features, location address) already tracked as the Phase-6 P1/P2 schema work.
