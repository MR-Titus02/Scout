**User Roles and Permissions — Kilinochchi District Scout Platform**

Overview
- This document defines system roles, permissions, and precise enforcement rules for access control across Phases 2–5.

Principles
- Least privilege by default.
- Separation of duties: administrative actions require dual controls where appropriate.
- Role-based access control (RBAC) with capability scoping (resource-level permissioning).

Primary Roles (hierarchical)
- District Admin (highest): full district-wide read/write, user management, audit access, export. Typically district secretary/chair.
- Unit Admin: manage unit roster, review/approve requests for scouts in their unit, event creation for unit scope.
- Unit Leader: create and verify scout activities, file requests, view unit dashboards (lesser than Unit Admin).
- Verification Officer: role for badge/evidence verification (can be district or unit-level).
- Scout (authenticated): view own dashboard, submit requests, view public profile fields, download certificates for own achievements.
- Parent/Guardian (linked account): limited access to minor’s private data where guardian consent exists; can approve requests on behalf of minor where policy permits.
- Public (unauthenticated): read-only access to allowed public pages and public scout profiles per Phase 2 rules.

Derived Roles / System Roles
- Service Account: API-level tokens for integrations and scheduled jobs. Scope-limited and rotated monthly.
- Auditor (read-only): access to audit logs, reports for oversight.

RBAC Model
- Roles assign a set of named permissions (actions); permissions are evaluated against resources with attributes (unit_id, scout_id, record_state).
- Policy engine: server-side policy service that evaluates granular rules like: "Unit Admin can approve UpdateRequests where request.unit_id == unit_id and request.state == 'PENDING'".
- Deny overrides: explicit denials take precedence over grants.

Permission Matrix (examples)
- `scout:read:own` — Scouts can read their own private scaffolded data.
- `scout:search:public` — Public role can search/read public profile fields only.
- `request:submit` — Scouts and Unit Leaders.
- `request:review` — Unit Admins, Verification Officers, District Admins.
- `user:manage` — District Admin only.

Enforcement Rules
- All permission checks performed server-side (no client trust).
- Token must include role claims and `unit_id` when applicable.
- Service Account tokens limited to `service:*` actions.
- UI will hide unavailable actions, but server must always authorize.

Policy for Minors
- Age threshold set in config (e.g., `MINOR_AGE = 18`).
- Minors cannot be publicly identified beyond allowed public fields; private fields require guardian consent or authenticated scout access.
- Guardian linkage requires verification (match government ID or in-person verification record).

Operational Controls
- Role assignment requires an approving District Admin action and audit log entry.
- Periodic review: automatic re-certification every 12 months for all admin roles.
- Emergency revoke: District Admins can suspend accounts; suspended accounts logged and require manual re-enable.

Auditing
- All role changes produce immutable Audit Log entries (see `09_Data_Models.md` AuditLog model).

Appendix: Example JSON Permission Statement
```
{
  "subject": "user:12345",
  "role": "unit_admin",
  "resource": "update_request:67890",
  "action": "request:review",
  "condition": "resource.unit_id == subject.unit_id"
}
```
