**Non-Functional Requirements (NFRs)**

Performance
- Public pages: Time to First Byte (TTFB) < 200ms CDN edge; First Contentful Paint (FCP) < 1.5s on 3G slow networks.
- API p95 latency < 300ms under normal load; p99 < 1s.

Scalability
- System must scale horizontally: stateless app servers, scale Redis and workers independently.
- DB scaling: read replicas for reporting; vertical scaling as budget permits; partition by unit if necessary.

Reliability
- SLA targets: public pages 99.9%; authenticated services 99.5%.
- Health checks for all services; automated restarts on failure.

Maintainability
- Code quality: linting, typed contracts (TypeScript), unit/integration tests.
- CI/CD: pipeline must run tests, migration checks, and smoke tests before production deploy.

Observability
- Metrics: request rates, latencies, error rates, queue depth.
- Tracing: capture critical workflows (auth, request approvals).
- Alerts: paged alerts for high error rates, failed cron jobs, backup failures.

Backup & Recovery
- As described in `10_Security_and_Compliance.md`.

Deployment Strategy
- Phased deployments with canary releases for backend.
- Frontend deploys via Vercel/Netlify with preview environments.

Operational Metrics (measurable)
- Mean time to restore (MTTR) < 1 hour for public pages.
- Mean time to detect (MTTD) critical incidents < 15 minutes.

Testing Requirements
- Unit tests >= 70% coverage for core modules.
- Integration tests for auth flows, request approval workflows.
