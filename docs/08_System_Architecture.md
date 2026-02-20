**System Architecture — Kilinochchi District Scout Platform**

Overview
- Architecture is modular and phased: static frontend -> API backend -> full services with RBAC and workflows.

High-level Components
- Frontend (React + Tailwind) — static hosting for public pages and SPA for authenticated UX.
- API Gateway / Backend App — Node.js/Express (or Fastify) with TypeScript; implements business logic and RBAC policy layer.
- Data store — PostgreSQL (primary); Redis for caching and background job coordination.
- File storage — S3-compatible object storage for attachments.
- Worker queue — background processors for notifications, scans, imports (e.g., BullMQ on Redis or managed queue).
- Observability — Prometheus metrics, OpenTelemetry traces, Sentry for errors.

Deployment Topology (Phase 5 target)
- VPC with public subnets for CDN and load balancers; private subnets for application servers and DB.
- Managed DB (Postgres) with automated backups and point-in-time recovery (PITR).
- Autoscaling app layer behind an ALB; workers in private subnets.

API Design
- RESTful resource APIs with consistent versioning: `/api/v1/...`.
- Use hypermedia where appropriate for transitions (HATEOAS optional), keep payloads minimal.

Security Boundary
- Public CDN: serves only approved static assets and non-sensitive public JSON API endpoints.
- Backend: enforces RBAC, token validation, and content sanitation.
- Storage: attachments private, presigned URLs for temporary access.

Data Flow Examples
- Badge approval flow:
  1. Scout uploads files to a presigned PUT URL.
  2. Files placed in S3; backend receives webhook or worker polls and performs scanning.
  3. Scout submits UpdateRequest referencing file ids.
  4. Reviewer approves via API; worker applies change to Postgres and emits AuditLog event.

Integration Points
- Optional national integration API: adapter pattern to map local data models to national structure.
- Email/SMS provider: transactional email gateway and optionally SMS gateway with message templating.

Operational Considerations
- Blue/Green or Canary deployment for backend changes.
- Database migration tooling: use `prisma`, `flyway`, or `liquibase` depending on team preference; keep migrations small and reversible.

Scalability & Performance
- Cache read-heavy public endpoints in CDN and Redis.
- Use DB indexes for common filters (unit_id, scout_id, state) — see `09_Data_Models.md` for index recommendations.

Disaster Recovery
- RTO: 1 hour for public pages; 4 hours for admin services.
- RPO: 1 hour with continuous backups (configurable).

Operational Security
- Use managed secrets store (e.g., HashiCorp Vault or cloud provider secrets) for keys.
- Rotate service account keys quarterly.
