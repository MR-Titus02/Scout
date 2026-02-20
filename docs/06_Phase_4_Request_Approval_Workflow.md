**Phase 4 — Request & Approval Workflow**

Purpose
- Allow scouts to request updates to achievements (badges, ranks) with verifiable proof and an auditable approval path.

Key Concepts
- UpdateRequest: user-submitted claim to change a scout record (award badge, update rank, edit public profile field).
- Verification evidence: files or links provided as proof (photos, signed forms).
- Review queue: Unit Admin / Verification Officer dashboard to triage and decide.

Request Lifecycle States
- `DRAFT` — user composing request.
- `SUBMITTED` — request submitted; pending review.
- `UNDER_REVIEW` — reviewer viewing/collecting evidence.
- `APPROVED` — change applied to canonical record; audit created.
- `REJECTED` — not approved; reviewer must include reason.
- `REOPENED` — applicant provided additional evidence after rejection.
- `CANCELLED` — requester withdrew.

Database Schema (simplified)
- `update_requests` table:
  - `id` (uuid, PK)
  - `request_id` (human-friendly unique; e.g., KIL-REQ-2026-0001)
  - `scout_id` (FK)
  - `applicant_user_id` (FK)
  - `unit_id`
  - `type` (enum: `BADGE`, `RANK`, `PROFILE_UPDATE`)
  - `payload` (JSONB) — contains badge_id, rank_id, notes
  - `attachments` (jsonb) — reference to file storage objects
  - `state` (enum)
  - `assigned_reviewer_id` (nullable)
  - `created_at`, `updated_at`, `resolved_at`

Attachments & Proof
- Storage: S3-compatible object storage with per-object ACL `private` by default.
- File metadata stored in DB: `file_id`, `uploader_id`, `checksum`, `mime_type`, `scan_status`.
- Virus/malware scanning: integrate with a file-scan lambda or vendor; block risky MIME types.

Notification Logic
- Events:
  - `RequestSubmitted` -> notify assigned unit reviewers and create task in queue.
  - `RequestAssigned` -> notify reviewer.
  - `RequestApproved/Rejected` -> notify applicant and scout guardian (if minor).
  - `RequestReopened` -> notify previous reviewer.
- Channels: email, in-app notifications, and optional SMS for high-priority events.

Anti-Abuse Protections
- Rate-limit requests per scout account (e.g., max 3 badge requests per month).
- File integrity: store checksum and require at least two verification artifacts for high-value badges.
- Cross-checkers: for certain badges, require verification by two distinct roles (Verification Officer + Unit Admin).
- Suspicious pattern detection: reuse of the same attachment across multiple claims triggers manual review.

Preventing Fraudulent Badge Claims
- Evidence requirements per badge: map of badge -> minimum evidence type(s) (photo + signed form for multi-day camps, single photo for minor classroom completion).
- Chain of custody: track who uploaded evidence and which reviewer verified it.
- Random audit: automate sample auditing of 10% of approvals monthly.

Audit Logging
- Every transition is recorded in `audit_logs` with `actor_id`, `action`, `before_state`, `after_state`, `timestamp`, `context`.

Review Dashboard UX
- Queue sorted by risk score (computed from missing evidence, applicant history, patchiness).
- Inline evidence viewer with ability to mark checks: `meets_requirements`, `needs_clarification`.
- Reviewer actions: `Approve` (with optional apply-note), `Reject` (reason required), `Request More Info`.

Data Integrity Enforcement
- Upon `APPROVED`, apply change within a DB transaction and write the `AuditLog` entry; if external system integration exists, use outbox pattern.

APIs
- `POST /requests` — create
- `GET /requests?unit_id=&state=` — reviewer queue
- `POST /requests/:id/assign` — assign
- `POST /requests/:id/approve` — approve
- `POST /requests/:id/reject` — reject

Operational Considerations
- Retain attachments for a configurable retention period (see `10_Security_and_Compliance.md`).
- Provide export tools for national reporting (CSV / JSON) and full audit trails for each exported record.
