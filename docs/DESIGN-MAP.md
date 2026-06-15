# DESIGN-MAP.md — Reference Site Visual Audit

> Reference: https://roguepest.savagestrategic.io/
> Goal: document the visual design of each section so we can re-skin our existing blocks to match.
>
> **⚠️ Confirmation needed:** exact hex colors and font families could not be machine-extracted from the live site (CSS is not exposed through the fetch tool). Values below marked _(proposed)_ must be confirmed against the live site using browser DevTools or the brand style guide before implementation. Layout, structure, and behavior are observed directly.

## Global aesthetic

- **Overall:** light theme, generous whitespace, full-width sections with centered contained content, a **dark footer**.
- **Accent:** green-forward, eco-friendly brand _(proposed: a mid green primary + a darker green for depth)_.
- **Section rhythm:** alternating white / very-light-gray section backgrounds; large vertical padding between sections.
- **Headings:** bold; some all-caps display treatments ("WE STOP BUGS"); section eyebrows/subheadings above the main heading.
- **Imagery:** photographic, often rounded corners; some full-bleed background images (hero).
- **Container:** centered, ~max 80–86rem, side padding 1rem mobile / 2rem desktop (matches our existing `.container`).

---

## Section-by-section audit

For each: layout · spacing · typography · color · radius · shadow · cards · buttons · responsive · images.

### 1. Header (nav)
- **Layout:** logo left, horizontal nav center/right, phone CTA + Customer Portal right; dropdowns for Services/Locations.
- **Spacing:** comfortable padding (~`py-6/8`), sticky on scroll.
- **Typography:** medium-weight nav links, ~14–16px.
- **Color:** white/transparent over hero (turns solid on scroll); dark text (white when over the dark hero).
- **Buttons:** a filled "Request a Quote" CTA + a phone link.
- **Responsive:** collapses to a hamburger + slide-in menu on mobile.

### 2. Promo bar
- **Layout:** thin full-width bar above header, centered text + phone link.
- **Color:** solid brand/accent fill _(proposed green)_, light text.
- **Typography:** small (~13–14px), medium weight.
- **Responsive:** stays single line, may truncate on small screens.

### 3. Hero
- **Layout:** full-bleed background photo with dark overlay; centered headline + intro + bullets + rating badge + 2 CTAs.
- **Spacing:** tall (`min-h ~80vh`), centered content, max ~36rem text column.
- **Typography:** large bold H1 (~3–4rem desktop), light intro paragraph.
- **Color:** white text on dark photo overlay; primary CTA filled, secondary outline.
- **Bullets:** 3 inline/stacked trust items, often with check icons.
- **Rating badge:** small pill/row — platform + stars + "5.0".
- **Buttons:** primary (filled green) + outline (white border).
- **Responsive:** text recenters/stacks; bullets stack; image stays full-bleed.
- **Images:** full-bleed, `object-cover`, dark gradient overlay.

### 4. Quote form section
- **Layout:** card-style form panel, often overlapping/adjacent to hero; labeled inputs in 1–2 columns.
- **Spacing:** padded card (`p-6/8`), gap between fields.
- **Color:** white card on light section; brand submit button.
- **Radius/shadow:** rounded card with soft shadow.
- **Inputs:** rounded, bordered, full-width.
- **Buttons:** full-width filled "Request Free Quote".
- **Responsive:** fields stack to single column.

### 5. Testimonials
- **Layout:** centered heading + city subheading; testimonial(s) as quote cards, possibly carousel; star rating.
- **Color:** light section; cards white with border/shadow.
- **Typography:** italic/large quote, bold attribution, smaller role/location.
- **Cards:** rounded, soft shadow, padding; star row.
- **Responsive:** 1 → up to 3 columns.

### 6. Our Story
- **Layout:** two-column — text (heading + paragraphs + 3 value bullets + "Learn More") beside an image.
- **Color:** light section.
- **Typography:** eyebrow "Our Story", bold H2, body paragraphs.
- **Bullets:** icon + short label list.
- **Image:** rounded corners, soft shadow (service truck).
- **Buttons:** text/link "Learn More".
- **Responsive:** columns stack (image above/below text).

### 7. Stats
- **Layout:** 4 counters in a horizontal row.
- **Typography:** very large bold numbers + smaller label beneath.
- **Color:** may sit on a brand/dark or light band.
- **Responsive:** 2×2 grid on mobile, 1×4 on desktop.

### 8. Services section
- **Layout:** heading + tabbed selector (General / Mosquito / Termite); active tab shows image + copy + 2 feature bullets + "Learn More".
- **Cards:** large rounded image, padded text area, soft shadow.
- **Buttons:** "Learn More" + phone CTA.
- **Responsive:** tabs → stacked accordion or stacked cards; image above text.
- **Images:** rounded, `object-cover`.

### 9. Process section
- **Layout:** heading + 4 numbered steps in a row, each with icon/number + title + short text; phone CTA below.
- **Typography:** numbered circles/badges, bold step titles.
- **Color:** light or subtle tinted band; connecting line between steps (desktop).
- **Responsive:** steps stack vertically on mobile.

### 10. Why Choose Us
- **Layout:** heading + intro paragraph + aerial image; 4 value cards (icon + title + text); "Get a Free Quote" + phone CTA.
- **Cards:** rounded, bordered/shadowed, icon top.
- **Responsive:** 1 → 2 → 4 columns.
- **Image:** rounded, full-width within container.

### 11. FAQ
- **Layout:** eyebrow "have questions?" + heading; vertical accordion of 10 Q&A.
- **Interaction:** click to expand; chevron indicator; one-open or multi-open.
- **Color:** light; dividers/borders between items; subtle hover.
- **Typography:** medium-weight questions, regular answers.
- **Responsive:** full-width single column.

### 12. Blog section
- **Layout:** big display heading "WE STOP BUGS" + subheading; 3 post cards (image, date, title, excerpt, "Read More").
- **Cards:** rounded image top, padded body, soft shadow, hover lift.
- **Responsive:** 1 → 3 columns.
- **Images:** rounded top corners, `object-cover`, fixed aspect ratio.

### 13. Service Areas
- **Layout:** heading + subheading + paragraph; 5 location links/cards; a decorative star/marquee strip of area names.
- **Cards/links:** simple rounded link cards or a list.
- **Responsive:** wraps; marquee scrolls or wraps.

### 14. Bottom lead form
- **Layout:** heading "Get an Instant Estimate" + multi-field form on a tinted/branded band.
- **Color:** brand or dark band, white card/inputs.
- **Buttons:** filled "Submit".
- **Responsive:** fields stack.

### 15. Footer
- **Layout:** dark background; logo + social icons; 4 link columns (Company / Services / Customer Support / Service Areas); contact block (phone, hours, address + map link); copyright + attribution.
- **Color:** **dark** (near-black) with white text, muted link hovers.
- **Typography:** small links, bold column headers.
- **Responsive:** columns stack to accordion/stacked list.
- **Images:** logo (light/white variant), social glyphs.

---

## Cross-cutting patterns to encode as tokens
- **Section wrapper:** full-width band + centered `.container` + large `py`.
- **Eyebrow + heading + subheading** heading group, repeated everywhere.
- **Card:** rounded (`--radius`), soft shadow, `bg-card`/white, padded.
- **Buttons:** primary (filled brand), outline, link, + phone link style.
- **Light vs dark band** alternation; dark footer.
See `DESIGN-TOKENS.md` for the concrete proposed values and `VISUAL-PARITY-PLAN.md` for per-section file changes.
