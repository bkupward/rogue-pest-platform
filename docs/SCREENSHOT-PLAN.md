# SCREENSHOT-PLAN.md — Capture List for Reference Comparison

> Capture **implementation + reference** for each, at **Desktop 1440 · Tablet 768 · Mobile 390**.
> Naming: `<PAGE>-<width>.png` (impl) and `<PAGE>-<width>-REF.png` (reference).
> ⚠️ Several pages are content-blocked today (see CONTENT-READINESS.md) — capture those *after* seeding.

## Pages (each × 1440 / 768 / 390 = 24 impl shots)

| ID | Page | Route | Ready now? |
|---|---|---|---|
| HP | Homepage (full-page) | `/` | partial (scaffold; empty sections) |
| SVC-A | Services archive | `/services` | ✅ (2/3 images missing) |
| SVC-D | Service detail | `/services/termite-control` | ✅ (has image) |
| LOC-A | Locations archive | `/locations` | ✅ (no images) |
| LOC-D | Location detail | `/locations/huntsville` | ✅ (no image) |
| BLOG-A | Blog archive | `/posts` | ❌ empty — after posts |
| BLOG-P | Blog post | `/posts/[slug]` | ❌ none — after posts |
| CONTACT | Contact page | `/contact` | ❌ 404 — after page created |

> Homepage: capture **full-page** (long scroll) **and** above-the-fold separately at each width.

## Required state captures

| ID | State | How | Widths |
|---|---|---|---|
| ST-1 | Header **sticky/scrolled** | scroll homepage ~600px | 1440, 390 |
| ST-2 | Header **dropdown open** | hover "Services" (and "Locations") | 1440 |
| ST-3 | **Mobile menu open** | tap hamburger | 390 (and 768) |
| ST-4 | **FAQ expanded** | open an accordion item | 1440 (needs FAQ content) |
| ST-5 | **Footer visible** | scroll to bottom | 1440, 390 |
| ST-6 | **Light vs dark theme** | toggle ThemeSelector (footer) | 1440 homepage ATF |

## Section close-ups (homepage, 1440 — for fine parity)
- HP-hero, HP-stats, HP-services, HP-process, HP-testimonials, HP-faq, HP-areas, HP-blog, HP-cta, HP-footer.
(Capture matching reference crops for each.)

## Capture settings
- Disable animations / wait for images to load.
- Full-page shots for HP, archives, detail pages; viewport shots for ATF + state captures.
- Same browser zoom (100%), same DPR for impl and reference.
- Light theme as default unless the ST-6 dark pair.

## Suggested order
1. Seed minimum content (globals, ≥3 testimonials/FAQs/posts, images) — see CONTENT-READINESS.
2. Capture the **ready-now** pages (SVC-A, SVC-D, LOC-A, LOC-D) immediately for early parity signal.
3. Capture HP + states after content + the real `home` Page exist.
4. Capture BLOG + CONTACT after their content/pages exist.

## Total
- 8 pages × 3 widths = **24** + homepage ATF×3 = 27 + ~6 state captures + ~10 section close-ups ≈ **~43 implementation shots** (plus matching reference shots).
