**Phase 1 — Frontend-Only Static Launch**

Purpose
- Launch a production-grade, static web presence to establish credibility and allow early stakeholder feedback.

Technical Stack (recommended)
- Framework: React with Vite (recommended) or Next.js using static export.
- Styling: Tailwind CSS with design tokens.
- Data: JSON files stored with the repo and bundled; API abstraction layer (fake Promise-based services).
- Hosting: Vercel (preferred) or Netlify.

Repository Folder Structure (frontend)
- `/src`
  - `/components` — reusable presentational components
  - `/layouts` — site-level layouts (PublicLayout, ProfileLayout)
  - `/pages` — Vite/React-router pages: Home, About, Units, Events, News, Contact
  - `/lib` — shared utilities
    - `api.ts` — API abstraction layer (returns Promises)
    - `contracts.ts` — TypeScript data contracts (interfaces matching future backend)
  - `/data` — JSON content files (units.json, scouts.public.json, events.json, news.json)
  - `/styles` — Tailwind config, design tokens
  - `/assets` — images, logos
  - `main.tsx` — app bootstrap

API Simulation Pattern
- Provide a single `lib/api.ts` that exports functions returning Promises and intentionally abstracts data source.
- Example:
  - `getUnits(): Promise<Unit[]>` — reads from `/data/units.json` via import or fetch.
  - `getEvents(query): Promise<Event[]>` — returns filtered results with simulated latency and pagination.
- Important: components must call `api.getX()` and never read `/data/*.json` directly.

Data Contracts (TypeScript interfaces)
- Define explicit contracts in `contracts.ts` mirroring eventual backend schema.
- Example `ScoutPublic` (Phase 1):
```
interface ScoutPublic {
  scout_id: string; // e.g. KIL-2026-000123
  display_name: string;
  unit_id: string;
  rank: string; // human-readable
  profile_photo_url?: string;
  bio?: string;
  public_achievements?: Array<{ badge_id: string; name: string; awarded_on?: string }>;
}
```

Hosting Strategy
- Use Vercel/Netlify with Git-based deploys.
- Branch deployment for staging and `main` branch for production.
- Enable global CDN, automatic HTTPS, and response caching.

Deployment Checklist
- [ ] Build passes locally: `npm run build`
- [ ] Linting/CSS checks pass
- [ ] Test simulated API responses for edge cases
- [ ] Configure environment variables (e.g., `PUBLIC_BASE_URL`)
- [ ] Enable redirects and rewrites (Netlify `_redirects` or Vercel `vercel.json`)
- [ ] Set caching headers for long-term assets
- [ ] Add health-check endpoint as static JSON (for uptime monitoring)

Design for Future Backend Integration (avoid refactor)
- Single API abstraction: `lib/api.ts` is the only module with data-source awareness. When real backend is introduced, replace implementations with network calls without changing components.
- Strict contracts: use TypeScript interfaces for all DTOs.
- Avoid coupling UI logic to data retrieval: components receive data through props from container components calling `api`.
- Keep routing and URL patterns stable (see Phase 2 URL patterns).

Performance & Accessibility
- Pre-render public pages where possible.
- Images: serve responsive sources, lazy-load below the fold.
- Low-bandwidth mode toggle: disable non-critical images and prefetched content.
- Lighthouse score target: >=90 for performance and accessibility on 3G Slow network.

Monitoring and Observability
- Connect static site to uptime monitoring (UptimeRobot) and Sentry for front-end errors.

Security (static phase)
- No sensitive data in JSON files.
- Remove build-time secrets from the repo.

Deliverables for Phase 1
- Production static site deployed to Vercel/Netlify.
- `lib/api.ts` with Promise-based fake APIs.
- JSON data seeded for units, events, news, and public scout summary.
- Deployment checklist completed and documented.
