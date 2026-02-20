**Analytics and Future Extensions — Kilinochchi District Scout Platform**

Analytics Requirements
- Collect evented metrics for core actions: logins, request submissions, approvals, badge awards, profile updates.
- Track cohort metrics for adoption and retention (30/60/90 day retention by unit).

Implementation Plan
- Phase 3: basic analytics via server-side events to an analytics pipeline (e.g., Postgres events + ETL).
- Phase 4: telemetry for workflow durations and reviewer throughput.
- Phase 5: dashboards produced with BI tool (Metabase or Superset) with RBAC for district/unit admins.

Key Metrics Definitions
- Adoption rate: (# units with >0 admin registrations) / (total units) in last 90 days.
- Engagement: median monthly active scouts per unit.
- Admin efficiency: average time from `SUBMITTED` to `APPROVED`.
- Scout motivation: % scouts with at least one badge per year.

Data Pipeline
- Event ingestion -> buffer (Kafka or managed Kinesis) -> warehouse (BigQuery/Redshift/Postgres reporting) -> BI.
- For smaller scale: use scheduled ETL jobs from Postgres to data warehouse.

Future Extensions (prioritized)
- National Integration Adapter: sync select fields with national registry using transformation and consent requirements.
- Mobile apps: native apps for offline event check-ins and push notifications.
- Offline-first features: allow scouts at remote camps to queue requests offline and sync when online.
- Machine-assisted verification: image analysis to pre-score evidence for faster reviews (careful with false positives; human always final).

Privacy & Analytics
- Ensure analytics does not store PII; use pseudonymous identifiers.
- For cohort analysis involving minors, keep aggregated thresholds (e.g., do not show cohorts < 10 scouts to avoid deanonymization).

Actionable Dashboards (initial)
- Pending requests by unit and age group.
- Badge distribution heatmap.
- Event attendance trends.
