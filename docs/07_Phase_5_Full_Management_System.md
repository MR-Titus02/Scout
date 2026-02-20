**Phase 5 — Full District Management System**

Purpose
- Provide full operational capabilities: unit and district administration, events, reporting, imports/exports, and analytics.

Core Functional Areas
- User & Role Management (bulk invite, role hierarchy)
- Unit Roster Management (transfers, merges)
- Event & Camp Management (registration, attendance tracking)
- Reporting & Dashboards (KPIs, audit views)
- Bulk import/export (CSV, Excel, API)
- System Administration (backups, observability, maintenance tools)

Multi-Role Hierarchy
- Roles are scoped by `scope_type` (DISTRICT, UNIT) and `scope_id` (nullable for district scope).
- Example: `role: unit_admin, scope: UNIT, scope_id: U-0012`.

Data Partitioning by Unit
- Logical partitioning: all records include `unit_id` where applicable.
- Multi-tenant hints: consider row-level security (RLS) in PostgreSQL to enforce unit scoping.

Event Management
- Event model includes capacity, registration windows, required forms, age brackets.
- Attendance flows: check-in with QR code (session token per attendee) or manual check-in by Unit Leader.

Bulk Import/Export
- Supported formats: CSV/Excel for roster, badges, and event registrants.
- Validation pipeline: preflight validation with error reports and dry-run mode.

Reporting & Analytics
- Dashboards for District Admins and Unit Admins with role-appropriate data.
- Standard reports: active roster, badge distribution, pending requests, event attendance.

Activity Logs and Observability
- Centralized logging (structured JSON) with Sentry for frontend errors, OpenTelemetry for traces and metrics.
- Audit logs immutable and exportable.

Scaling Strategy
- Phase-based scaling:
  - Phase 1–2: Static CDN + small managed DB read replicas if needed.
  - Phase 3–4: Single primary DB with read replicas, autoscaling application workers behind load balancer.
  - Phase 5: Multi-AZ deployment, DB sharding by logical boundaries if necessary, caching layer (Redis) for hotspots.

Long-term Maintainability
- Infrastructure as Code (Terraform) for reproducible environments.
- CI/CD pipelines to run linting, tests, DB migrations, and blue/green deployments.
- Versioning: API semantic versioning and migration policy.

Data Governance
- Data retention, archival, and deletion tooling for compliance (see `10_Security_and_Compliance.md`).

Operational Playbooks
- On-call runbook, incident severity definitions, backup restore steps, data breach response plan.
