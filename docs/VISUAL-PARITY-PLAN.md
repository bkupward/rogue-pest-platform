# VISUAL-PARITY-PLAN.md — Section-by-Section Implementation Plan

> How to bring each section to visual parity with the reference, using existing blocks only.
> Change types: **[S] styling only · [L] layout only · [E] small component enhancement.**
> No schema/block/collection changes.

## Phase ordering (recommended)
1. **Design tokens first** (`globals.css` + `tailwind.config.mjs`) — re-skin brand colors, radius, fonts. This alone moves every section closer with zero per-component work.
2. **Foundation components** (Button, Card, Media, RichText/prose).
3. **Globals** (Header, Promo bar, Footer).
4. **Hero.**
5. **Block components** top-to-bottom.

---

## 0. Design tokens — [S]
- **Current:** neutral shadcn palette (`--primary` near-black, white bg, `--radius` 0.625rem), Geist fonts.
- **Target:** brand green primary, dark footer, confirmed brand fonts, consistent radius/shadows.
- **Files:** `src/app/(frontend)/globals.css`, `tailwind.config.mjs`.
- **Type:** [S]. Highest leverage — do first.

## 1. Header — [S][L][E]
- **Current:** logo + flat nav + search icon; not sticky; no dropdowns.
- **Target:** sticky header, brand styling, Services/Locations dropdowns, prominent CTA + portal link.
- **Files:** `src/Header/Component.client.tsx`, `src/Header/Nav/index.tsx`, `src/Header/Component.tsx`.
- **Type:** [S] colors/sticky; [L] mobile menu; [E] dropdown rendering (nav data is flat today — submenus would be a presentation grouping, **no schema change**; if true nested data is required later that's a separate scoped task).

## 2. Promo bar — [S]
- **Current:** functional bar (Phase 1B), minimal classes, gated by `promoBar.enabled`.
- **Target:** brand-fill bar, centered, small medium-weight text.
- **Files:** `src/Header/Component.tsx`.
- **Type:** [S].

## 3. Hero — [S]
- **Current:** HighImpact renders richText + links + bullets + badge + bg image; minimal classes.
- **Target:** dark gradient overlay, large H1 scale, styled trust bullets (check icons) and rating badge pill, primary/outline buttons.
- **Files:** `src/heros/HighImpact/index.tsx` (+ `MediumImpact` for parity).
- **Type:** [S]. (Fields already exist from Phase 4.)

## 4. Quote form — [S][L]
- **Current:** template form block renders fields + submit.
- **Target:** white rounded card with shadow, styled inputs, full-width brand submit, optional 2-column field grid.
- **Files:** `src/blocks/Form/Component.tsx`, field components in `src/blocks/Form/*`, `src/components/ui/button.tsx`.
- **Type:** [S] inputs/button; [L] optional column grid.

## 5. Testimonials — [S]
- **Current:** `<blockquote>` cards in a 3-col grid, ★ string.
- **Target:** rounded shadowed quote cards, styled star row, bold attribution.
- **Files:** `src/blocks/Testimonials/Component.tsx`.
- **Type:** [S]. (Carousel variant deferred.)

## 6. Our Story — [L][S]
- **Current:** three stacked blocks (Content, Media, FeatureGrid) render vertically.
- **Target:** two-column text-beside-image with a value-bullet list.
- **Files:** `src/blocks/Content/Component.tsx` (column widths), `src/blocks/MediaBlock/Component.tsx` (rounding/shadow), `src/blocks/FeatureGrid/Component.tsx` (icon list).
- **Type:** [L] primarily — achieve side-by-side with the Content block's existing column sizing + adjacent Media using grid/responsive classes. **CSS-first; no new block.**

## 7. Stats — [S]
- **Current:** 2/4-col grid, bold value, small label.
- **Target:** large display numerals, optional tinted/brand band, centered.
- **Files:** `src/blocks/Stats/Component.tsx` (+ optional band wrapper).
- **Type:** [S].

## 8. Services — [S] (+ optional [E])
- **Current:** card grid (image + title + excerpt + link).
- **Target:** styled service cards (rounded image, padded body, shadow, "Learn More" button).
- **Files:** `src/blocks/ServicesShowcase/Component.tsx`, `src/components/Media`, button.
- **Type:** [S]. **Tabs are an optional [E]** later; **cards are acceptable for parity now.**

## 9. Process steps — [S]
- **Current:** FeatureGrid steps mode renders number + title + text in a grid.
- **Target:** numbered badge circles, connector line (desktop), centered step cards.
- **Files:** `src/blocks/FeatureGrid/Component.tsx` (steps branch).
- **Type:** [S]. (Layout toggle already exists.)

## 10. Why Choose Us — [S]
- **Current:** FeatureGrid grid + Content + Media + CTA.
- **Target:** value cards (icon + title + text), intro paragraph, aerial image, CTA row.
- **Files:** `src/blocks/FeatureGrid/Component.tsx`, `Content`, `MediaBlock`, `src/blocks/CallToAction/Component.tsx`.
- **Type:** [S].

## 11. FAQ — [S][E]
- **Current:** native `<details>/<summary>` list, RichText answers.
- **Target:** styled accordion (borders, chevron, hover, spacing).
- **Files:** `src/blocks/FAQ/Component.tsx`.
- **Type:** [S] (style the native `<details>`). [E] only if animated chevron/transition needs a tiny client wrapper — prefer CSS to avoid a client component.

## 12. Blog — [S]
- **Current:** Archive → `Card` grid.
- **Target:** rounded image-top cards, date, title, excerpt, "Read More", hover lift.
- **Files:** `src/components/Card/index.tsx`, `src/blocks/ArchiveBlock/Component.tsx`.
- **Type:** [S].

## 13. Service Areas — [S]
- **Current:** location card grid.
- **Target:** styled area cards/links (+ optional decorative marquee strip).
- **Files:** `src/blocks/ServiceAreas/Component.tsx`.
- **Type:** [S]. (Marquee deferred/optional.)

## 14. Bottom form — [S]
- **Current:** template form block.
- **Target:** branded band with white card form.
- **Files:** `src/blocks/Form/Component.tsx` (+ band wrapper).
- **Type:** [S].

## 15. Footer — [L][S]
- **Current:** single row (logo + nav + theme) + contact block (Phase 1B).
- **Target:** dark footer, 4 link columns + contact block + social row + copyright.
- **Files:** `src/Footer/Component.tsx`.
- **Type:** [L] columns; [S] dark theme/spacing. (Footer nav data already in the Footer global; CompanyInfo supplies contact.)

---

## Summary by change type
- **Styling-only [S]:** tokens, promo bar, hero, testimonials, stats, services, process, why-choose-us, blog, service areas, bottom form. (the majority)
- **Layout [L]:** Our Story (side-by-side), Footer (columns), Header (mobile menu), Quote form (optional 2-col).
- **Small enhancement [E]:** Header dropdowns; optionally FAQ accordion animation. **All achievable without schema/block changes.**

## Risk notes
- **Dark/light theming:** the project has a `[data-theme='dark']` system and a header theme provider. Re-skinning must respect both modes; test light + dark.
- **`@layer base` resets h1–h6** to `unset` size/weight — heading sizes come from prose/utility classes, so set heading scale via tokens/utilities, not bare tags.
- **No new blocks:** Our Story side-by-side must be CSS-only; if it genuinely can't be done without a `mediaText` block, escalate as a separate scoped decision rather than silently adding a block.
