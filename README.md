# Faith & Maxwell Construction — website

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · three.js

A redesign concept for Faith & Maxwell Construction, Cobham, Surrey.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Deploy

Zero-config on Vercel: push to GitHub, import the repo, deploy. No environment
variables are required. It also builds anywhere that runs `next build`
(Netlify, Render, a Node server, Docker).

> The build fetches Fraunces and Archivo from Google Fonts at build time. If you
> build inside a network-restricted CI runner, either allow `fonts.googleapis.com`
> and `fonts.gstatic.com` or switch `app/layout.tsx` to `next/font/local`.

## Adding the real photography

Every image on the site is declared in **`content/media.ts`** and, for projects,
in the `hero` / `gallery` fields of **`content/projects.ts`**. While `src` is
`null`, a labelled architectural placeholder renders in its place.

To go live with real photos:

1. Drop files into `public/images/`.
2. Set `src: '/images/your-file.jpg'` and write a descriptive `alt`.

That's it — no component changes. `next/image` handles sizing, lazy loading and
AVIF/WebP conversion automatically.

## Adding the real testimonials

`content/testimonials.ts` ships with clearly marked placeholders. **No review
text has been written or invented.** Paste the genuine reviews from the current
site, set `placeholder: false`, and the "placeholder" notice disappears on its own.

## Wiring up the enquiry form

`components/EnquiryForm.tsx` currently prevents submission and shows a success
state. Replace the `onSubmit` handler with a POST to your endpoint (a Next.js
route handler, Formspree, or your CRM).

## The 3D

Two WebGL scenes, both `three.js`, both loaded with `next/dynamic({ ssr: false })`
so they never block first paint:

- **`components/HeroScene.tsx`** — a scroll-driven camera flight around a
  detached house. The hero section is 4 screens tall; the canvas sticks while a
  Catmull-Rom spline carries the camera through four framed shots, with the
  headline changing at each beat.
- **`components/BuildScene.tsx`** — the four construction stages (groundworks →
  RC frame → envelope → fit-out), each fading and growing in. Drag to orbit.

**`lib/procedural.ts`** generates every texture (brick, concrete, gravel, grass,
timber, water normals, sky gradient) on a `<canvas>` at runtime, so the scenes
ship with **zero texture downloads**. Lighting is image-based via three's bundled
`RoomEnvironment` with ACES filmic tone mapping.

Both scenes pause when scrolled out of view, cap device pixel ratio, disable
shadows under 820px, honour `prefers-reduced-motion`, and dispose of all GPU
resources on unmount.

### Making the house match a real project

The geometry lives in `HeroScene.tsx` under the `/* the house */` comment and is
assembled from labelled primitives (`house.add(box(...))`). Dimensions are in
metres. To model one of their actual builds, adjust those values — or swap the
whole group for a `GLTFLoader` load if you get a model from the architect.

## Content

All copy and data sit in `content/` — nothing is hard-coded in components:

| File | Holds |
| --- | --- |
| `company.ts` | Contact details, address, hours, areas, warranty, budget bands |
| `services.ts` | The 10 services, their copy and homepage grid weights |
| `projects.ts` | The 6 projects and their full case studies |
| `testimonials.ts` | Reviews (placeholders until filled) |
| `media.ts` | Site-wide image slots |

## SEO

`LocalBusiness`/`GeneralContractor` schema in `lib/schema.ts` (injected sitewide),
per-service `Service` schema, per-route titles/descriptions/canonicals, Open
Graph, and generated `sitemap.xml` + `robots.txt`.

## Content integrity

Nothing here is invented: no awards, certifications, client names, project costs,
review text, ratings or project counts. Everything comes from the existing site.
Project photography and testimonials are visibly marked as placeholders.
