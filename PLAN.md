# Helping Hands Solutions — Website Plan

Status as of 2026-11-23. Covers the pages still to build and an admin area so the owner can update the site without touching code.

---

## 1. Page status

| Page | Route | Status | What's left |
|---|---|---|---|
| Home | `/` | Built | Replace hero photo with the original file (current one is a phone screenshot with rounded corners and a share icon) |
| About | `/about` | Built | Add founder bio/photo, credentials, mission section |
| Pricing | `/pricing` | Built | Real prices and class lengths (all show "Contact for pricing") |
| FAQ | `/faq` | Built | Confirm certification body and validity period (answer currently says "usually two years") |
| Contact | `/contact` | Placeholder | Booking/contact form that emails via Resend (see 1.1) |
| Courses | `/courses` | Placeholder | One section per course: who it's for, what you learn, length, certification |
| Blog | `/blog` | Placeholder | Post list + post page (content managed from admin) |

### Site-wide to-dos
- [ ] Real logo file (current logo is a hand-drawn SVG approximation)
- [ ] Real Facebook page URL in the header
- [ ] Mobile menu (nav links are hidden on small screens today)
- [ ] Footer: address/service area, phone, email, social links, copyright
- [ ] Confirm course list (CPR & AED, First Aid, combo, BLS) matches what's actually taught
- [ ] SEO: page descriptions, Open Graph image, `sitemap.xml`, `robots.txt`
- [ ] Favicon from the logo

### 1.1 Contact page + Resend
1. Form fields: name, email, phone, organization, course, group size, location (on-site / Trenton center), preferred dates, message.
2. Server Action validates input and sends an email to the business inbox through Resend; sends the visitor a confirmation email.
3. Spam protection: honeypot field + basic rate limiting.
4. **Prerequisite:** DNS access to the domain to verify it in Resend (SPF/DKIM TXT records + MX on a `send.` subdomain). Confirm whether the domain was bought through Durable and whether Durable allows custom DNS records — if not, transfer the domain or move its nameservers.
5. Env vars: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.

---

## 2. Admin area (owner edits the site manually)

### Goal
The owner logs in at `/admin` and can change text, prices, FAQs, photos, and blog posts. Changes go live within seconds — no code, no redeploy.

### Recommended stack
| Need | Choice | Why |
|---|---|---|
| Hosting | Vercel | Built for Next.js; free tier is enough |
| Database | Postgres (Neon or Supabase, via Vercel Marketplace) | Stores all editable content |
| Image uploads | Vercel Blob (or Supabase Storage) | Photos uploaded from the admin |
| Login | Auth.js email magic link, or Supabase Auth | No passwords to manage; only allow-listed emails get in |
| Route protection | `proxy.ts` (Next 16's replacement for `middleware.ts`) + a session check in every admin page and Server Action | Proxy alone is not enough — always re-check on the server |
| Saving | Server Actions | Forms post straight to the server, no separate API |
| Live updates | Cache Components (`'use cache'` + `cacheTag`) and revalidating the tag on save | Public pages stay fast/static, update instantly after an edit |

> Before building, read the bundled docs in `node_modules/next/dist/docs/` — especially `02-guides/authentication.md`, `02-guides/authentication-with-cache-components.md`, `02-guides/forms.md`, and `03-file-conventions/proxy.md`. This Next.js version differs from older tutorials.

### What the owner can edit
| Section | Editable fields |
|---|---|
| Site settings | Business name, tagline, phone, email, Facebook URL, service area, logo |
| Home | Hero heading, intro, hero photo, "no pressure" section, CTA panel text + button label |
| About | Heading, story text, photo, founder bio |
| Courses & pricing | Add/edit/remove/reorder courses: name, icon, description, price, price note, class length, "what's included" list, "Most popular" flag |
| FAQ | Add/edit/remove/reorder questions and answers |
| Blog | Create/edit/publish/unpublish posts: title, slug, cover photo, body, publish date |
| Photos | Upload, replace, delete; alt text required on upload |
| Inquiries | View contact form submissions (also stored in DB, not just emailed) |

### Admin pages
```
/admin/login            Email sign-in
/admin                  Dashboard: recent inquiries, quick links
/admin/settings         Site settings
/admin/pages/home       Edit home content
/admin/pages/about      Edit about content
/admin/courses          Course list (drag to reorder) → /admin/courses/[id]
/admin/faq              FAQ list (drag to reorder) → /admin/faq/[id]
/admin/blog             Post list → /admin/blog/new, /admin/blog/[id]
/admin/media            Photo library
/admin/inquiries        Contact form submissions
```

### Edit → publish flow
1. Owner signs in with their email (magic link).
2. Opens a section, edits the form, clicks **Save**.
3. Server Action checks the session, validates the input, writes to the database.
4. Action revalidates that content's cache tag → the public page shows the change on next load.
5. Success message with a **View on site** link.
6. Optional later: "Save draft" vs "Publish", and a version history for undo.

### Safety rules
- Only allow-listed email addresses can sign in.
- Every Server Action verifies the session (not just the proxy).
- Validate all input on the server; sanitize rich text from blog posts.
- Image uploads: type and size limits (e.g. JPEG/PNG/WebP, max 5 MB).
- Daily database backups (built into Neon/Supabase).

---

## 3. Build order

| Phase | Work | Depends on |
|---|---|---|
| 1 | Finish content gaps: logo, footer, mobile menu, real prices, photo swap | Owner provides assets |
| 2 | Deploy to Vercel; connect domain | DNS access |
| 3 | Contact page + Resend emails | Phase 2, domain verified in Resend |
| 4 | Database + login + `/admin` shell | Phase 2 |
| 5 | Move hardcoded content (`app/data/courses.ts`, FAQ list, page text) into the database; public pages read from it with caching | Phase 4 |
| 6 | Admin editors: settings, home, about, courses, FAQ | Phase 5 |
| 7 | Media library + image uploads | Phase 6 |
| 8 | Blog (admin editor + public `/blog`) and Courses page | Phase 6 |
| 9 | Inquiries inbox, SEO, sitemap, polish | Phases 3, 8 |

## 4. Open questions for the owner
1. Where was the domain bought, and who controls its DNS?
2. Final prices, class lengths, and group discount rules?
3. Which certifying organization (e.g. American Heart Association, Red Cross)?
4. Who besides the owner needs admin access?
5. Should visitors be able to book and pay online, or just send an inquiry?
