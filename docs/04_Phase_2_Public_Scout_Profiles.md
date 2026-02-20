**Phase 2 — Public Scout Profiles (Read-Only)**

Purpose
- Publish non-sensitive, public scout profiles to celebrate achievements while minimizing privacy risks.

Functional Requirements
- Public profile pages for scouts with limited fields.
- Search functionality by name, unit, rank.
- Unique Scout ID system independent of personal identifiers.

URL Patterns
- Public Scout profile: `/scouts/:scout_id` (canonical; `scout_id` == `KIL-YYYY-NNNNN`)
- Search page: `/scouts/search?q=NAME&unit=UNIT_ID&rank=RANK`
- Unit listing: `/units/:unit_id/scouts`

Data Exposure Rules (strict)
- Allowed public fields:
  - `scout_id` (system ID)
  - `display_name` (first-name or preferred name only — NO full legal name for minors)
  - `unit_name` and `unit_id`
  - `rank` (text label)
  - `public_achievements` (badge name and awarded year only)
  - `profile_photo_url` only if explicit guardian consent exists and was recorded.
  - `bio` (short, non-sensitive; sanitized; optional)
- Forbidden public fields (must never appear in public JSON):
  - Date of birth, phone numbers, home address, guardian names, government ID numbers, school name, detailed timestamps of activities, internal notes.

Scout ID System
- Conventions: `KIL-YYYY-XXXXX`
  - `KIL` fixed district prefix.
  - `YYYY` enrolment year (e.g., 2026).
  - `XXXXX` zero-padded sequence per year (00001..99999).
- Generation: assigned by backend sequence (Phase 3); for Phase 2 use seeded IDs in JSON.
- Advantages: non-guessable personal linkage when combined with other access controls; remains stable while transfers between units occur.

Ranking Display Logic
- Ranks are displayed as canonical labels stored centrally (e.g., `Tenderfoot`, `Second Class`).
- Display ranking history as year-only entries (e.g., `Second Class (2024)`).

Search
- Search backend (or static search index) should implement these constraints:
  - Only search allowed public fields.
  - Rate-limit search queries to avoid scraping.

Privacy Boundaries and Consent
- `profile_photo_url` may only be shown if `photo_public_consent == true` and an evidence record is stored (see Consent record in `09_Data_Models.md`).
- Public profile shows a minimal `display_name` (first name or nickname) for minors under `MINOR_AGE`.
- If a guardian revokes consent, the photo and bio must be removed within 24 hours.

Risk Analysis for Exposing Rank Publicly
- Risk: malicious actors combining rank + unit + public events might profile minors’ locations/times.
- Mitigations:
  - Only show unit name, not exact patrol or meeting addresses.
  - Avoid event timestamps on public profile — present event year only.
  - Rate-limit public APIs and enable bot detection.
  - Owners of profile photos must provide consent; default no-photo for minors.

Operational Controls
- Public profile change requests must be handled via authenticated workflows (Phase 4) — public data cannot be changed through any unauthenticated endpoint.
- Maintain an automated public-data audit every 90 days to ensure no forbidden fields have leaked.

Integration Notes
- Phase 2 uses same TypeScript contracts as Phase 1 but with explicit public DTOs `ScoutPublicDTO`.
- Prepare migration scripts that map existing JSON to backend schema (Phase 3), preserving `scout_id`.
