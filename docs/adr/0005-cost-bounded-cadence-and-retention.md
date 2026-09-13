# ADR-0005: Ingestion Cadence, Artifact Provenance Retention, and Replay Auditing

## Status
Accepted

## Context & Problem Statement
Public records operate on civil and regulatory timetables: municipal council agendas update bi-weekly, TDLR construction filings post daily/weekly, TCEQ permits post periodically.
Aggressive continuous polling creates server strain on fragile municipal portals, risks IP blocking, and generates useless duplicate artifacts. Furthermore, deleting raw source files (as done in ephemeral consumer event models) destroys the evidentiary basis of Compute Atlas.

## Decision
Adopt a **Cadence-Bounded Ingestion Policy and Long-Term Provenance Retention**:

1. **Source-Specific Ingestion Cadence**:
   - **State Construction (TDLR TABS)**: Daily batch sync at 02:00 CT.
   - **Municipal Open Data (City of Austin AB+C / Socrata)**: Daily sync at 04:00 CT.
   - **Municipal Agendas (Taylor, Round Rock, etc.)**: 2x weekly scheduled scrape aligned with municipal meeting publishing cycles.
   - **Environmental Permits (TCEQ)**: Weekly batch sync.
   - **Grid & Water Context (ERCOT, TWDB)**: Monthly or event-driven ingestion.

2. **Immutable Provenance Retention**:
   - All captured raw source artifacts (HTML pages, PDF packets, JSON payloads) are stored permanently in object storage (Google Cloud Storage standard tier transitioned to Coldline/Archive tier after 90 days).
   - SHA-256 content hashes prevent duplicate artifact storage across redundant fetches.

3. **Replay Fixture Bank**:
   - Each connector maintains a curated fixture bank of 5–10 historical artifacts (including known edge cases and structural anomalies) to power the sandbox replay verification gate during self-healing.

4. **Cost & Token Bounds**:
   - Routine extraction: 100% deterministic (zero LLM token spend).
   - Repair agent: Invocations strictly bounded to invariant failure events; maximum 3 automated repair iterations per failure before flagging for human operator review.
   - Investigation planner: Invoked exclusively on user natural-language queries in `atx-generative-console`.

## Consequences
- **Positive**:
  - Respects municipal server capacity and adheres to responsible scraping practices.
  - Predictable, low operational compute and API costs.
  - Guarantees permanent evidentiary auditability for all extracted claims.
- **Negative / Trade-offs**:
  - Ingestion latency reflects batch schedules; breaking real-world updates appear after the next scheduled sync cycle.
