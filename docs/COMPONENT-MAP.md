# COMPONENT-MAP.md — Reference Section → Existing Implementation

> Every reference homepage section mapped to the block/component already in this project.
> No new blocks/collections/fields — this is a re-skin of existing code.

| # | Reference section | Our implementation (file) | Exists? | Styling change | Layout change | Needs presentation variant? |
|---|---|---|---|---|---|---|
| 1 | Header | `src/Header/Component.tsx` + `Component.client.tsx` + `Nav/index.tsx` | ✅ | Yes (sticky, colors, dropdowns) | Yes (mobile menu, submenus) | Submenu/dropdown support (nav is flat today) |
| 2 | Promo bar | `src/Header/Component.tsx` (promo bar markup) | ✅ | Yes (brand fill) | Minor | No |
| 3 | Hero | `src/heros/HighImpact/index.tsx` | ✅ | Yes (overlay, type scale, badge/bullets styling) | Minor | No (uses Phase-4 fields) |
| 4 | Quote form | `src/blocks/Form/Component.tsx` (`formBlock`) | ✅ | Yes (card panel, inputs, button) | Maybe (2-col) | No |
| 5 | Testimonials | `src/blocks/Testimonials/Component.tsx` | ✅ | Yes (quote cards, stars) | Maybe (carousel) | Optional carousel variant (defer) |
| 6 | Our Story (text) | `src/blocks/Content/Component.tsx` | ✅ | Yes (typography) | **Yes** (side-by-side) | See note ▼ |
| 6 | Our Story (image) | `src/blocks/MediaBlock/Component.tsx` | ✅ | Yes (rounded/shadow) | Part of side-by-side | — |
| 6 | Our Story (values) | `src/blocks/FeatureGrid/Component.tsx` (grid) | ✅ | Yes (icon list) | Maybe | No |
| 7 | Stats | `src/blocks/Stats/Component.tsx` | ✅ | Yes (large numerals) | No | No |
| 8 | Services | `src/blocks/ServicesShowcase/Component.tsx` | ✅ | Yes (cards) | Maybe (tabs) | **Optional tabs variant** (cards acceptable) |
| 9 | Process steps | `src/blocks/FeatureGrid/Component.tsx` (steps) | ✅ | Yes (numbered badges, connector) | Yes (horizontal steps) | No (layout toggle already exists) |
| 10 | Why Choose Us | `FeatureGrid` (grid) + `Content` + `MediaBlock` + `cta` | ✅ | Yes (value cards) | Maybe | No |
| 11 | FAQ | `src/blocks/FAQ/Component.tsx` | ✅ | Yes (accordion styling) | Minor | No (native `<details>` today) |
| 12 | Blog | `src/blocks/ArchiveBlock/Component.tsx` + `src/components/Card/index.tsx` | ✅ | Yes (cards, hover) | No | No |
| 13 | Service Areas | `src/blocks/ServiceAreas/Component.tsx` | ✅ | Yes (link cards / marquee) | Maybe (marquee strip) | Optional marquee (decorative, defer) |
| 14 | Bottom form | `src/blocks/Form/Component.tsx` (`formBlock`) | ✅ | Yes (branded band) | Maybe | No |
| 15 | Footer | `src/Footer/Component.tsx` | ✅ | Yes (columns, dark) | **Yes** (4 columns + contact) | No |

## Shared/foundation components touched by the re-skin
- **Buttons:** `src/components/ui/button.tsx` (shadcn variants) + `src/components/Link.tsx` (`CMSLink`).
- **Cards:** `src/components/Card/index.tsx` (blog/archive cards).
- **Media:** `src/components/Media/*` (image treatment — rounding/shadows).
- **Rich text:** `src/components/RichText/index.tsx` (prose typography).
- **Tokens:** `src/app/(frontend)/globals.css` + `tailwind.config.mjs` (the single highest-leverage file — see `DESIGN-TOKENS.md`).

## Key findings
- **Everything maps to an existing block — zero new blocks required.** ✅
- **Three sections need real layout work, not just color:**
  1. **Our Story** — side-by-side text/image. Today it's 3 stacked blocks (Content + Media + FeatureGrid). Options: (a) CSS-only via the Content block's column system + adjacent Media, or (b) a small presentation enhancement. **Recommend CSS-first**; only consider a `mediaText` variant if CSS can't achieve it — but that would be a new block, which is out of scope, so **CSS-first is mandatory here.**
  2. **Footer** — expand from single-row nav to 4 columns + contact block (data already available from CompanyInfo/Footer global).
  3. **Header** — sticky behavior + Services/Locations dropdowns (nav is currently flat, max 6 links).
- **Optional variants explicitly deferred** (cards are acceptable interim): Services **tabs**, Testimonials **carousel**, Service Areas **marquee**. None are required for parity-of-content; they're presentation polish and would risk scope creep.
- **Process steps** already supports horizontal "steps" mode via the FeatureGrid `layout` field — only styling (numbered badges + connector line) is needed.
