# DESIGN-TOKENS.md — Proposed Reusable Design System

> Anchored to the project's **existing** token system (shadcn/ui CSS variables in
> `src/app/(frontend)/globals.css` + `tailwind.config.mjs`). The strategy is to
> **override existing tokens with brand values**, not introduce a parallel system —
> so every block, page (homepage, services, locations, blog, about, contact) inherits
> the brand automatically.
>
> **✅ Confirmed brand colors:** accent/primary **red `#BE1E2D`** → `oklch(51.8% 0.192 23.4deg)`;
> body text **`#2F2C2B`** → `oklch(29.6% 0.005 39.4deg)`. Dark-mode primary uses a brighter red
> `oklch(62% 0.19 23.4deg)`. Fonts remain Geist unless a brand font is confirmed. Existing tokens use `oklch()`.

## 1. Colors — map onto existing CSS variables

These variables already exist in `:root` (and a `[data-theme='dark']` block). Re-skin them:

| Token (existing var) | Current | Proposed brand role _(confirm)_ |
|---|---|---|
| `--primary` | near-black | **Brand red `#BE1E2D`** (CTA fills, links, accents) |
| `--primary-foreground` | near-white | White text on red |
| `--background` | white | Keep white (light sections) |
| `--foreground` | near-black | Keep dark text |
| `--card` | light gray | White / very light (cards, alt bands) |
| `--secondary` | light gray | Subtle tinted band (alt sections) |
| `--muted` / `--muted-foreground` | gray | Keep (captions, eyebrows) |
| `--accent` | light gray | Light green tint (hover, highlights) |
| `--border` | light gray | Keep / slight green-gray |
| `--ring` | gray | Brand green (focus rings) |
| _Footer band_ | `bg-black` (in Footer) | **Dark green / near-black** brand dark |
| `--success` / `--warning` / `--error` | (in use) | Keep semantic |

**Confirmed brand palette:**
- Primary red `#BE1E2D` → `oklch(51.8% 0.192 23.4deg)` (CTAs, links, accents). White text on red.
- Body text `#2F2C2B` → `oklch(29.6% 0.005 39.4deg)` (`--foreground`, card/popover text).
- Dark brand (footer): warm charcoal `oklch(29.6% 0.005 39.4deg)` (light) / deeper in dark mode.
- Light tints: pale red for alternating bands/hover (`--accent`, `--secondary`).
- Keep neutrals (white/gray) for surfaces.

> Action: replace the oklch values of `--primary`, `--primary-foreground`, `--ring`, `--accent`, and the footer dark in **one file** (`globals.css`) — propagates everywhere.

## 2. Typography scale

- **Current:** Geist Sans (`--font-sans`) body+headings, Geist Mono (`--font-mono`). Prose sizes: H1 2.5rem→3.5rem (md), H2 1.25rem→1.5rem/600 (`tailwind.config.mjs`).
- **Proposed _(confirm brand fonts)_:** if the reference uses a distinct display/heading font, register it via `next/font` and point `--font-sans` (or add `--font-heading`) at it; otherwise keep Geist.
- **Scale (proposed):**
  - Display / Hero H1: 3–4rem desktop, ~2.25rem mobile, weight 700.
  - Section H2: 2–2.5rem, weight 700.
  - Card/sub H3: 1.25–1.5rem, weight 600.
  - Body: 1rem / 1.125rem, weight 400, relaxed line-height.
  - Eyebrow/overline: 0.875rem, uppercase, letter-spacing, muted.
- **Note:** `@layer base` resets `h1–h6` to `unset`; drive sizes via prose/utility classes or extend the typography plugin in `tailwind.config.mjs`.

## 3. Spacing scale

- **Container side padding:** 1rem mobile / 2rem ≥md (already in `.container`). Keep.
- **Section vertical rhythm (proposed):** `py-16` mobile → `py-24` desktop for major sections (our blocks currently use `my-16` — standardize on section `py` band wrappers).
- **Card padding:** `p-6` → `p-8`.
- **Grid gaps:** `gap-6`/`gap-8`.
- **Heading group:** eyebrow → `mb-2`, heading → `mb-4`, subheading → `mb-8`.

## 4. Container widths

Already defined as breakpoints (reuse, no change):
`sm 40rem · md 48rem · lg 64rem · xl 80rem · 2xl 86rem`.
- Content max for text blocks: ~48rem (matches existing `max-w-[48rem]` usage).
- Section content: `.container` (≤86rem).

## 5. Button variants

Built on `src/components/ui/button.tsx` (shadcn) + `CMSLink` appearances (`default`/`outline` already exist):
- **Primary** — filled brand green, white text, rounded (`--radius`), medium weight, hover darken.
- **Outline** — transparent, brand/white border, brand text; used on dark hero (white border/text).
- **Link** — text-only brand link with underline-on-hover (nav, "Learn More").
- **Phone** — emphasized link/button showing the number (icon + number); reused in header/CTAs/footer.
- **Sizes:** `sm` (nav), default, `lg` (hero/section CTAs, full-width on mobile forms).

> The block configs already expose link `appearance: 'default' | 'outline'` — map these to the primary/outline variants; no schema change.

## 6. Card variants

Standardize on `--radius` (0.625rem) + soft shadow + `bg-card`/white:
- **Service/Area card:** rounded image top (`object-cover`, fixed aspect), padded body, soft shadow, hover lift; "Learn More".
- **Blog card:** same shape (`src/components/Card/index.tsx` is the canonical one — style once, reused by Archive + RelatedPosts).
- **Testimonial card:** rounded, padded, soft shadow, star row, italic quote.
- **Value/feature card (FeatureGrid grid):** icon top, title, text; lighter/borderless or subtle border.
- **Step card (FeatureGrid steps):** numbered badge circle (brand fill), title, text, connector line on desktop.
- **Form card:** white, rounded, larger shadow, padded.

## 7. Section patterns (reusable wrappers)

- **Band:** full-width background (white / light-tint / brand / dark) + centered `.container` + section `py`.
- **Heading group:** optional eyebrow + H2 + subheading, centered or left.
- **Alternation:** white → light-tint → white … ; dark footer; occasional brand band (stats / bottom form).
- **Media treatment:** rounded corners + soft shadow for inline images; full-bleed `object-cover` + dark gradient overlay for hero backgrounds.

## 8. Where these tokens apply (reuse surface)

One token pass cascades to all routes built this project:
- **Homepage** (`homeStatic` / future `home` Page) — every block.
- **Services** (`/services`, `/services/[slug]`).
- **Locations** (`/locations`, `/locations/[slug]`).
- **Blog** (`/posts`, `/posts/[slug]`) — via `Card` + `RichText`.
- **About / Contact** (Pages) — via the same blocks.

## Implementation note
- **Single highest-leverage change:** edit `globals.css` color variables + (optionally) heading scale in `tailwind.config.mjs`. Do this before any per-component styling — it does ~50% of the parity work globally.
- **Respect dark mode:** update both `:root` and `[data-theme='dark']` blocks; test the header-theme provider (hero forces dark).
- **No schema/blocks/fields touched** — purely the presentation layer.
