# PRIORITIZED-GAPS.md — User-Visible Gaps, Prioritized

> Based on the live DB audit. **Critical** = prevents parity · **Medium** = noticeable but acceptable · **Polish** = minor.
> Each gap tagged **[content]** (resolved by entering data) or **[style]** (needs design/layout work in a later phase — not now).

## 🔴 Critical (prevents visual parity)

1. **[content] Homepage is the `homeStatic` scaffold, not a real Page.** Only DB page slug is `h` (typo), no `home` Page → homepage isn't editable and Form/Media blocks can't appear. Create a real `home` Page; fix/remove `h`.
2. **[content] No Contact page** → `/contact` 404s. Create the Page.
3. **[content] Globals unconfigured** (Header/Footer/CompanyInfo = 0 rows) → no phone, CTA, promo bar, header nav, footer Company column, footer contact block, footer CTA. Header/footer look half-empty.
4. **[content] Empty Testimonials / FAQs / Posts / Forms** → those homepage sections + blog render as bare headings or empty grids. Homepage forms entirely absent.
5. **[content] Missing imagery** → hero has no background; 2/3 services + all 5 locations have no images; available media are icons. Cards show empty image slots.
6. **[style] Services section uses cards, reference uses tabs.** Recognizable structural difference once content is in.
7. **[style] Our Story is stacked, not side-by-side** (text beside image in reference).

## 🟠 Medium (noticeable but acceptable)

1. **[style] Process steps have no connector line** between numbered badges.
2. **[style] Testimonials layout differs** (reference: single large quote + imagery; ours: 3-up card grid).
3. **[style] Service Areas decorative marquee strip** not implemented.
4. **[style] Stats are static** (no count-up animation).
5. **[content/style] Header nav grouping** — reference Services dropdown adds Residential/Commercial + pest pages; ours lists Service records (acceptable, data-driven).
6. **[content] Service/Location detail pages lack** per-service feature bullets, Sentricon solution, location address/hours/services-offered (data not modeled — out of scope this phase).

## 🟡 Polish (minor refinements)

1. **[style] Brand font unconfirmed** — still Geist; reference may use a specific face.
2. **[style] Button/card shadow, radius, padding** fine-tuning vs reference depth.
3. **[style] Red-on-white small-text contrast** — `#BE1E2D` borderline AA for captions/small links.
4. **[style] Rating-badge pill + promo-bar** exact styling.
5. **[content] Footer social icons** absent (no social-links data).
6. **[style] Image aspect-ratio/cropping** consistency across cards.
7. **[style] Display heading treatment** (e.g. "WE STOP BUGS") letter-spacing/size.
8. **[content] Logo asset** — confirm real Rogue Pest logo + light/dark variants (currently template logo).

## Reading the priorities
- **Most Critical items are [content]**, not code — they resolve by populating the DB and creating the `home`/`contact` Pages. The styling to display that content already exists.
- **The only Critical [style] gaps are Services-tabs and Our-Story-side-by-side** — the highest-value layout changes if you pursue closer parity after content is in.
- Medium/Polish are deferrable; none blocks a meaningful screenshot comparison once content + globals are entered.

## Recommended sequence (for the team)
1. Configure the 3 globals (CompanyInfo, Header, Footer).
2. Create real `home` + `contact` Pages; remove stray `h`.
3. Add images (hero, 2 services, 5 locations) + seed 6 testimonials / 10 FAQs / 3 posts / 2 forms.
4. Re-run the SCREENSHOT-PLAN and re-score with PARITY-SCORECARD.
5. Only then evaluate the Critical [style] gaps (Services tabs, Our Story side-by-side).
