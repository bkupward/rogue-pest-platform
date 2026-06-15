# Parity Refinement Report

Refinement pass comparing the static clone against the real WordPress/Elementor source
(`view-source_...html`) + provided assets. WordPress treated as source of truth.

## Extracted from the source (and applied)

| Property | Source value | Was in clone | Now |
|---|---|---|---|
| Heading font | **Prompt** (Google) | Poppins | ✅ Prompt |
| Body font | **Barlow** (Google) | Inter | ✅ Barlow |
| Brand red | `#be1e2d` | `#be1e2d` | ✅ unchanged |
| Dark band/text | `#1d1d1d` | `#2f2c2b`/`#211f1e` | ✅ `#1d1d1d` |
| Logo | `assets/logo.png` (284×83) | text logo | ✅ real logo (header + white-inverted footer) |
| Promo text | "Keep your backyard bite‑free all season - Call Now! 🔥" | paraphrase | ✅ verbatim |
| Stat labels | Homes & Businesses Protected / Inspections Completed / Treatments Administered / Five-Star Reviews | matched | ✅ confirmed |
| Blog titles | Essential Pest Prevention…, Importance of Regular Pest Maintenance…, Rodent-Free Alabama Home… | matched | ✅ confirmed |

## Fixes implemented

**Typography**
- Swapped Poppins/Inter → **Prompt** (headings) / **Barlow** (body) via Google Fonts + `--font-head`/`--font-body`.

**Color**
- Dark surfaces corrected to `#1d1d1d` (promo bar, marquee, footer).

**Real images wired in (replacing gradient placeholders)**
- Hero background → `hero-banner.jpg`
- Our Story → `our-story.webp`
- Services tabs → `service-general.jpg`, `service-mosquito.jpg`, `service-termite.jpg`
- Why Choose Us → `why-choose.webp`
- Stats → `truck.png` (decorative, bottom-right, hidden ≤1024px)
- Header + footer logo → `logo.png` (footer inverted to white via filter)

**Real SVG icons (replacing emoji/text)**
- Hero trust bullets → `bullet-experienced/communication/guarantee.svg` (white fill — correct on dark hero)
- Process steps → `step-request/review/schedule/enjoy.svg` (in white circles)
- Hero ratings → `icon-Google.svg`, `icon-facebook.svg`, `google-stars.svg`

**Content**
- Promo bar text set verbatim (incl. the 🔥).
- Slugged copies of space-named assets created (e.g. `General Pest Control Solutions .jpg` → `service-general.jpg`) so paths are robust; originals retained.

All 18 referenced assets verified to resolve.

## Remaining differences found (not yet matched)

- **Exact Elementor spacing**: section padding, gaps, and heading sizes come from external Elementor CSS (`post-10.css`, kit globals) **not present** in the saved HTML — current values are visually-tuned approximations, not the exact Elementor numbers.
- **Hero layout nuance**: the WP hero form card overlaps/positions slightly differently than the clone's two-column grid; close but not pixel-identical.
- **Services tab interaction**: WP may animate panel transitions; clone switches instantly.
- **Testimonial carousel**: WP uses an Elementor carousel (autoplay/drag); clone uses a static grid + scroll buttons.
- **Marquee speed/styling** and **stat count-up animation** are approximations.

## Remaining limitations (missing assets / data)

- **Blog post images (×3)** — not in `assets/`; blog cards keep gradient placeholders.
- **Service-area map image** — not provided; `.estimate__map` keeps a gradient placeholder.
- **Testimonial avatars** — not provided; placeholder circles remain.
- **Testimonial author names & exact review text** — not reliably extractable from the Elementor markup; current names/text are approximations from the screenshot.
- **Exact Elementor CSS** — external stylesheets weren't saved, so precise paddings/margins/breakpoints can't be 1:1 reproduced.
- **Verification** — changes are code-level and all assets resolve, but I could not run a browser here to pixel-diff against `home-desktop.png` / `home-mobile.png`; a visual check at 1440/768/390 is recommended.

## Net result
Typography, brand colors, logo, hero/section imagery, trust-bullet/process/rating icons now use the **real WordPress assets and fonts**, which closes the largest visual gaps. Remaining gaps are (a) exact Elementor spacing values (need the external CSS) and (b) a few images/data not included in the asset bundle.
