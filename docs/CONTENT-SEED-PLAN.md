# CONTENT-SEED-PLAN.md — Demo Content Plan & Counts

> Realistic pest-control demo content for **Rogue Pest Solutions** (Alabama), mapped to the existing schema. No schema/block changes. Entry is admin/CMS work.

## Recommended record counts

| Content | Count | Notes |
|---|---|---|
| CompanyInfo (global) | 1 | site-wide business info |
| Header (global) | 1 | promo bar + 6 nav items |
| Footer (global) | 1 | 6 nav items (Company column) |
| Home Page | 1 | real `home` Page (replaces `homeStatic`) |
| Contact Page | 1 | slug `contact` |
| Services | **8** | see SERVICES-CONTENT.md |
| Locations | **8** | see LOCATIONS-CONTENT.md |
| Testimonials | **12** | ≥4 Featured · see TESTIMONIALS-CONTENT.md |
| FAQs | **20** | mixed topics · see FAQS-CONTENT.md |
| Blog Posts | **5** | see BLOG-CONTENT.md |
| Categories | **4** | Prevention, Seasonal, Pest Guides, Home Tips |
| Forms | **2** | Free Quote, Instant Estimate |
| Media | **~26** | see media list below |

## Globals content

### CompanyInfo
- **companyName:** Rogue Pest Solutions
- **phone:** 866-370-7378
- **email:** contact@roguepest.com
- **streetAddress:** 84 Coy Drive
- **city:** Chelsea · **state:** AL · **zip:** 35043
- **businessHours:** Mon – Sun: 8AM – 9PM
- **googleRating:** 4.9 · **facebookRating:** 5.0
- **primaryCtaText:** Request a Quote · **primaryCtaUrl:** /contact

### Header
- **promoBar.enabled:** true
- **promoBar.message:** "Keep your home pest-free all season — Call Now!"
- **navItems (6):** Home `/` · About Us `/about-us` · Services `/services` · Locations `/locations` · Blog `/posts` · Contact `/contact`
  - (Services/Locations dropdowns auto-populate from the collections.)

### Footer
- **navItems (6) — "Company" column:** About Us `/about-us` · Contact `/contact` · Blog `/posts` · Privacy Policy `/privacy-policy` · Terms & Conditions `/terms-and-conditions` · Request a Quote `/contact`
  - (Services + Service Areas footer columns auto-populate from collections.)

## Forms (form-builder)

**1. Free Quote** (submit: "Request Free Quote", confirmation message)
- Full Name (text, required), Phone (text, required), Email (email, required)
- "How can we help?" (select: Ants, Bed Bugs, Cockroaches, Fire Ants, Fleas & Ticks, Mosquitoes, Rodents, Spiders, Termites, Wasps, Other)
- Location (select: the 8 service areas)
- "Which best describes you?" (select: Homeowner, Tenant, Landlord, Investor, Business Owner)
- SMS consent (checkbox)

**2. Instant Estimate** (submit: "Get My Estimate")
- First Name, Last Name, Phone, Email, Address (text), SMS consent (checkbox)

## Categories (4)
Prevention · Seasonal · Pest Guides · Home Tips

## Media list (~26)
- Logo (light + dark variant), OG/social image
- Hero background (1)
- Our Story image (1), Why Choose Us image (1)
- Service images (8 — termite, mosquito, ant, roach, rodent, spider, flea-tick, commercial)
- Location images (8)
- Blog hero images (5)

## Recommended entry order
1. **Media** (upload all; set alt text).
2. **Categories**.
3. **CompanyInfo** → **Header** → **Footer** globals.
4. **Services** (8) → attach images.
5. **Locations** (8) → attach images.
6. **Testimonials** (12) → link to locations, set Featured/displayOrder.
7. **FAQs** (20) → set topic, link to services/locations.
8. **Posts** (5) → categories + hero images, publish.
9. **Forms** (2).
10. **Home Page** (rebuild stack per HOME-PAGE-CONTENT.md; remove stray `h` page).
11. **Contact Page** (per CONTACT-PAGE-CONTENT.md).
