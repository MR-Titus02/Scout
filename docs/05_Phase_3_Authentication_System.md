**Phase 3 — Authentication System**

Purpose
- Provide secure, auditable access for scouts, leaders, and admins with role-based controls and protections for minors.

Authentication Architecture
- Protocol: JWT (JSON Web Tokens) with short-lived access tokens and refresh tokens.
- Identity store: PostgreSQL (or managed cloud DB) with hashed passwords and optional OAuth2/OIDC integration for future SSO.
- Password hashing: Argon2id with parameterization (time and memory tuned for budget/ops). Use libs: `argon2` or host-provider KMS-backed auth.

Auth Flows (textual diagrams)
- Sign-up (self or admin-created):
  1. User submits account request (email, role request, unit_id optional).
  2. System sends verification email with short-lived code (expires 24h).
  3. After verification, account status `PENDING_ACTIVATION` until District Admin approval for admin roles; scouts can be activated automatically if guardian consent exists.
- Login:
  1. User submits credentials.
  2. Server verifies credentials and account status.
  3. On success, server issues `access_token` (exp: 15m) and `refresh_token` (exp: 7d). Both are JWTs; refresh tokens stored hashed in DB for revocation.
  4. Client stores `access_token` in memory and `refresh_token` in `httpOnly, Secure` cookie with `SameSite=Lax` (or `Strict` depending on UX).
- Token refresh:
  1. Client posts `refresh_token` cookie to `/auth/refresh`.
  2. Server validates token against DB stored hash and issues new tokens; rotates refresh token.
- Logout:
  1. Client hits `/auth/logout` to delete cookie and server-side revokes refresh token.

Token Lifecycle
- Access token: signed JWT with claims: `sub` (user id), `roles` (array), `unit_id`, `iat`, `exp`, `jti`.
- Refresh token: long-lived, single-use; on rotation store previous token jti to deny replay attacks.
- Revocation: maintain `revoked_tokens` table keyed by `jti` and expiry.

Role Definitions (restate from `02_User_Roles_and_Permissions.md`)
- `district_admin`, `unit_admin`, `unit_leader`, `verification_officer`, `scout`, `guardian`, `auditor`, `service_account`.

Account Activation & Guardian Consent
- Guardians must create guardian accounts and link to minors; linking requires verification (email + in-person or government document record stored offline, recorded in `consent_verification` log).
- For scouts under `MINOR_AGE`, account features limited until guardian consent is recorded; e.g., profile photo and certain profile fields remain private.

Edge Cases and Security Considerations
- Brute-force protection: account lockouts after configurable failed attempts (e.g., 5 within 15 minutes), exponential backoff, and CAPTCHA for suspicious IPs.
- Account takeover detection: rapid IP changes, geolocation anomalies trigger step-up authentication.
- Session management: limit active refresh tokens per user (configurable, default 5); provide admin tools to force logout all sessions.
- Password reset: secure, time-limited single-use codes delivered via email; include device/IP metadata.

Sensitive Claims & Token Size
- Keep tokens small; do not include PII in JWT claims. Include references only (`sub`, `unit_id`, `roles`). Retrieve profile data server-side when needed.

Cookie & Storage Best Practices
- Store refresh tokens in `HttpOnly Secure SameSite` cookies.
- Access token kept in memory (not localStorage) to reduce XSS risks.

Implementation Notes
- Use established auth libraries (e.g., `jsonwebtoken`, `passport`/`next-auth` or framework-auth integrations). Prefer using managed identity providers (Auth0, Azure AD B2C) if budget/requirements permit, but keep local fallback for offline ops.

Logging and Monitoring
- All auth events (login, logout, refresh, failed attempts, password resets) must be logged to AuditLog with outcome, actor, IP, and user-agent.

Compliance Considerations (Minors)
- Guardians must provide verifiable consent stored as an auditable record before publishing photos or contact data.
- Retain consent records for a minimum retention period defined in `10_Security_and_Compliance.md`.

APIs
- `/auth/login` POST -> {access_token, refresh_cookie}
- `/auth/refresh` POST (cookie) -> rotated tokens
- `/auth/logout` POST -> revoke
- `/auth/signup` POST -> create `PENDING_ACTIVATION`
