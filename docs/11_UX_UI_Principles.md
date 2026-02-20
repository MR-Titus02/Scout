**UX & UI Principles — Kilinochchi District Scout Platform**

Design Tone
- Institutional, respectful, celebratory of scout achievements. Use calm colors and clear typography aligned to scouting identity.

Core Principles
- Mobile-first: design for 360–480px widths first.
- Low-bandwidth optimization: prioritize text and small images, provide low-resolution fallback and progressive image loading.
- Accessibility: WCAG 2.1 AA compliance minimum.
- Consistency: component library with tokens and spacing scale.

Color & Identity
- Primary colors: earth tones + scout green; provide contrast ratios for accessibility.
- Provide a small, documented design token set in Tailwind config.

UI Patterns
- Navigation: clear top-level nav with `Home | Units | Events | News | Contact | (Sign In)`.
- Profiles: card-based layout; emphasize achievements and unit association.
- Forms: inline validation, contextual help text, and accessible error announcements.

Micro-interactions
- Respectful, non-flashy animations. Use subtle fades and movement for state transitions.

UX for Minors & Guardians
- Consent flows: clear, stepwise consent screens with summary and storage details.
- Guardian dashboard: allow guardians to review and approve their minor's requests; record timestamps and reasons for approvals.

Information Architecture
- Keep public content shallow and crawlable. Limit public pages to the core set.

Design Tokens (example)
- `--color-primary: #1E7A3A` (scout green)
- `--space-1: 4px; --space-2: 8px; ...`

Performance & Progressive Enhancement
- Serve critical CSS inline for first paint; defer non-critical JS.
- Use preconnect to CDNs.

Testing & Validation
- Regular usability tests with local units and guardians.
- Track metrics (time-to-complete forms, drop-off rates) to iterate.
