# ADR-0004: Temporal Observation Store, Immutable Source Artifacts, and Drizzle ORM Data Spine

## Status
Accepted (Supersedes ephemeral 14-day event database model)

## Context & Problem Statement
Typical web application databases store mutable current state, overwriting rows upon update. In Compute Atlas, time is a first-class dimension: users must be able to reconstruct the infrastructure landscape at an arbitrary historical date $T$, calculate changes between $T_1$ and $T_2$, and trace any factual claim to an immutable source record. Mutating rows destroys historical auditability and makes provenance impossible.

## Decision
Adopt an **Immutable Observation Store and Temporal State Projection Architecture**:

1. **Relational Database (PostgreSQL via Drizzle ORM)**:
   - All persistence is defined with typed Drizzle schemas (`drizzle-orm`, `drizzle-kit`).
   - **Immutable Source Artifacts (`source_artifacts`)**:
     - Stores metadata for every captured document/page: `sha256_hash`, `source_family`, `source_url`, `content_type`, `byte_size`, `captured_at`, `storage_path`, `connector_version`.
   - **Atomic Observations (`observations`)**:
     - Every extracted fact is recorded as an immutable append-only observation:
       `{ id, subject_type, subject_id, property, value_json, observed_at, effective_at, source_artifact_id, connector_version, confidence, resolution_method }`.
     - Conflicting records from multiple agencies are preserved as competing observations rather than silently overwritten.
   - **Projected Canonical Entities (`projects`, `facilities`, `organizations`, `locations`)**:
     - Represents the current derived state projected from the active observation ledger.
   - **Entity Relationships**:
     - `development_actions`: Zoning, annexation, site plans, permits, hearings.
     - `environmental_actions`: TCEQ air, water, and waste permits.
     - `infrastructure_relationships`: Grid substations, transmission lines, water tie-ins.
     - `economic_relationships`: Tax abatements (Chapter 312/380/381), enterprise zones.
   - **Telemetry & Source Health (`connector_configs`, `repair_audits`)**:
     - Tracks execution logs, invariant health, proposed repairs, replay runs, and promotion history.

2. **Temporal Projection Engine**:
   - **State Projector**: Evaluates observations up to timestamp $T$ to synthesize the canonical state as it was known at that exact date.
   - **Delta Projector**: Computes the set difference between state at $T_1$ and $T_2$ (new filings, status shifts, capacity modifications, withdrawals).

3. **Immutable Object Storage (GCS / Cloudflare R2)**:
   - Holds gzipped raw HTML, original PDF packets, and raw API responses, keyed directly by their SHA-256 hash.

## Consequences
- **Positive**:
  - Uncompromised provenance: every metric in the UI links directly to an immutable source artifact.
  - Full temporal replay: can reconstruct the state of Texas AI infrastructure at any past date.
  - Complete compliance with Drizzle ORM typed schema standards.
- **Negative / Trade-offs**:
  - Higher database storage growth compared to mutable CRUD rows (mitigated by indexing and observation partitioning).
  - Requires projection logic to aggregate observations into queryable entity states.
