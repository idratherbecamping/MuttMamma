# CLAUDE.md

Live website for **Mutt Mama Dog Training** (Yvette Warner, Southern California, in-home dog training). Live at https://muttmama.net (www redirects there), hosted on Vercel.

## How the site is built

- One page: `index.html`, plus `script.js` and `styles.css`. No build step. Tailwind comes from the CDN (`cdn.tailwindcss.com`) and is configured inline at the top of `index.html` (brand colors: `sage`, `terracotta`, `navy`, `coral`, `cream`, `charcoal`).
- Images are in `imagery/` and videos in `videos/`. `support/` holds raw source material (testimonial screenshots, photo shoots) and isn't published content.
- The contact form is a JotForm embed in the `#contact` section.
- Preview locally: `python3 -m http.server 8000`, then open http://localhost:8000.

## Page sections (in order)

`#home` hero (headline, price cards) · `#training` programs and pricing, including the 21-Day Transformation, the `#aggression-cases` terms, the hold fee, and the FAQ · `#commitment` · "Is This You and Your Dog?" video · `#testimonials` · `#social-club` · "Meet Yvette Warner" bio · `#dogs` adoptable dogs · `#contact` form, phone and email · footer.

## Editing rules

- **Prices and terms appear in several places.** Before changing a price, fee, duration or discount, `grep -n` for the old value across `index.html` and update every occurrence: hero cards, pricing cards, FAQ, aggression-case box and contact blurb. Keep them consistent.
- Phone `(949) 636-3469` and email `muttmamadogtrainer@gmail.com` appear in the hero, contact section and footer. Change them everywhere at once.
- Keep the existing look: reuse the Tailwind classes and colors already on the page rather than adding new CSS.
- New photos go in `imagery/` as web-sized JPG or WebP (around 1600px on the long side, under about 400 KB), with descriptive `alt` text.

## Deploying

Pushing to `main` deploys to production on Vercel; other branches get preview URLs. The Avalon site bot (a scheduled Claude routine handling Yvette's change requests by email, configured in `idratherbecamping/website-management`) pushes `claude/*` branches with `[auto-deploy]` in the commit message. `.github/workflows/auto-deploy.yml` then merges them into `main`.
