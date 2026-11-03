# yashmit-vaish

Personal portfolio. Next.js (App Router), exported as a static site.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # writes the static site to out/
```

## Editing

- **All content** (bio, jobs, projects, skills, links) is in `lib/data.ts`. The pages only handle layout.
- **Photo:** put it at `public/me.jpg`. Until then the About card shows your initials.
- **Résumé:** put it at `public/resume.pdf`.
- **Project screenshots:** put an image at `public/work/<slug>.png`, then set `image: "/work/<slug>.png"` on that project in `lib/data.ts`. Without one, the card shows the project's headline number.
- **Terminal commands:** `components/Terminal.tsx`.

## Pages

- `/` the portfolio
- `/work/<slug>/` a write-up for each project, generated from `lib/data.ts`
- `/terminal/` the same portfolio as an interactive shell

## Deploying

Vercel: import the repo, no settings needed. For any other static host (Netlify, Cloudflare Pages, GitHub Pages), run `npm run build` and upload `out/`.
