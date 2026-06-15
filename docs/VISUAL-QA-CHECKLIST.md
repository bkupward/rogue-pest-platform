# VISUAL-QA-CHECKLIST.md — Section-by-Section Comparison

> Compare each item against https://roguepest.savagestrategic.io/ at **1440 / 768 / 390**.
> Tags: **[content]** = blocked by missing content (see CONTENT-READINESS.md) · **[style]** = styling/layout to verify.

## Homepage `/` (currently the `homeStatic` scaffold)

### Header
- [ ] [style] Sticky on scroll, stays above content.
- [ ] [style] Logo present + correct (not placeholder).
- [ ] [content] Phone + CTA button show (need CompanyInfo).
- [ ] [content] Promo bar shows with message (need Header global + enable).
- [ ] [style] Services/Locations dropdowns open on hover (these have data: 3 services, 5 locations).
- [ ] [content] Primary nav links (need Header navItems).

### Hero
- [ ] [content] Background image (none set → flat overlay only).
- [ ] [style] Headline scale, intro, overlay legibility.
- [ ] [style] Hero sits flush under header (spacing fix applied).
- [ ] [style] CTA buttons: red fill + outline.

### Trust indicators
- [ ] [style] Check-icon bullets row (Experienced Team / Clear Communication / Result Guarantee).
- [ ] [style] Rating badge pill (Facebook 5.0).

### Stats
- [ ] [style] 4 large red numerals + labels (1500+, 20+, 98%, 5.0) — these are seeded in `homeStatic`.
- [ ] [style] Band is edge-to-edge with neighbors (post spacing fix).

### Services
- [ ] [style] 3 image cards, "Learn More", section button.
- [ ] [content] 2 of 3 cards have no image (general, mosquito) → empty image slot.

### Process / Features
- [ ] [content] Process steps empty (Feature Grid `items` empty in scaffold).
- [ ] [content] Why Choose Us value cards empty.
- [ ] [style] When populated: numbered red badges (steps) / value cards (grid).

### Testimonials
- [ ] [content] Empty (0 testimonials) → heading only.
- [ ] [style] When populated: star rows + quote cards on tinted band.

### FAQ
- [ ] [content] Empty (0 FAQs) → heading only.
- [ ] [style] When populated: accordion, `+`→`×`, expand/collapse.

### Service Areas
- [ ] [style] 5 location cards (data exists).
- [ ] [content] No location images → empty image slots.

### Blog section
- [ ] [content] Empty (0 posts) → empty grid.

### CTA
- [ ] [style] CTA block renders (brand-red button) — seeded with heading.

### Footer
- [ ] [style] Dark brand band, multi-column.
- [ ] [style] Services + Service Areas columns populate from collections (data exists).
- [ ] [content] Company column empty (no Footer navItems); contact block empty (no CompanyInfo); CTA strip absent.
- [ ] [style] Bottom bar shows fallback "Rogue Pest Solutions © <year>".

## Service pages
- **Archive `/services`** — [style] heading + 3 cards; [content] 2 missing images.
- **Detail `/services/termite-control`** — [style] header band + framed image (has image) + content. Best-case detail page to QA.
- **Detail `/services/general-pest-control`** — [content] no featured image (header band only).

## Location pages
- **Archive `/locations`** — [style] heading + 5 cards; [content] no images.
- **Detail `/locations/huntsville`** (etc.) — [style] header band + content; [content] no hero image.

## Blog pages
- **Archive `/posts`** — [content] empty (0 posts).
- **Post `/posts/[slug]`** — [content] none to view.

## Contact page
- **`/contact`** — [content] **404 — page does not exist.** Create a Page first.

## Responsive (each page × 1440/768/390)
- [ ] 1440: full nav + hover dropdowns, multi-column grids.
- [ ] 768: **hamburger** appears (nav breakpoint is `lg`=1024); grids 2-up.
- [ ] 390: single column, mobile panel (nav + Services/Locations groups + phone/CTA), footer stacks, no horizontal scroll.
