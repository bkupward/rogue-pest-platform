# Rogue Pest Solutions — Homepage Recreation

Standalone, framework-free recreation of the reference homepage
(https://roguepest.savagestrategic.io/) built from the provided screenshots.

## Files
- `index.html` — semantic markup for every section + both mega menus + mobile menu
- `styles.css` — design tokens + all section styles + responsive (desktop/tablet/mobile)
- `script.js` — mobile menu, services tabs, mega-menu keyboard/touch, testimonial scroll

## Run
Open `index.html` in a browser (no build step). Fonts load from Google Fonts (Poppins + Inter).

## Design tokens (from the screenshots)
- Brand red `#BE1E2D` (hover `#9D1824`) · ink/text `#2F2C2B` · dark band `#211F1E`
- Headings: Poppins (700–900) · Body: Inter · Container max-width 1200px

## Images — placeholders (drop real assets in to finish)
The photographic areas use CSS gradient placeholders because the source images
weren't provided. Replace these with `background-image: url(...)` (or `<img>`):
- Hero background → `.hero__bg`  (suburban home photo)
- Our Story → `.story__media`  (street/neighborhood)
- Services panels → `.panel__media`  (ant / mosquito / termite photos)
- Why Choose Us → `.why__media`  (aerial town)
- Blog cards → `.post__media` ×3
- Instant Estimate → `.estimate__map`  (service-area map)
- Stats truck image (right of the stats row) — omitted; add as a decorative image if desired.

## Mega menus
Recreated per the dedicated screenshots:
- **Services**: left intro ("Services" + paragraph + "All Services →"), right two link
  columns (Termite/Mosquito/General · Residential/Commercial).
- **Locations**: left intro + right single column (Huntsville, Rainbow City/Gadsden,
  Cullman, Greater Birmingham, Gulf Coast).
- Open on hover (desktop) and click/tap + keyboard (Esc to close) for touch devices.

## Notes
- This is intentionally a faithful clone, not a redesign.
- Some testimonial names/text are approximations where the screenshot text was small.
