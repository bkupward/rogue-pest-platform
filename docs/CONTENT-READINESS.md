# CONTENT-READINESS.md — Live DB Content Audit

> Queried directly against the live Neon Postgres on this date. Counts are real, not assumed.

## Current state (actual row counts)

| Content | Count | Status | Notes |
|---|---|---|---|
| Services | **3** | ✅ present | `termite-control`, `general-pest-control`, `mosquito-control` |
| Locations | **5** | ✅ present | greater-birmingham, gulf-coast, huntsville, cullman, rainbow-city--gadsden |
| Media | **4** | ⚠️ minimal | `mosquitoICON.jpg`, `termiteICON.jpg`, `termiteICON-1.jpg`, 1 unsplash photo — mostly icons |
| Testimonials | **0** | ❌ missing | block renders heading only |
| FAQs | **0** | ❌ missing | block renders heading only |
| Posts | **0** | ❌ missing | blog archive + homepage blog preview empty |
| Categories | **0** | ❌ missing | needed for post taxonomy |
| Forms | **0** | ❌ missing | Quote + Instant Estimate forms can't be placed |
| Pages | **1** | ⚠️ wrong slug | the only page has slug **`h`** (title "Home") — **not `home`** |
| Header global | **0 rows** | ❌ unconfigured | no nav items, no promo bar, no phone/CTA |
| Footer global | **0 rows** | ❌ unconfigured | no nav items / contact data |
| CompanyInfo global | **0 rows** | ❌ unconfigured | no phone, email, address, hours, CTA, ratings |

## Image coverage (per record)

- **Services:** only `termite-control` has a `featuredImage`. **`general-pest-control` and `mosquito-control` have none** → those cards show the empty image slot.
- **Locations:** **all 5 have no `heroImage`** → Service Areas cards + location detail pages have no imagery.
- **Hero:** no hero background image set (the `homeStatic` hero has no media).
- Available media are mostly **icons**, not the photographic hero/service/area imagery the reference uses.

## Critical structural finding

- **The homepage `/` is still the `homeStatic` code scaffold.** No DB Page has slug `home`, so the route falls back to `homeStatic`. The stray page with slug **`h`** (likely a typo of `home`) lives at `/h` and is not the homepage.
  - Consequence: the homepage **cannot be edited in the admin**, and the Form/Media blocks (omitted from `homeStatic`) can never appear until a real `home` Page is created.
- **No `contact` page exists** → `/contact` 404s.

## Content still required (checklist)

**Globals (do first — they're empty and site-wide):**
- [ ] **CompanyInfo** — phone, email, street/city/state/zip, business hours, Google/Facebook rating, primary CTA text + URL.
- [ ] **Header** — nav items (Home, About, Contact…), enable + write promo bar message.
- [ ] **Footer** — nav items (Company column: Privacy, Terms, Blog, Portal…).

**Media (upload before linking):**
- [ ] Hero background image.
- [ ] Service images for **general-pest-control** and **mosquito-control** (termite already has one).
- [ ] Hero images for **all 5 locations**.
- [ ] Our Story + Why Choose Us images (homepage).
- [ ] Real photographic assets (current media are icons).

**Collections:**
- [ ] **Testimonials** — ≥6, mark ≥3 as Featured.
- [ ] **FAQs** — ~10.
- [ ] **Posts** — ≥3 published (+ Categories), with hero images.
- [ ] Backfill the 2 missing **Service** images.
- [ ] Add **Location** hero images (×5).

**Forms (form-builder):**
- [ ] "Free Quote" form.
- [ ] "Instant Estimate" form.

**Pages:**
- [ ] Create a real **`home`** Page (rebuild the `homeStatic` stack in admin; lets editors manage it + add Form/Media blocks). Fix/delete the stray **`h`** page.
- [ ] Create a **`contact`** Page (Form block + contact content).

## Readiness verdict
**Partially ready.** Services/Locations exist (good for archive/detail QA), but **Testimonials, FAQs, Posts, Forms, all globals, and most images are missing**, and the homepage/contact pages aren't real Pages. A fair full-site screenshot comparison should wait until at least the globals + a few testimonials/FAQs/posts + images are populated. Archive/detail pages for Services and Locations **can be QA'd now** (modulo missing images).
