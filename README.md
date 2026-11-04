# কবিতার জগৎ | Kobitar Jogot

A bilingual (Bangla/English), mobile-friendly literary website foundation. Built as a static site so it can be hosted on GitHub Pages without a server.

## Current foundation
- Home page, Poems library, Stories library, and reusable work-detail page
- Bangla/English language toggle
- Search within each library
- JSON-driven content catalogue (`data/works.json`)
- Separate content fields for titles, authors, descriptions and original text
- Responsive layout for mobile and desktop
- Initial Kajla Didi entry (short excerpt/demo content; add the complete text only when you have the right to publish it)
- Animation area and scene plan placeholders, ready for a dedicated animation module

## Run locally
Open `index.html` in a browser. Some browsers restrict `fetch()` from local files; for reliable testing, publish to GitHub Pages or use a local development server.

## Publish with GitHub Pages
1. Create a public GitHub repository, e.g. `kobitar-jogat`.
2. Extract this ZIP on your phone.
3. Upload the **contents** of this folder (not the ZIP itself) into the repository root.
4. Open **Settings → Pages**.
5. Under Build and deployment choose **Deploy from a branch**.
6. Select branch `main` and folder `/ (root)`, then Save.
7. Wait for the published URL shown on the Pages screen.

## Add a poem or story
Edit `data/works.json` and add an object to either `poems` or `stories`. Each item needs a unique `id`, `type`, bilingual `title`, `author`, `description`, and `content`. Use `featured: true` to show it on the home page. Add scene names in `scenes`.

The detail page is currently addressed as `work.html?type=poem&id=kajla-didi`. This query-based route is reliable on GitHub Pages. A future build step or CMS can generate cleaner paths such as `/poems/kajla-didi/`.

## Future production roadmap
1. Add a proper animation engine (GSAP + Three.js) as independent modules per work.
2. Add accessible audio controls, captions, reduced-motion support, loading states and performance budgets.
3. Add admin publishing workflow. GitHub Pages is static and cannot securely process admin logins or write content by itself. When ready, connect a secure CMS/backend (for example a Git-based CMS or a hosted database/auth service); never put secret API keys in browser JavaScript.
4. Add content moderation, backups, image/audio optimization, sitemap, SEO metadata and analytics with privacy-conscious settings.

## Important
This is the first working foundation, not the finished animation experience. The animation panel is a placeholder; each literary work will receive its own designed visual experience in later phases.
