**Security and Compliance — Kilinochchi District Scout Platform**

Objective
- Protect minors and the organization; define enforceable rules for data handling, access, incident response, backup, and retention.

Public vs Private Data Separation (enforceable rules)
- Public data: `ScoutPublicDTO` — only contains `public_id`, `display_name` (first/preferred name), `unit_name`, `rank_label`, `public_achievements_years`, `profile_photo_url` (only with consent).
- Private data: everything else (DOB, last_name, contact, guardian info, health info).
- Rule: API endpoints must declare exposure level; middleware enforces that private fields are never returned by endpoints marked `public`.

Role Enforcement Policies
- Centralized authorization middleware checks role claim + scope + resource attributes.
- RLS (Row-Level Security) for Postgres: create policies like `SELECT` allowed where `unit_id = current_setting('app.current_unit')::uuid`.

Action Logging Requirements
- All write actions (create/update/delete) on scouts, users, requests, roles must log an `AuditLog` entry within the same DB transaction.
- AuditLog must be append-only; application must never update or delete audit entries.

Backup Strategy
- Database:
  - Daily full snapshots retained 30 days.
  - Continuous WAL archiving for PITR up to 7 days (configurable).
  - Test restore quarterly.
- Attachments:
  - Use S3 versioning with lifecycle transition to cold storage after 90 days.
  - Replicate to secondary region for DR if budget permits.

Data Retention Policy (example enforceable rules)
- Scout personal data retained for duration of membership + 5 years after leaving.
- Public profile records retained while scout has active public consent; when consent revoked, public fields stripped within 24 hours and retention of private records follows membership retention.
- Audit logs retained indefinitely (or for 10 years as per policy) and exportable to trusted archives.

GDPR-style Principles (applying to minors)
- Lawful basis: Legitimate interest for public pages and consent for photos.
- Data minimization: Only store fields required for functionality; never publish PII without consent.
- Right to be forgotten: provide process to remove public data and schedule private-data deletion per retention policy; deletions generate an audit trail.

Admin Accountability Model
- Role assignment requires two-step approval for `district_admin` grants: proposer + approver; both recorded in `admin_role_grants`.
- All admin actions generate `AuditLog` with `actor_id` and `reason` for sensitive changes (exports, role changes).

Encryption
- In transit: TLS 1.2+ for all endpoints.
- At rest: database encryption (provider-managed); attachments encrypted server-side.

Authentication & Session Security (enforceable)
- Rotate signing keys (JWT) quarterly; maintain key IDs (`kid`) for verification.
- Refresh tokens hashed in DB with one-way hashing; store jti for revocation.

Third-party Integrations
- Vet all vendors for data handling; use processor contracts; limit PII shared to minimum.

Incident Response
- Incident response plan with timelines:
  - T+0: containment.
  - T+24h: incident classification and notification to District leadership.
  - T+72h: notification to affected guardians if PII of minors exposed (detailed report).

Penetration Testing and Audits
- Annual third-party penetration test.
- Quarterly internal security reviews; remediate high-severity findings within 30 days.

Operational Controls
- IAM: least privilege for cloud resources; tiered admin roles for infra vs app.
- Key rotation and periodic credential audit (every 90 days).

Compliance Checklist (deliverables)
- Data processing register.
- Consent capture and revocation UI flows.
- Audit log export tools.
- Retention and deletion tooling.
