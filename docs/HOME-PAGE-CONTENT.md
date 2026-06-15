# HOME-PAGE-CONTENT.md — Home Page Build (existing blocks only)

> Create a real Page, **slug `home`**, status Published (this replaces the `homeStatic` fallback). Remove the stray `h` page.
> Hero is the page **Hero field**; everything else is the **layout** block stack. No new blocks.

## Hero (Hero field)
- **type:** High Impact
- **media:** hero background image (upload)
- **richText:** H1 "Your Guard Against Pests in Alabama!" + paragraph "Reliable, eco-friendly pest control for homes and businesses across Alabama — backed by our result guarantee."
- **links (2):** `Request a Quote` → `/contact` (default) · `Call 866-370-7378` → `tel:+18663707378` (outline)
- **trustBullets (3):** Experienced Team · Clear Communication · Result Guarantee
- **ratingBadge:** enabled · source Facebook · rating 5.0 · label "Customer Rating"

## Layout block stack (in order)

| # | Section | Block | Key settings |
|---|---|---|---|
| 1 | Free Quote form | **formBlock** | form = "Free Quote"; enableIntro = true; intro "Request your free, no-obligation quote." |
| 2 | Testimonials | **testimonials** | heading "What Our Customers Say"; subheading "Trusted across Alabama"; populateBy automatic; **featuredOnly true**; limit 3; showRating true |
| 3 | Our Story | **content** | one full-width column, richText below |
| 4 | Stats | **stats** | heading "Trusted Across Alabama"; 4 stats (below) |
| 5 | Services | **servicesShowcase** | heading "Our Pest Control Services"; subheading "Tailored, Effective, Safe."; automatic; showImages/showExcerpts true; button "View All Services" → /services |
| 6 | Process | **featureGrid** | layout **steps**; heading "Our Clear and Proven Process"; subheading "Stress-Free from Start to Finish"; 4 items (below) |
| 7 | CTA | **cta** | richText "Ready for a pest-free property?"; link "Get a Free Quote" → /contact |
| 8 | Why Choose Us | **featureGrid** | layout **grid**; heading "Why Alabama Homeowners Choose Us"; 4 items (below) |
| 9 | FAQ | **faq** | heading "Have Questions? We've Got the Answers"; automatic; limit 10 |
| 10 | Blog | **archive** | introContent "From the Blog"; populateBy collection; relationTo posts; limit 3 |
| 11 | Service Areas | **serviceAreas** | heading "Local Service You Can Count On"; subheading "Proudly Serving Homes & Businesses Across Alabama"; automatic; button "View All Locations" → /locations |
| 12 | Instant Estimate form | **formBlock** | form = "Instant Estimate"; enableIntro true; intro "Get an instant estimate for our pest control programs." |

## Section copy details

### [3] Our Story (content block, full-width column)
> **Our Story** — Rogue Pest Solutions was founded on a simple idea: dependable, eco-friendly pest control delivered by people who treat your home like their own. From customized treatments to safe, effective solutions, we're your reliable local experts across Alabama. *(link: "Learn More" → /about-us)*

### [4] Stats (stats block — 4 items)
| value | suffix | label |
|---|---|---|
| 1500 | + | Homes & Businesses Protected |
| 20 | + | Years Experience |
| 98 | % | Customer Satisfaction |
| 5.0 | | Average Rating |

### [6] Process (featureGrid, steps — 4 items)
1. **Request a Quote** — Tell us about your pest problem online or by phone.
2. **Review & Approve** — We send a clear, itemized quote — no surprises.
3. **Schedule Your Service** — Pick a time that works; our tech arrives on schedule.
4. **Enjoy a Pest-Free Property** — Relax with ongoing protection and our guarantee.

### [8] Why Choose Us (featureGrid, grid — 4 items)
1. **Commitment to Excellence** — Thorough inspections and treatments, every visit.
2. **Community Involvement** — Locally owned and invested in Alabama neighborhoods.
3. **Fast, Reliable Local Response** — On-time service from technicians who know the area.
4. **Safe & Family-Friendly** — EPA-approved, pet- and child-conscious treatments.

## Notes
- Sections [1] and [12] (forms) require the two Forms to exist first.
- Our Story / Why Choose Us images (Media blocks) are **optional** — add a `mediaBlock` beside Content if desired; not required for parity.
- All collection-driven blocks (2, 5, 9, 10, 11) render from seeded content automatically.
