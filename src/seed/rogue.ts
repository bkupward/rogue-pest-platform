/**
 * Idempotent demo-content seeder for Rogue Pest Solutions.
 *
 * Run:   pnpm seed:rogue        (→ payload run src/seed/rogue.ts)
 *
 * - Safe to run repeatedly: every record is upserted by a stable human key
 *   (title/name/question/customerName/slug), so existing records are updated
 *   and no duplicates are created. Works against any DB the config points at.
 * - Source copy: docs/*-CONTENT.md.
 * - Media + Forms are NOT seeded (no fake media, no stock downloads). The hero
 *   reuses an existing media record if one is present. Service/location images
 *   and the form blocks must be added manually — see the summary it prints.
 */
import type { CollectionSlug } from 'payload'

import { getPayload } from 'payload'
import config from '@payload-config'

// --- lexical helpers (return `any`; richText fields accept the editor state) ---
const textNode = (t: string): any => ({
  type: 'text',
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
  text: t,
  version: 1,
})
const headingNode = (t: string, tag: 'h1' | 'h2' | 'h3' = 'h2'): any => ({
  type: 'heading',
  tag,
  children: [textNode(t)],
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
})
const paragraphNode = (t: string): any => ({
  type: 'paragraph',
  children: [textNode(t)],
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  version: 1,
})
const doc = (...nodes: any[]): any => ({
  root: { type: 'root', children: nodes, direction: 'ltr', format: '', indent: 0, version: 1 },
})
const rt = (body: string): any => doc(paragraphNode(body))

