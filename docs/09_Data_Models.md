**Data Models — Kilinochchi District Scout Platform**

This document lists canonical data models, field definitions, relationships, and indexing recommendations. Use PostgreSQL (with JSONB for flexible payloads) unless otherwise noted.

Conventions
- Primary keys: UUID v4 (`uuid` type) for internal PKs.
- Public IDs: human-friendly prefixed IDs (e.g., `KIL-2026-00001`), stored as `public_id` and unique.
- Timestamps: stored in UTC with `created_at`, `updated_at`.
- Soft deletes: `deleted_at` timestamp for recoverable records.

Scout
- Table: `scouts`
- Fields:
  - `id` uuid PK
  - `public_id` varchar(20) UNIQUE (KIL-YYYY-XXXXX)
  - `first_name` varchar
  - `preferred_name` varchar
  - `last_name` varchar (sensitive; access restricted)
  - `dob` date (sensitive)
  - `sex` enum
  - `unit_id` uuid FK
  - `current_rank_id` uuid FK
  - `profile_photo_file_id` uuid FK nullable
  - `public_profile` jsonb (cached public view)
  - `created_at`, `updated_at`, `deleted_at`
- Indexes:
  - `idx_scouts_unit_id` (unit_id)
  - `idx_scouts_public_id` (unique)

Unit
- Table: `units`
- Fields:
  - `id` uuid PK
  - `public_id` varchar (U-0001)
  - `name`, `type` (Troop, Pack, Crew), `district_id`
  - `location` jsonb (geocode optional; no raw addresses in public view)
  - `created_at`, `updated_at`

Rank
- Table: `ranks`
- Fields:
  - `id` uuid
  - `code` varchar (e.g., R-01)
  - `label` varchar
  - `description` text
  - `order` int (for display)

Badge
- Table: `badges`
- Fields:
  - `id` uuid
  - `badge_id` varchar unique
  - `name`, `description`, `evidence_requirements` (jsonb)

Event
- Table: `events`
- Fields:
  - `id` uuid
  - `public_id` varchar
  - `title`, `description`
  - `start_date`, `end_date` (date/datetime)
  - `location` jsonb
  - `capacity`, `unit_id` owner

Camp (specialized event)
- Same model as Event but with `camp_details` JSONB (accommodation, supervisors)

UpdateRequest
- Table: `update_requests`
- Fields documented in Phase 4 (see `06_Phase_4_Request_Approval_Workflow.md`)

User Account
- Table: `users`
- Fields:
  - `id` uuid
  - `email` varchar unique
  - `password_hash` varchar
  - `roles` jsonb (array of role objects: {role, scope_type, scope_id})
  - `linked_scout_id` uuid nullable
  - `guardian_for` jsonb (list of scout_ids)
  - `status` enum (ACTIVE, PENDING, SUSPENDED)
  - `created_at`, `updated_at`

Admin Roles
- Stored as part of `users.roles` with explicit `granted_by` and `granted_at` metadata in `admin_role_grants` table for audit.

Audit Log
- Table: `audit_logs`
- Fields:
  - `id` uuid
  - `actor_user_id` uuid nullable
  - `action` varchar
  - `resource_type` varchar
  - `resource_id` varchar
  - `before` jsonb nullable
  - `after` jsonb nullable
  - `metadata` jsonb (ip, user_agent)
  - `created_at` timestamp
  - Immutable — append-only.

Indexing Considerations
- Index by `unit_id`, `scout_id`, `state` on request queues.
- GIN indexes for JSONB queryable fields where needed (`public_profile`, `payload`).

Unique ID Conventions
- `scout.public_id` -> KIL-YYYY-XXXXX
- `request.request_id` -> KIL-REQ-YYYY-XXXXX

Extensibility
- Design models to store vendor IDs and `external_ids` JSONB for integrations.
