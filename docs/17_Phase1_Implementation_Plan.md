**Phase 1 Implementation Plan — Detailed Sprint Plan**

Goal
- Deliver a production-ready static frontend (public pages: Home, About, Units, Events, News, Contact) with seeded JSON data and a Promise-based API abstraction so backend integration will not require UI refactors.

Scope
- Deliverables:
  - Frontend scaffold (Vite + React + Tailwind)
  - `src/lib/contracts.ts` and `src/lib/api.ts` (fake APIs)
  - Seed data in `src/data` (units, scouts.public, events, news)
  - Basic accessible components and pages
  - Deployment to Vercel/Netlify (manual step documented)

Team and Roles
- Frontend lead: implement scaffold, components, and API contracts.
- UX lead: iterate on design tokens and accessibility.
- Product owner: review content and approve go-live.

Timeline: 2-week plan (can be done in one focused week by 1-2 engineers)
- Day 1: Repo scaffold, `contracts.ts` and `api.ts` stubs, seed data added.
- Day 2: Implement pages and core components (Header, Footer, ScoutCard).
- Day 3: Accessibility pass, Tailwind tokens, responsive checks.
- Day 4: Lighthouse checks, performance tuning (lazy loading images), add monitoring and Sentry stub.
- Day 5: Prepare deploy settings, configure Vercel/Netlify, stakeholder demo.

Technical Tasks (actionable checklist)
- [ ] Initialize Vite + TypeScript project (done in `frontend/`).
- [ ] Add Tailwind CSS and design tokens (done).
- [ ] Add `contracts.ts` data contracts (done).
- [ ] Add `api.ts` fake APIs with Promise-based latency (done).
- [ ] Create pages: Home, About, Units, Events, News, Contact (done).
- [ ] Create components: Header, Footer, ScoutCard (done).
- [ ] Add seed JSON in `src/data` (done).
- [ ] Add `index.css` with Tailwind directives and token variables (done).
- [ ] Add `package.json` scripts for dev/build/preview (done).
- [ ] Create `README.md` with run instructions (next step).

Acceptance Criteria
- `npm run dev` starts local server and pages render (developer runs locally).
- All pages use only `lib/api.ts` to fetch data — no direct data imports in page components except `api.ts` internals.
- Manual accessibility checks pass basic keyboard navigation and color contrast.
- Lighthouse score >= 90 for Performance and Accessibility on desktop (baseline documented).

Deployment Checklist (to perform manually)
- Create a Vercel project pointing to this repo; set root to `/frontend`.
- Build command: `npm run build`, Output directory: `dist`.
- Enable previews for branches.

Risks and Mitigations
- Risk: seed data leaks PII. Mitigation: all seed data is public-only and synthetic.
- Risk: time constraints. Mitigation: minimal viable components shipped; polish in iteration.

Iteration Plan
- After initial deploy, iterate on:
  1. Replace fake `api.ts` with real `/api/v1` calls behind feature flag.
  2. Add unit pages for single unit view and public scout profile page stub.
  3. Add search using static Lunr.js index for Phase 2 preview.

Next Steps for Me (pick one)
- Create `README.md` in `/frontend` with run and deploy instructions and a short demo script.
- Wire basic Sentry init and provide instructions for adding DSN.
- Create Vercel deployment configuration file `vercel.json` and example environment settings.