async function main() {
  const payload = await getPayload({ config })
  const log = (m: string) => payload.logger.info(`[seed:rogue] ${m}`)

  // disableRevalidate: the collections' afterChange hooks call Next.js
  // revalidatePath/revalidateTag, which only work inside a Next render context —
  // not in this standalone script. The hooks honor this flag and skip revalidation.
  const ctx = { disableRevalidate: true }

  const upsert = async (
    collection: CollectionSlug,
    where: any,
    data: any,
  ): Promise<{ id: number | string }> => {
    const found = await payload.find({ collection, where, limit: 1, depth: 0 })
    if (found.docs[0]) {
      return payload.update({ collection, id: found.docs[0].id, data, context: ctx }) as any
    }
    return payload.create({ collection, data, context: ctx }) as any
  }

  // ---------------------------------------------------------------- Categories
  const categoryTitles = ['Prevention', 'Seasonal', 'Pest Guides', 'Home Tips']
  const catId: Record<string, number | string> = {}
  for (const title of categoryTitles) {
    const c = await upsert('categories', { title: { equals: title } }, { title })
    catId[title] = c.id
  }
  log(`categories upserted: ${categoryTitles.length}`)

  // ------------------------------------------------------------------ Services
  const services = [
    { title: 'Termite Control', excerpt: 'Protect your biggest investment with advanced termite detection and the Sentricon® Always Active baiting system.', body: 'Termites cause billions in damage every year, often before homeowners notice. Our licensed technicians inspect, treat, and monitor your property year-round with the Sentricon® baiting system and targeted liquid treatments — stopping colonies before they reach your home’s structure.', metaTitle: 'Termite Control in Alabama | Rogue Pest Solutions', metaDescription: 'Stop termites before they damage your home. Sentricon® baiting, inspections, and year-round monitoring across Alabama.' },
    { title: 'Mosquito Control', excerpt: 'Reclaim your backyard with seasonal mosquito treatments that keep biting pests away from your family.', body: 'Mosquitoes aren’t just a nuisance — they carry disease. Our barrier treatments target resting and breeding areas around your yard, knocking down adult mosquitoes and interrupting their life cycle so you can enjoy the outdoors bite-free all season.', metaTitle: 'Mosquito Control in Alabama | Rogue Pest Solutions', metaDescription: 'Enjoy a bite-free backyard with seasonal mosquito barrier treatments. Safe, effective, and family-friendly.' },
    { title: 'Ant Control', excerpt: 'From fire ants to carpenter ants, we eliminate colonies at the source — not just the trail.', body: 'Ant problems rarely stay small. We identify the species, locate the colony, and apply targeted treatments that eliminate the nest rather than just the ants you see. Ongoing prevention keeps fire ants, carpenter ants, and sugar ants out for good.', metaTitle: 'Ant Control in Alabama | Rogue Pest Solutions', metaDescription: 'Eliminate fire ants, carpenter ants, and more at the source. Targeted ant control and prevention.' },
    { title: 'Roach Control', excerpt: 'Discreet, thorough cockroach treatments that clear infestations and keep them from coming back.', body: 'Cockroaches spread bacteria and trigger allergies. Our techs treat cracks, voids, and harborage areas with professional-grade baits and growth regulators, then seal entry points and set a prevention schedule to keep your home roach-free.', metaTitle: 'Cockroach Control in Alabama | Rogue Pest Solutions', metaDescription: 'Clear cockroach infestations for good with professional roach control and prevention.' },
    { title: 'Rodent Control', excerpt: 'Rat and mouse removal, exclusion, and sanitation to make your home rodent-free.', body: 'Rodents chew wiring, contaminate food, and reproduce fast. We trap and remove active rodents, seal entry points with exclusion work, and clean up contaminated areas — a complete approach that solves the problem instead of masking it.', metaTitle: 'Rodent Control in Alabama | Rogue Pest Solutions', metaDescription: 'Rat and mouse removal, exclusion, and prevention. Make your Alabama home rodent-free.' },
    { title: 'Spider Control', excerpt: 'Reduce spiders — including venomous species — with targeted treatments and web removal.', body: 'Most spiders are harmless, but black widows and brown recluses aren’t worth the risk. We treat baseboards, corners, eaves, and entry points, remove webs and egg sacs, and reduce the insects spiders feed on so they have fewer reasons to stay.', metaTitle: 'Spider Control in Alabama | Rogue Pest Solutions', metaDescription: 'Reduce household and venomous spiders with targeted treatments.' },
    { title: 'Flea & Tick Control', excerpt: 'Yard and indoor flea & tick treatments that protect your pets and your family.', body: 'Fleas and ticks hitch a ride on pets and wildlife and multiply quickly. We treat indoor harborage areas and outdoor hotspots — shady, humid yard zones — to break the life cycle and keep your home and pets protected.', metaTitle: 'Flea & Tick Control in Alabama | Rogue Pest Solutions', metaDescription: 'Protect pets and family from fleas and ticks with indoor and yard treatments.' },
    { title: 'Commercial Pest Control', excerpt: 'Discreet, code-compliant pest management for restaurants, offices, retail, and multifamily properties.', body: 'Pests put your reputation and compliance at risk. We build customized commercial programs with flexible scheduling, detailed documentation, and discreet service that protects your customers, employees, and bottom line.', metaTitle: 'Commercial Pest Control in Alabama | Rogue Pest Solutions', metaDescription: 'Code-compliant commercial pest management for Alabama businesses.' },
  ]
  const svcId: Record<string, number | string> = {}
  for (const s of services) {
    const d = await upsert(
      'services',
      { title: { equals: s.title } },
      { title: s.title, shortDescription: s.excerpt, content: rt(s.body), metaTitle: s.metaTitle, metaDescription: s.metaDescription },
    )
    svcId[s.title] = d.id
  }
  log(`services upserted: ${services.length}`)

  // ----------------------------------------------------------------- Locations
  const locations = [
    { name: 'Greater Birmingham', excerpt: 'Trusted pest control for Birmingham, Hoover, Chelsea, and the surrounding metro.', body: 'From historic neighborhoods to new construction, Greater Birmingham homes face everything from termites to mosquitoes. Our local techs know the area’s pest pressure and tailor treatments to your property — backed by our result guarantee.', metaTitle: 'Pest Control in Greater Birmingham, AL | Rogue Pest Solutions', metaDescription: 'Local pest control for Birmingham, Hoover, and Chelsea. Termite, mosquito, rodent, and general pest services.' },
    { name: 'Gulf Coast', excerpt: 'Coastal pest control for Foley, Gulf Shores, and the Baldwin County area.', body: 'The Gulf Coast’s warm, humid climate keeps pests active year-round. We protect coastal homes and rentals from mosquitoes, ants, roaches, and rodents with treatments built for the region’s unique conditions.', metaTitle: 'Pest Control on the Alabama Gulf Coast | Rogue Pest Solutions', metaDescription: 'Coastal pest control for Foley, Gulf Shores, and Baldwin County. Year-round protection.' },
    { name: 'Huntsville', excerpt: 'Frontline pest defense for Huntsville, Madison, and Harvest.', body: 'With over 30 years of combined experience, our team protects North Alabama homes and businesses across Huntsville, Madison, and Harvest — from Twickenham to Cummings Research Park — with reliable, locally-operated service.', metaTitle: 'Pest Control in Huntsville, AL | Rogue Pest Solutions', metaDescription: 'Locally-operated pest control for Huntsville, Madison, and Harvest.' },
    { name: 'Cullman', excerpt: 'Dependable pest control for Cullman and surrounding communities.', body: 'Cullman’s mix of rural and suburban properties brings a range of pest challenges. Our technicians deliver thorough inspections and customized treatments that keep your home protected through every season.', metaTitle: 'Pest Control in Cullman, AL | Rogue Pest Solutions', metaDescription: 'Dependable termite, mosquito, and pest control for Cullman, AL.' },
    { name: 'Rainbow City / Gadsden', excerpt: 'Local pest control for Rainbow City, Gadsden, and the Etowah County area.', body: 'We keep Rainbow City and Gadsden homes comfortable and pest-free with responsive local service, eco-friendly treatment options, and a satisfaction guarantee on every visit.', metaTitle: 'Pest Control in Rainbow City & Gadsden, AL | Rogue Pest Solutions', metaDescription: 'Local pest control for Rainbow City, Gadsden, and Etowah County.' },
    { name: 'Hoover', excerpt: 'Pest control for Hoover and the southern Birmingham suburbs.', body: 'Hoover’s wooded neighborhoods attract ants, spiders, and the occasional rodent. Our techs provide quarterly and one-time services that fit your schedule and keep your family-friendly home protected year-round.', metaTitle: 'Pest Control in Hoover, AL | Rogue Pest Solutions', metaDescription: 'Pest control for Hoover, AL and the southern Birmingham suburbs.' },
    { name: 'Tuscaloosa', excerpt: 'Pest control for Tuscaloosa homes, rentals, and student housing.', body: 'From game-day rentals to family homes, Tuscaloosa properties need reliable pest protection. We handle roaches, ants, rodents, and more with discreet, on-time service and clear communication.', metaTitle: 'Pest Control in Tuscaloosa, AL | Rogue Pest Solutions', metaDescription: 'Pest control for Tuscaloosa homes and rentals. Roach, ant, and rodent services.' },
    { name: 'Montgomery', excerpt: 'Pest control for Montgomery and the River Region.', body: 'Montgomery’s long, warm seasons keep pests busy. Our local team delivers customized residential and commercial treatments across the River Region, backed by detailed inspections and our result guarantee.', metaTitle: 'Pest Control in Montgomery, AL | Rogue Pest Solutions', metaDescription: 'Residential and commercial pest control for Montgomery and the River Region.' },
  ]
  const locId: Record<string, number | string> = {}
  for (const l of locations) {
    const d = await upsert(
      'locations',
      { name: { equals: l.name } },
      { name: l.name, shortDescription: l.excerpt, content: rt(l.body), metaTitle: l.metaTitle, metaDescription: l.metaDescription },
    )
    locId[l.name] = d.id
  }
  log(`locations upserted: ${locations.length}`)

  // -------------------------------------------------------------- Testimonials
  const testimonials = [
    { customerName: 'Sarah M.', rating: 5, location: 'Greater Birmingham', featured: true, order: 1, reviewText: 'Rogue Pest got rid of our ant problem on the first visit. The tech was on time, explained everything, and our home has been pest-free since. Highly recommend!' },
    { customerName: 'James T.', rating: 5, location: 'Huntsville', featured: true, order: 2, reviewText: 'We had termites and were terrified about the cost. Rogue installed the Sentricon system and walked us through every step. Professional and fairly priced.' },
    { customerName: 'Latoya W.', rating: 5, location: 'Gulf Coast', featured: true, order: 3, reviewText: 'Mosquitoes used to make our backyard unusable. After one season of treatments we can finally enjoy our evenings outside. Worth every penny.' },
    { customerName: 'David K.', rating: 5, location: 'Cullman', featured: true, order: 4, reviewText: 'Reliable, local, and honest. They show up when they say they will and the results speak for themselves. Best pest control we’ve used.' },
    { customerName: 'Emily R.', rating: 5, location: 'Rainbow City / Gadsden', featured: false, order: 5, reviewText: 'Quick response when we found mice in the garage. They sealed the entry points and we haven’t seen one since.' },
    { customerName: 'Marcus B.', rating: 4, location: 'Hoover', featured: false, order: 6, reviewText: 'Great service and friendly techs. Took a second visit to fully clear the roaches but they stood behind their guarantee.' },
    { customerName: 'Ashley P.', rating: 5, location: 'Tuscaloosa', featured: false, order: 7, reviewText: 'Manage a few rentals and Rogue keeps them all pest-free. Easy scheduling and detailed reports every time.' },
    { customerName: 'Robert L.', rating: 5, location: 'Montgomery', featured: false, order: 8, reviewText: 'Fire ants were taking over our yard. One treatment and they were gone. The kids can finally play outside again.' },
    { customerName: 'Nicole S.', rating: 5, location: 'Greater Birmingham', featured: false, order: 9, reviewText: 'Family-owned and it shows. They treat your home like their own and never upsell you on things you don’t need.' },
    { customerName: 'Brandon H.', rating: 4, location: 'Huntsville', featured: false, order: 10, reviewText: 'Solid termite inspection before we bought our house. Thorough report helped us negotiate. Would use again.' },
    { customerName: 'Megan F.', rating: 5, location: 'Gulf Coast', featured: false, order: 11, reviewText: 'Pet-safe flea treatment saved our summer. Our dog and our home are both happy now.' },
    { customerName: 'Chris D.', rating: 5, location: 'Greater Birmingham', featured: false, order: 12, reviewText: 'We run a restaurant and compliance is everything. Rogue’s discreet commercial service keeps us audit-ready and pest-free.' },
  ]
  for (const t of testimonials) {
    await upsert(
      'testimonials',
      { customerName: { equals: t.customerName } },
      { customerName: t.customerName, reviewText: t.reviewText, rating: t.rating, location: locId[t.location] ?? null, featured: t.featured, displayOrder: t.order },
    )
  }
  log(`testimonials upserted: ${testimonials.length}`)

  // ---------------------------------------------------------------------- FAQs
  const faqs = [
    { q: 'What makes Rogue Pest Solutions different?', a: 'We’re locally owned and family operated, with customized treatments, eco-friendly options, and a satisfaction guarantee on every visit.', topic: 'general', svc: undefined, order: 1 },
    { q: 'How often should I have my home serviced?', a: 'Most homes do best on a quarterly program, with one-time or monthly options available depending on pest pressure.', topic: 'general', svc: undefined, order: 2 },
    { q: 'Are your treatments safe for pets and children?', a: 'Yes. We use EPA-approved, family- and pet-friendly products and apply them responsibly. We’ll advise any short re-entry times.', topic: 'safety', svc: undefined, order: 3 },
    { q: 'What are the signs of a termite problem?', a: 'Mud tubes, discarded wings, hollow-sounding wood, and bubbling paint. If you see these, schedule an inspection right away.', topic: 'termite', svc: 'Termite Control', order: 4 },
    { q: 'How can I reduce mosquitoes between treatments?', a: 'Empty standing water weekly, clean gutters, and keep grass trimmed. Our barrier treatments handle the rest.', topic: 'mosquito', svc: 'Mosquito Control', order: 5 },
    { q: 'What should I do if I see rodent activity?', a: 'Avoid disturbing droppings, and call us. We’ll trap, remove, seal entry points, and sanitize affected areas.', topic: 'rodent', svc: 'Rodent Control', order: 6 },
    { q: 'Can you help with spider infestations?', a: 'Yes — we treat harborage areas, remove webs and egg sacs, and reduce the insects spiders feed on.', topic: 'general', svc: 'Spider Control', order: 7 },
    { q: 'What eco-friendly methods do you use?', a: 'Targeted baiting, exclusion, and integrated pest management that minimizes product use while maximizing results.', topic: 'safety', svc: undefined, order: 8 },
    { q: 'How quickly will I see results?', a: 'Many pests are knocked down within the first visit; full control of established infestations may take a follow-up.', topic: 'general', svc: undefined, order: 9 },
    { q: 'What are the most common pests in Alabama?', a: 'Termites, mosquitoes, fire ants, cockroaches, spiders, and rodents top the list across the state.', topic: 'general', svc: undefined, order: 10 },
    { q: 'How much does pest control cost?', a: 'Pricing depends on home size, pest type, and program. We offer free, no-obligation quotes.', topic: 'pricing', svc: undefined, order: 11 },
    { q: 'Do you offer free quotes?', a: 'Yes — request one online or by phone and we’ll provide a transparent, itemized estimate.', topic: 'pricing', svc: undefined, order: 12 },
    { q: 'Do I need to be home for service?', a: 'Not always. Many exterior treatments can be done without you present; we’ll coordinate access for interior work.', topic: 'general', svc: undefined, order: 13 },
    { q: 'What is the Sentricon® system?', a: 'An Always Active baiting system installed around your home that eliminates termite colonies, not just foragers.', topic: 'termite', svc: 'Termite Control', order: 14 },
    { q: 'Why do ants keep coming back?', a: 'Treating the trail doesn’t kill the colony. We target the nest and set prevention to stop them returning.', topic: 'general', svc: 'Ant Control', order: 15 },
    { q: 'How do you keep roaches from coming back?', a: 'Bait, growth regulators, entry-point sealing, and a prevention schedule break the breeding cycle.', topic: 'general', svc: 'Roach Control', order: 16 },
    { q: 'Can you treat fleas and ticks in the yard?', a: 'Yes — we treat shady, humid outdoor hotspots plus indoor harborage areas to break the life cycle.', topic: 'general', svc: 'Flea & Tick Control', order: 17 },
    { q: 'Do you provide documentation for commercial accounts?', a: 'Yes — detailed service reports and compliance-ready records on every visit.', topic: 'safety', svc: 'Commercial Pest Control', order: 18 },
    { q: 'What areas do you serve?', a: 'Greater Birmingham, Gulf Coast, Huntsville, Cullman, Rainbow City/Gadsden, Hoover, Tuscaloosa, and Montgomery.', topic: 'general', svc: undefined, order: 19 },
    { q: 'Do you guarantee your work?', a: 'Yes — if pests return between scheduled visits, so do we, at no extra charge.', topic: 'general', svc: undefined, order: 20 },
  ]
  for (const f of faqs) {
    await upsert(
      'faqs',
      { question: { equals: f.q } },
      { question: f.q, answer: rt(f.a), topic: f.topic, relatedService: f.svc ? svcId[f.svc] ?? null : null, displayOrder: f.order },
    )
  }
  log(`faqs upserted: ${faqs.length}`)

  // --------------------------------------------------------------------- Posts
  const posts = [
    { title: 'Essential Pest Prevention Tips for Alabama Homeowners', category: 'Prevention', body: 'Prevention is cheaper than treatment. Seal cracks around doors and windows, keep firewood away from the house, fix moisture issues, and trim vegetation back from the exterior. Pair these habits with a quarterly service plan and you’ll stop most pests before they start.', metaTitle: 'Pest Prevention Tips for Alabama Homeowners | Rogue Pest Solutions', metaDescription: 'Keep Alabama pests out with these simple seasonal prevention tips.' },
    { title: 'The Importance of Regular Pest Maintenance in Alabama', category: 'Seasonal', body: 'Alabama’s warm, humid weather keeps pests active for much of the year. A single treatment knocks down what’s there today, but ongoing maintenance interrupts breeding cycles and catches new activity early — protecting your home and saving money over time.', metaTitle: 'Why Regular Pest Maintenance Matters in Alabama | Rogue Pest Solutions', metaDescription: 'Learn why ongoing pest maintenance beats one-time treatments in Alabama’s climate.' },
    { title: 'How to Keep Your Alabama Home Rodent-Free', category: 'Pest Guides', body: 'Rats and mice slip through gaps as small as a dime. Look for droppings, gnaw marks, and nighttime scratching. Seal entry points, store food in sealed containers, and act fast — rodents reproduce quickly. Professional exclusion makes the fix permanent.', metaTitle: 'Keep Your Alabama Home Rodent-Free | Rogue Pest Solutions', metaDescription: 'Signs of rodents and the exclusion steps that keep rats and mice out.' },
    { title: 'Mosquito-Proofing Your Backyard This Summer', category: 'Seasonal', body: 'Mosquitoes breed in standing water and rest in shady, humid spots. Empty containers weekly, clean gutters, add a fan to your patio, and schedule barrier treatments through the season. A little effort makes a big difference in your comfort outdoors.', metaTitle: 'Mosquito-Proof Your Backyard This Summer | Rogue Pest Solutions', metaDescription: 'Practical tips to reduce mosquitoes and reclaim your backyard this summer.' },
    { title: 'Termite Warning Signs Every Homeowner Should Know', category: 'Home Tips', body: 'Termites work quietly. Watch for mud tubes along the foundation, discarded wings near windows, hollow-sounding wood, and tight-fitting doors. Early detection limits damage — schedule an annual inspection and act quickly if you spot the signs.', metaTitle: 'Termite Warning Signs Every Homeowner Should Know | Rogue Pest Solutions', metaDescription: 'Learn the early warning signs of termites and protect your home with timely inspections.' },
  ]
  const publishedAt = new Date().toISOString()
  for (const p of posts) {
    await upsert(
      'posts',
      { title: { equals: p.title } },
      {
        title: p.title,
        content: rt(p.body),
        _status: 'published',
        publishedAt,
        categories: catId[p.category] ? [catId[p.category]] : [],
        meta: { title: p.metaTitle, description: p.metaDescription },
      },
    )
  }
  log(`posts upserted: ${posts.length}`)

  // --------------------------------------------------------------------- Forms
  // "Free Quote" form powers the home-hero quote form. Field names match the
  // inputs rendered in src/heros/HighImpact/QuoteForm.tsx.
  const selOpts = (labels: string[]) => labels.map((l) => ({ label: l, value: l }))
  await upsert(
    'forms' as CollectionSlug,
    { title: { equals: 'Free Quote' } },
    {
      title: 'Free Quote',
      submitButtonLabel: 'Request Free Quote',
      confirmationType: 'message',
      confirmationMessage: doc(paragraphNode('Thank you! We received your request and will reach out shortly.')),
      fields: [
        { blockType: 'text', name: 'f_name', label: 'Full Name', required: true, width: 100 },
        { blockType: 'text', name: 'phone_number', label: 'Phone', required: true, width: 100 },
        { blockType: 'email', name: 'email_address', label: 'Email', required: true, width: 100 },
        {
          blockType: 'select',
          name: 'concern',
          label: 'How can we help you?',
          required: true,
          width: 100,
          options: selOpts(['General Pest Control', 'Mosquito Control', 'Termite Control', 'Rodent Control', 'Other']),
        },
        { blockType: 'text', name: 'location', label: 'Location to quote', required: true, width: 100 },
        {
          blockType: 'select',
          name: 'describes_you',
          label: 'Which best describes you?',
          required: true,
          width: 100,
          options: selOpts(['Homeowner', 'Business Owner', 'Property Manager', 'Other']),
        },
        {
          blockType: 'checkbox',
          name: 'sms_consent',
          label:
            'By checking this box, you agree to receive text messages from Rogue Pest Solutions about appointment reminders, follow-ups, and billing. Reply STOP to opt out at any time. Text HELP to 866-370-7378 for assistance. Message and data rates may apply. Message frequency may vary. See our Privacy Policy and Terms & Conditions for details.',
          required: true,
          width: 100,
        },
      ],
    },
  )
  log('forms upserted: Free Quote')

  // ------------------------------------------------------------------- Globals
  await payload.updateGlobal({
    slug: 'company-info',
    data: {
      companyName: 'Rogue Pest Solutions',
      phone: '+1 (866) 370-7378',
      email: 'contact@roguepest.com',
      streetAddress: '84 Coy Drive',
      city: 'Chelsea',
      state: 'AL',
      zip: '35043',
      businessHours: 'Mon – Sun: 8AM – 9PM',
      googleRating: '4.9',
      facebookRating: '5.0',
      primaryCtaText: 'Request a Quote',
      primaryCtaUrl: '/contact',
    } as any,
    context: ctx,
  })

  const navLink = (label: string, url: string): any => ({
    link: { type: 'custom', url, label, newTab: false },
  })
  await payload.updateGlobal({
    slug: 'header',
    data: {
      promoBar: {
        enabled: true,
        message: '🔥 Keep your backyard bite‑free all season - Call Now! 🔥',
      },
      customerPortalUrl: '#',
      navItems: [
        navLink('About Us', '/about-us'),
        navLink('Services', '/services'),
        navLink('Locations', '/locations'),
        navLink('Contact', '/contact'),
        navLink('Request a Quote', '/contact'),
      ],
    } as any,
    context: ctx,
  })
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      tagline: 'Trusted Services For Homes',
      navItems: [
        navLink('Home', '/'),
        navLink('About Us', '/about-us'),
        navLink('Contact us', '/contact'),
        navLink('Testimonials', '/#testimonials'),
        navLink('FAQs', '/#faqs'),
        navLink('Local Links', '/locations'),
      ],
      supportLinks: [
        navLink('Customer Portal', '#'),
        navLink('Privacy Policy', '/privacy-policy'),
        navLink('Terms & Conditions', '/terms-and-conditions'),
        navLink('Rogue Pest Blog', '/posts'),
      ],
      social: {
        facebook: 'https://facebook.com',
        linkedin: 'https://linkedin.com',
        youtube: 'https://youtube.com',
      },
      credit: {
        prefix: 'Designed & Managed with ❤️ by',
        name: 'SAVAGE',
        url: 'https://savagestrategic.io',
      },
    } as any,
    context: ctx,
  })
  log('globals updated: company-info, header, footer')

  // --------------------------------------------------------------------- Pages
  // Reuse an existing (non-icon) media record for the hero background if present.
  const media = await payload.find({ collection: 'media', limit: 50, depth: 0 })
  // Pick a real photograph for the hero / section imagery. Exclude uploaded UI
  // assets (icons, screenshots, the process connector, logos/monograms) — these
  // would otherwise be chosen just because they are newer than the photo.
  const isUiAsset = (f: string) => /icon|screenshot|progress|logo|monogram/i.test(f)
  const isPhoto = (f: string) => /\.(jpe?g|png|webp)$/i.test(f)
  const heroMedia =
    media.docs.find((m: any) => isPhoto(m.filename || '') && !isUiAsset(m.filename || '')) ||
    media.docs.find((m: any) => !isUiAsset(m.filename || '')) ||
    media.docs[0]
  const heroMediaId = heroMedia?.id

  const ctaLink = (label: string, url: string, appearance: 'default' | 'outline'): any => ({
    link: { type: 'custom', appearance, url, label, newTab: false },
  })

  const homeHero: any = heroMediaId
    ? {
        type: 'highImpact',
        media: heroMediaId,
        richText: doc(
          headingNode('Your Guard Against Pests in Alabama!', 'h1'),
          paragraphNode(
            'Rogue Pest Solutions delivers expert pest, termite, and mosquito control across Greater Birmingham, Huntsville, Rainbow City, Cullman, and Foley, AL. We’re here to protect your homes and businesses.',
          ),
        ),
        links: [
          ctaLink('Request a Quote', '/contact', 'default'),
          ctaLink('Call 866-370-7378', 'tel:+18663707378', 'outline'),
        ],
        trustBullets: [
          { text: 'Experienced Team', icon: 'users' },
          { text: 'Clear Communication', icon: 'message' },
          { text: 'Result Guarantee', icon: 'badge' },
        ],
        ratingBadge: { enabled: true, source: 'facebook', rating: '5.0', label: 'Customer Rating' },
      }
    : {
        // No media available → Low Impact hero (media not required). Upgrade to
        // High Impact in the admin once a hero image is uploaded.
        type: 'lowImpact',
        richText: doc(
          headingNode('Your Guard Against Pests in Alabama!', 'h1'),
          paragraphNode('Reliable, eco-friendly pest control for homes and businesses across Alabama.'),
        ),
      }

  const homeLayout: any[] = [
    { blockType: 'testimonials', heading: 'What Our Customers Say', subheading: 'Trusted across Alabama', populateBy: 'automatic', featuredOnly: true, showRating: true, limit: 3 },
    {
      blockType: 'ourStory',
      eyebrow: 'Who We Are',
      heading: 'Our Story',
      body: 'Rogue Pest Solutions is your trusted partner in effective and eco-friendly pest management in Alabama. Specializing in residential and commercial pest control, we expertly handle ants, termites, mosquitoes, and more. Our team, equipped with the latest technology and environmentally responsible techniques, ensures your property remains pest-free. Experience prompt, professional service with a customer-centric approach. Contact us for a pest-free peace of mind!',
      checklist: [
        { title: 'Customized Treatments:', text: 'Every service is tailored to your property and pest concerns' },
        { title: 'Safe & Effective Solutions:', text: 'Family- and pet-friendly products with proven results' },
        { title: 'Reliable Local Experts:', text: 'Experienced technicians who understand your area and its pest challenges' },
      ],
      link: { type: 'custom', url: '/about-us', label: 'Learn More', newTab: false },
      stats: [
        { value: '450', suffix: '+', label: 'Homes & Businesses Protected' },
        { value: '1,200', suffix: '+', label: 'Inspections Completed' },
        { value: '6,800', suffix: '+', label: 'Treatments Administered' },
        { value: '250', suffix: '+', label: 'Five-Star Reviews' },
      ],
      showTruck: true,
    },
    {
      blockType: 'servicesTabs',
      heading: 'Our Pest Control Services: Tailored, Effective, Safe.',
      subheading:
        'See our range of specialized pest control services designed to meet the unique needs of your Greater Birmingham home or business.',
      populateBy: 'automatic',
      limit: 6,
      ctaHeading: 'Contact Rogue Pest Solutions Today',
    },
    { blockType: 'process', eyebrow: 'Stress-Free from Start to Finish', heading: 'Our Clear and Proven Process', steps: [
      { iconColor: 'yellow', title: 'Request Quote', description: 'Get started with a fast and free online quote for professional pest control services designed to protect your home or business.' },
      { iconColor: 'white', title: 'Review & Approve Your Quote', description: 'Carefully review your customized estimate and approve it with one simple click to move forward with your pest treatment plan.' },
      { iconColor: 'yellow', title: 'Schedule Your Service', description: 'Choose a convenient appointment time, and our team will confirm your visit and prepare for your inspection or treatment service.' },
      { iconColor: 'white', title: 'Enjoy a Pest-Free Property', description: 'Relax while our experienced technicians handle the hard work, helping keep your home or business protected from unwanted pests year-round.' },
    ], cta: { label: '866-370-7378', url: 'tel:8663707378' } },
    { blockType: 'whyChooseUs',
      eyebrow: 'Dedicated to Quality Service and Community Engagement',
      heading: 'Why Birmingham, Alabama Homeowners Choose Us',
      intro: 'Rogue Pest Solutions isn’t just about pest control; we’re committed to making a positive impact in the communities we serve throughout Alabama.',
      ...(heroMediaId ? { image: heroMediaId } : {}),
      features: [
        { title: 'Commitment to Excellence', description: 'Our team is dedicated to providing the highest quality of service, ensuring effective and lasting pest control solutions for every client.' },
        { title: 'Community Involvement', description: 'Beyond pest control, we actively participate in community initiatives and support local causes in Cullman, Foley, Gadsden, Birmingham and Huntsville, Alabama.' },
        { title: 'Fast, Reliable Local Response', description: 'We know pest issues can’t wait. Our team responds quickly with flexible scheduling and prompt service to restore comfort and peace of mind to your home.' },
        { title: 'Safe & Family-Friendly Treatments', description: 'Your safety comes first. We use carefully selected products and methods that are effective against pests while being safe for your family and pets.' },
      ],
      buttons: [
        { label: 'Get a Free Quote', url: '/contact' },
        { label: '866-370-7378', url: 'tel:8663707378', showPhoneIcon: true },
      ],
    },
    { blockType: 'faq', subheading: 'Have questions?', heading: 'We’ve got the answers', populateBy: 'automatic', limit: 10 },
    { blockType: 'blogPosts', eyebrow: 'We Stop Bugs', heading: 'Rogue Pest Solutions Pest Blog Posts', limit: 3 },
    { blockType: 'serviceAreas', eyebrow: 'Local Service You Can Count On', heading: 'Proudly Serving Homes & Businesses Across Alabama', description: 'Rogue Pest Solutions provides reliable pest control services throughout Birmingham, Huntsville, Cullman, Foley, Rainbow City, Gadsden, and surrounding Alabama communities.', populateBy: 'automatic' },
  ]

  await upsert(
    'pages',
    { slug: { equals: 'home' } },
    {
      title: 'Home',
      slug: 'home',
      _status: 'published',
      hero: homeHero,
      layout: homeLayout,
      meta: { title: 'Rogue Pest Solutions | Pest Control in Alabama', description: 'Eco-friendly pest control for homes and businesses across Alabama. Termite, mosquito, rodent, and more.' },
    },
  )

  const contactLayout: any[] = [
    {
      blockType: 'content',
      columns: [
        {
          size: 'full',
          richText: doc(
            headingNode('Get in Touch', 'h2'),
            paragraphNode('Phone / SMS: 866-370-7378   ·   Email: contact@roguepest.com'),
            paragraphNode('Business Hours: Mon – Sun: 8AM – 9PM'),
            paragraphNode('Main Office: 84 Coy Drive, Chelsea, AL 35043'),
            paragraphNode('Prefer to talk? Call or text us anytime during business hours. For quotes, use the form (added once a Form is created) or call us directly.'),
          ),
          enableLink: false,
        },
      ],
    },
    { blockType: 'serviceAreas', heading: 'Areas We Serve', subheading: 'Proudly serving homes & businesses across Alabama', populateBy: 'automatic', showImages: true, showExcerpts: true, buttonText: 'View All Locations', buttonUrl: '/locations' },
    { blockType: 'faq', heading: 'Common Questions', populateBy: 'automatic', filterByTopic: 'general', limit: 6 },
  ]

  await upsert(
    'pages',
    { slug: { equals: 'contact' } },
    {
      title: 'Contact',
      slug: 'contact',
      _status: 'published',
      hero: {
        type: 'lowImpact',
        richText: doc(
          headingNode('Contact Rogue Pest Solutions', 'h1'),
          paragraphNode('Have a pest problem or a question? Reach out — we respond fast and we’re happy to help.'),
        ),
      },
      layout: contactLayout,
      meta: { title: 'Contact Rogue Pest Solutions', description: 'Get in touch with Rogue Pest Solutions for fast, friendly pest control across Alabama.' },
    },
  )
  const aboutLayout: any[] = [
    {
      blockType: 'ourStory',
      eyebrow: 'Who We Are',
      heading: 'Our Story',
      body: 'At Rogue Pest Solutions, we’re committed to delivering dependable pest control solutions that protect what matters most—your home, your business, and your peace of mind. Our team brings years of hands-on experience and local expertise to every job, ensuring treatments are tailored to the specific pest challenges in your area.',
      checklist: [
        { title: 'Customized Treatments:', text: 'Every service is tailored to your property and pest concerns' },
        { title: 'Safe & Effective Solutions:', text: 'Family- and pet-friendly products with proven results' },
        { title: 'Reliable Local Experts:', text: 'Experienced technicians who understand your area and its pest challenges' },
      ],
      link: { type: 'custom', url: '/contact', label: 'Contact Us', newTab: false },
      stats: [
        { value: '450', suffix: '+', label: 'Homes & Businesses Protected' },
        { value: '1,200', suffix: '+', label: 'Inspections Completed' },
        { value: '6,800', suffix: '+', label: 'Treatments Administered' },
        { value: '250', suffix: '+', label: 'Five-Star Reviews' },
      ],
      showTruck: false,
    },
    {
      blockType: 'ourApproach',
      eyebrow: 'Our Approach',
      heading: 'Who We Serve',
      intro: 'At Rogue Pest Solutions, we help homeowners and businesses stay protected with reliable, results-driven pest control services tailored to local conditions.',
      listHeading: 'We help:',
      items: [
        { label: 'Inspection:', text: 'A thorough evaluation of your property to identify pest activity, entry points, and risk areas' },
        { label: 'Treatment:', text: 'Targeted applications including sprays, baits, and traps to effectively eliminate active infestations' },
        { label: 'Prevention:', text: 'Proactive solutions such as sealing entry points and reducing attractants to stop pests from returning' },
        { label: 'Monitoring:', text: 'Ongoing service and follow-ups to ensure long-term protection and a pest-free environment' },
      ],
      footnote: 'Serving communities across Alabama—including Greater Birmingham, Gulf Coast, Huntsville, Cullman, and Gadsden—we offer comprehensive pest control programs, one-time treatments, and commercial pest management solutions you can depend on.',
      buttonLabel: 'Contact Us',
      buttonUrl: '/contact',
      ...(heroMediaId ? { image: heroMediaId } : {}),
    },
    {
      blockType: 'marquee',
      text: 'Pest Control Services in Greater Birmingham • Gulf Coast • Huntsville • Cullman • Rainbow City / Gadsden — Residential & Commercial Solutions',
    },
    {
      blockType: 'mission',
      heading: 'We Are on a Mission',
      subheading: 'We’re dedicated to protecting homes and businesses with reliable, long-lasting pest control solutions you can trust.',
      tabs: [
        { label: 'Our Mission', heading: 'Our Mission', body: 'To deliver safe, effective, and customized pest control services that not only eliminate current issues but also prevent future infestations—giving our customers confidence and peace of mind.' },
        { label: 'Our Values', heading: 'Our Values', body: 'Integrity, reliability, and genuine care guide everything we do. We treat every home and business like our own—earning trust through honest communication and dependable results.' },
      ],
      card: {
        heading: 'Contact Rogue Pest Solutions Today',
        body: 'If you’re facing pest issues in your Alabama home, don’t wait for the problem to worsen. Contact Rogue Pest Solutions at 866-370-7378 for expert residential pest control services. Our team is ready to inspect your property, provide tailored solutions, and help you maintain a pest-free home. Call today to schedule your appointment!',
        phone: '866-370-7378',
        phoneUrl: 'tel:8663707378',
        secondaryLabel: 'Learn More',
        secondaryUrl: '/contact',
      },
    },
    {
      blockType: 'promoBanner',
      heading: 'Discover the Long-Term Benefits of Sentricon',
      body: 'Protect Your Home from Termites with Rogue Pest Solutions and Sentricon’s Always Active Baiting System.',
      buttonLabel: 'Learn More',
      buttonUrl: '/services',
      ...(heroMediaId ? { image: heroMediaId } : {}),
    },
    {
      blockType: 'whyChooseAccordion',
      eyebrow: 'Why Choose Us',
      heading: 'Reliable Pest Control—No Surprises, Just Results',
      body: 'When you choose Rogue Pest Solutions, you’re getting more than a basic treatment. We provide inspection-driven pest control tailored to your home or business across Alabama. Our team identifies the problem, finds how pests are getting in, treats the right areas, and clearly explains every step—so you always know what to expect. No guesswork. No shortcuts. Just honest service and dependable results.',
      buttonLabel: 'Request Free Quote',
      buttonUrl: '/contact',
      items: [
        { title: 'Experienced Professionals', body: 'Our skilled technicians bring years of hands-on experience and local knowledge to effectively handle any pest problem.' },
        { title: 'Licensed & Insured', body: 'Fully licensed and insured, so you’re protected and in trusted hands on every visit.' },
        { title: 'Safe & Family-Friendly Treatments', body: 'We use carefully selected products and methods that are effective against pests while being safe for your family and pets.' },
        { title: 'Customized Solutions', body: 'Every treatment plan is tailored to your property and your specific pest concerns.' },
        { title: 'Family-Owned', body: 'A family-owned business that treats your home and family like our own.' },
        { title: 'Locally Owned', body: 'Proudly local and invested in the Alabama communities we serve.' },
        { title: 'Customer Satisfaction Guaranteed', body: 'We stand behind our work with a satisfaction guarantee on every service.' },
      ],
    },
    { blockType: 'testimonials', heading: 'What Our Customers Say', subheading: 'Trusted by Birmingham, Cullman, Gadsden, Rainbow City, Foley and Huntsville, Alabama Homeowners', populateBy: 'automatic', featuredOnly: true, showRating: true, limit: 3 },
    { blockType: 'serviceAreas', eyebrow: 'Local Service You Can Count On', heading: 'Proudly Serving Homes & Businesses Across Alabama', description: 'Rogue Pest Solutions provides reliable pest control services throughout Birmingham, Huntsville, Cullman, Foley, Rainbow City, Gadsden, and surrounding Alabama communities.', populateBy: 'automatic' },
  ]

  await upsert(
    'pages',
    { slug: { equals: 'about-us' } },
    {
      title: 'About Us',
      slug: 'about-us',
      _status: 'published',
      hero: {
        type: 'inner',
        badge: 'Top-Rated Pest Control in Alabama',
        showRatings: true,
        ...(heroMediaId ? { media: heroMediaId } : {}),
        richText: doc(
          headingNode('Your Trusted Partner for Safe & Effective Pest Control', 'h1'),
          paragraphNode(
            'Reliable, eco-friendly pest control for homes and businesses—delivering lasting protection you can trust.',
          ),
        ),
      },
      layout: aboutLayout,
      meta: {
        title: 'About Rogue Pest Solutions',
        description:
          'Learn about Rogue Pest Solutions — your trusted partner for safe, effective, eco-friendly pest control across Alabama.',
      },
    },
  )
  log('pages upserted: home, contact, about-us')

  // ------------------------------------------------------------------ Summary
  log('—')
  log('SEED COMPLETE.')
  log(`Hero image: ${heroMediaId ? `reused existing media #${heroMediaId}` : 'NONE — homepage hero is Low Impact; upload a hero image and switch to High Impact'}`)
  log('MANUAL FOLLOW-UPS (not seeded):')
  log('  • Upload images: hero, 2 services (general-pest, mosquito have none), 5 location heroes, blog heroes.')
  log('  • Create Forms (Free Quote, Instant Estimate) and add formBlock to Home (top + bottom) and Contact.')
  log('  • Delete the stray page with slug "h" (the real homepage is now slug "home").')
}

// Top-level await so `payload run` (which awaits module evaluation) blocks until
// all seeding completes before the process exits.
try {
  await main()
  console.log('[seed:rogue] done.')
  process.exit(0)
} catch (err) {
  console.error('[seed:rogue] FAILED:', err)
  process.exit(1)
}
