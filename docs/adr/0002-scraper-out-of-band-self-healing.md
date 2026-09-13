# ADR-0002: Deterministic Connectors, Sandbox Replay Gates, and Out-of-Band Repair in atx-scraper

## Status
Accepted

## Context & Problem Statement
Extracting Texas infrastructure public records (TDLR TABS construction filings, City of Austin AB+C permitting, Taylor City Council agenda packets, TCEQ environmental notices) spans diverse portals, CMS systems, and PDF repositories.
Running LLMs on every routine fetch is slow, expensive, and fails anti-novice engineering standards. Conversely, hardcoded scrapers break silently when municipal agencies update page layouts or table structures. Furthermore, autonomous AI agents cannot be allowed to write unverified code or modify canonical data directly.

## Decision
Adopt a **Self-Healing Deterministic Ingestion Pipeline with Gated Replay**:

1. **Deterministic Fast Path**:
   - Primary ingestion uses versioned TypeScript connectors:
     - Official REST/Socrata APIs for open datasets (e.g. City of Austin Open Data).
     - Deterministic HTTP + Cheerio extractors for structured HTML portals (TDLR TABS).
     - Deterministic document extractors (PDF tables, text parsing) for municipal agenda packets.
   - Every fetch stores an immutable copy of the raw source artifact (SHA-256 hashed) in Cloud Storage.

2. **Invariant & Anomaly Detection Guard**:
   - Connectors define strict operational invariants:
     - Minimum expected record counts and pagination continuity.
     - Required field coverage (e.g., project identifier, address, estimated cost, owner).
     - Zod schema validation over extracted observation payloads.
   - An invariant breach isolates the connector into an anomaly state without disrupting other healthy sources.

3. **Out-of-Band Repair Agent**:
   - Generates a diagnostic bundle containing:
     - Sanitized DOM skeleton / document sample.
     - Historical known-good fixtures.
     - Failed invariant logs and expected target schema.
   - Gemini 2.5 Flash analyzes the diff and synthesizes a proposed connector configuration or selector patch.
   - Agent *never* directly mutates canonical observations or production database records.

4. **Sandbox Replay & Verification Gates**:
   - The proposed patch executes in an isolated sandbox against:
     - (a) Historical known-good fixtures (regression testing).
     - (b) The failing live source artifact.
   - Patch promotion requires: 100% invariant pass, schema compliance, and acceptable diff bounds.
   - Promoted patches are versioned and logged to the `Source Health` audit ledger.

## Consequences
- **Positive**:
  - 95%+ of routine ingestion runs deterministically with zero LLM API costs.
  - Failures self-heal safely without human intervention or canonical data pollution.
  - Full auditability: every repair has associated replay logs, diffs, and connector versions.
- **Negative / Trade-offs**:
  - Requires maintaining fixture banks and historical test suites per connector.
  - Complex schema breaks or anti-bot captchas still escalate to human review alerts.
