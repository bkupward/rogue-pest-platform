# PARITY-SCORECARD.md

> Scale: **100%** identical · **90%** nearly identical · **75%** similar, noticeable diffs · **50%** major diffs · **25%** missing.
> Two scores per section: **Now** (with current live content) and **Styling ceiling** (what the built styling would reach once content is populated). The gap between them = content work, not code.

## Homepage

| Section | Now | Styling ceiling | Issues to verify | Screenshots |
|---|---|---|---|---|
| Header | 50% | 90% | sticky ✓; missing phone/CTA/promo/nav (globals empty); dropdowns work | HP-header (1440 sticky + dropdown), 390 menu |
| Hero | 50% | 85% | no bg image; overlay/headline/bullets/badge styled; flush ✓ | HP-hero ATF ×3 |
| Trust indicators | 75% | 90% | check icons + pill present; spacing/iconography vs ref | within HP-hero |
| Stats | 75% | 90% | seeded numerals render; verify band edge-to-edge, no count-up | HP-stats ×3 |
| Services | 50% | 80% | cards styled; 2/3 missing images; ref uses **tabs** not cards | HP-services ×3 |
| Process/Features | 25% | 80% | empty (no items); when filled: numbered badges, no connector line | HP-process ×3 |
| Testimonials | 25% | 85% | empty (0); when filled: star cards on band; ref single-quote layout | HP-testimonials ×3 |
| FAQ | 25% | 88% | empty (0); accordion styling solid | HP-faq + expanded |
| Service Areas | 60% | 85% | 5 cards render; no images; no marquee strip | HP-areas ×3 |
| Blog | 25% | 85% | empty (0 posts) | HP-blog ×3 |
| CTA | 70% | 85% | renders, red button; exact card style vs ref | HP-cta |
| Footer | 55% | 85% | dark band + Services/Areas cols ✓; Company/contact/CTA empty (globals) | HP-footer ×3 |

**Homepage overall: ~45% now · ~85% styling ceiling.**

## Service pages

| Page | Now | Ceiling | Issues | Screenshots |
|---|---|---|---|---|
| Archive `/services` | 70% | 85% | 3 cards; 2 missing images; grid/hover | SVC-archive ×3 |
| Detail (termite, has image) | 75% | 85% | header band + framed image + content; no feature bullets/Sentricon | SVC-detail ×3 |
| Detail (no image) | 60% | 80% | header band only, no image | SVC-detail-noimg 1440 |

## Location pages

| Page | Now | Ceiling | Issues | Screenshots |
|---|---|---|---|---|
| Archive `/locations` | 60% | 85% | 5 cards, **no images**; grid/hover | LOC-archive ×3 |
| Detail `/locations/huntsville` | 55% | 80% | header band + content; no image; no address/hours/services | LOC-detail ×3 |

## Blog pages

| Page | Now | Ceiling | Issues | Screenshots |
|---|---|---|---|---|
| Archive `/posts` | 25% | 85% | empty (0 posts) | BLOG-archive ×3 |
| Post `/posts/[slug]` | 25% | 85% | none to view | BLOG-post ×3 |

## Contact page

| Page | Now | Ceiling | Issues | Screenshots |
|---|---|---|---|---|
| `/contact` | 25% | n/a | **404 — page not created** | CONTACT ×3 (after creation) |

## Global / responsive

| Item | Now | Ceiling | Issues | Screenshots |
|---|---|---|---|---|
| Brand color system | 90% | 95% | red `#BE1E2D` + text `#2F2C2B` applied; confirm small-text contrast | any page |
| Typography | 80% | 90% | heading scale fixed; brand font unconfirmed | any page |
| Mobile (390) | 70% | 88% | hamburger panel; footer stacks; verify no overflow | mobile set |
| Tablet (768) | 70% | 88% | hamburger at 768; 2-up grids | tablet set |

## Summary
- **Biggest lever is content, not code:** most "Now" scores are dragged down by empty Testimonials/FAQs/Posts/Forms, missing images, and unconfigured globals — the styling ceilings are 80–90%.
- **True styling gaps** (won't improve with content): Services tabs vs cards, Our Story side-by-side, process connector line, marquee strip, count-up animation, single-quote testimonial layout, brand font.
