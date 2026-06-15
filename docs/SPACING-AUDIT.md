# SPACING-AUDIT.md — Shared Wrapper Audit for Full-Width Banded Layouts

> Goal: identify shared wrappers that block Rogue-Pest-style edge-to-edge colored sections, and propose the **safest backward-compatible** fix. No implementation here.

## Shared wrappers in the render path

A homepage block currently renders through this nesting:

```
app/(frontend)/[slug]/page.tsx   →  <article className="pt-16 pb-24">      ← page wrapper
  RenderHero (full-bleed <section>)
  RenderBlocks                    →  <div className="my-16">  (per block)   ← block wrapper
    <Block …>                     →  <section className="section-y …">      ← block self-spacing
        <div className="container"> … </div>                                ← content width
```

### Wrapper inventory

| Wrapper | Location | Effect | Verdict |
|---|---|---|---|
| `pt-16 pb-24` on `<article>` | `app/(frontend)/[slug]/page.tsx` | 4rem **above the hero**, 6rem at page end | ⚠️ Blocks hero sitting flush under the sticky header |
| **`my-16` per block** | `RenderBlocks.tsx` | 4rem vertical **margin around every block** | ❌ **Primary blocker** — inserts white gaps around colored bands; prevents adjacent band transitions |
| `.container` inside each block | every block | constrains content width; **band bg is on the outer `<section>`, so bands are already full-width horizontally** | ✅ Correct — keep |
| `section-y` (`py-16 md:py-24`) | the 6 restyled blocks | block-owned vertical rhythm | ✅ Correct — but **doubles** with the `my-16` wrapper |
| internal `my-16` | Content, Archive blocks | self-margin | ✅ self-spacing (also doubles with wrapper) |
| *(no vertical spacing)* | CTA, MediaBlock, Form blocks | rely entirely on the `my-16` wrapper for separation | ⚠️ These **depend** on the wrapper |

## What prevents full-width banded layouts

1. **`my-16` on the RenderBlocks wrapper (the main issue).** Colored bands (`Stats`, `Testimonials` use `bg-secondary`) are painted on the block's own full-width `<section>`, so they already span horizontally. But the wrapper's vertical **margin** sits *outside* the band, so each band is separated from its neighbor by 4rem of page background — they can never butt up against each other. Reference design has bands transition directly (white → tinted → white with no gaps).
2. **Double spacing.** Self-spacing blocks (`section-y`, or internal `my-16`) **plus** the wrapper `my-16` = excessive whitespace between transparent blocks.
3. **`pt-16` on the page `<article>`** pushes the full-bleed hero down, leaving a gap between the sticky header and the hero (reference hero is flush).

## Safest backward-compatible approach (proposal — not yet implemented)

**Principle:** let each block own its vertical spacing; stop the shared wrapper from forcing margin onto blocks that already self-space, without removing spacing from blocks that still rely on it.

**Recommended: a "self-spacing" allow-list in `RenderBlocks`.**
- Maintain a set of blockTypes that manage their own vertical rhythm: `stats, testimonials, faq, featureGrid, servicesShowcase, serviceAreas, content, archive`.
- For those, render the wrapper **without** `my-16` (e.g. `<div key>` only) → bands become edge-to-edge.
- For the rest (`cta, mediaBlock, formBlock`), **keep `my-16`** → their spacing is unchanged.
- This is fully backward compatible: no block loses spacing; only the self-spacing ones stop being double-margined and can bleed.

Why this over alternatives:
- *Removing `my-16` entirely* would strip spacing from CTA/Media/Form (regressions) — rejected.
- *Adding `section-y` to CTA/Media/Form components* is risky: `MediaBlock` is **dual-use** (also rendered inline inside rich text via the RichText converter), so component-level spacing would wrongly pad inline media — rejected.
- The allow-list keeps the change in **one file** (`RenderBlocks.tsx`) and is reversible.

**Secondary: the page `<article>` top padding.**
- Change `pt-16 pb-24` → `pb-24` (drop the top padding) so a full-bleed hero sits flush under the header. Risk: pages whose first block is *not* a hero would start flush too — acceptable because the first block's own `section-y`/`my-16` provides its top spacing. Low risk; verify on a no-hero Page.

**Keep as-is:** `.container` inside blocks (content width), and the band background living on the outer `<section>` (already correct for full-bleed).

**Net:** one allow-list edit in `RenderBlocks.tsx` + one className tweak on the page `<article>` unlocks edge-to-edge banded layouts with zero schema/block changes and no spacing regressions. Sequencing/owner: implementation deferred to the next phase.
