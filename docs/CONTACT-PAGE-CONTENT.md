# CONTACT-PAGE-CONTENT.md — Contact Page Build (existing blocks only)

> Create a Page, **slug `contact`**, status Published. Uses the Hero field + the layout block stack. No new blocks.

## Hero (Hero field)
- **type:** Medium Impact (or Low Impact — a simple page header, not a full-bleed image)
- **richText:** H1 "Contact Rogue Pest Solutions" + paragraph "Have a pest problem or a question? Reach out — we respond fast and we're happy to help."
- **links (1):** `Call 866-370-7378` → `tel:+18663707378` (default)

## Layout block stack (in order)

| # | Section | Block | Key settings |
|---|---|---|---|
| 1 | Contact details | **content** | full-width column; richText below (phone, email, hours, address) |
| 2 | Contact form | **formBlock** | form = "Free Quote"; enableIntro true; intro "Request your free quote — we'll be in touch shortly." |
| 3 | Service area summary | **serviceAreas** | heading "Areas We Serve"; subheading "Proudly serving homes & businesses across Alabama"; automatic; button "View All Locations" → /locations |
| 4 | FAQ | **faq** | heading "Common Questions"; automatic; filterByTopic = General; limit 6 |

## Section copy details

### [1] Contact details (content block — full-width column, richText)
> **Get in Touch**
> **Phone / SMS:** 866-370-7378
> **Email:** contact@roguepest.com
> **Business Hours:** Mon – Sun: 8AM – 9PM
> **Main Office:** 84 Coy Drive, Chelsea, AL 35043
>
> Prefer to talk? Call or text us anytime during business hours. For quotes, the form below is the fastest way to get started.

*(Optional: a two-column Content block — details on the left, a short "Why choose us" note on the right.)*

### [2] Contact form
- Uses the **Free Quote** form (Full Name, Phone, Email, How can we help?, Location, Which best describes you?, SMS consent).
- Alternatively use a dedicated "Contact" form if created — same `formBlock`, different form record.

### [3] Service area summary
- The `serviceAreas` block lists all 8 locations as cards (reuses the Locations collection) — gives visitors a quick map of coverage with links to each location page.

### [4] FAQ
- Pulls General-topic FAQs so the contact page answers the most common pre-sale questions (pricing, scheduling, safety, coverage).

## Notes
- Office addresses for all locations aren't modeled per-record (no `address` field on Locations), so the single main-office address lives in the Content block here. The `serviceAreas` block covers the multi-area "where we work" need via location cards.
- Requires the **Free Quote** form to exist (section 2).
- No new blocks, fields, or schema — all four sections use existing blocks.
