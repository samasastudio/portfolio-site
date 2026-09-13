import type { SystemGatewayContract } from "../_types/system";

/**
 * Metadata and status contracts for the 3 Compute Atlas gateway surfaces.
 */
export const gatewaySystems: readonly SystemGatewayContract[] = [
  {
    id: "atx-scraper",
    slug: "scraper",
    name: "ATX Scraper — Compute Infrastructure Ingestion Engine",
    shortName: "ATX Scraper",
    category: "Data Ingestion & Extraction Engine",
    summary:
      "Deterministic public records extraction across TDLR TABS, Austin AB+C, municipal agendas, TCEQ permits, and ERCOT queues with out-of-band Gemini Flash self-healing repair and sandbox replay gates.",
    status: "development",
    runtime: "Node.js 22 / Cloudflare Worker",
    endpoint: "/systems/scraper",
    specPath: "docs/specs/atx-scraper.md",
    adrPath: "docs/adr/0002-scraper-out-of-band-self-healing.md",
    technologies: [
      "TypeScript",
      "Cheerio",
      "Zod",
      "Gemini 2.5 Flash",
      "Drizzle ORM",
      "Cloudflare D1",
      "Cloud Storage / R2",
    ],
    capabilities: [
      "TDLR TABS State Filings Parser",
      "City of Austin AB+C & Socrata Ingestion",
      "Municipal Planning Agenda Extraction",
      "TCEQ Standard Air & Water Permits",
      "ERCOT Large-Load Spreadsheets",
      "Out-of-Band LLM Repair Agent",
      "Sandbox Replay Regression Gates",
      "Source Health Telemetry & Auditing",
    ],
    invariants: [
      "Deterministic fast path by default",
      "Immutable raw artifact storage with SHA-256",
      "Zero autonomous writes to canonical observation store",
      "100% fixture replay pass before patch promotion",
    ],
    repositoryUri: "c:/Users/Owner/projects/atx-scraper",
  },
  {
    id: "atx-graphical-atlas",
    slug: "graphical-atlas",
    name: "ATX Graphical Atlas — Temporal Technical Atlas",
    shortName: "ATX Graphical Atlas",
    category: "Geospatial Cartography & Temporal Visualization",
    summary:
      "Living technical cartography coupling deterministic GIS vector geometry (TNRIS parcels, transmission corridors, aquifers) with stateful semantic visual synthesis across Central Texas over time.",
    status: "development",
    runtime: "Next.js 16 RSC / MapLibre GL / Canvas",
    endpoint: "/systems/graphical-atlas",
    specPath: "docs/specs/atx-graphical-atlas.md",
    adrPath: "docs/adr/0001-graphical-atlas-visual-architecture.md",
    technologies: [
      "MapLibre GL",
      "EPSG:3857 GIS",
      "Google GenAI Engine",
      "Canvas",
      "TypeScript",
      "Tailwind CSS",
    ],
    capabilities: [
      "Deterministic GIS Parcel Boundary Engine",
      "Stateful Semantic Visual Plate Synthesis",
      "Temporal Scrubber (STATE vs DELTA modes)",
      "Sub-50ms Vector Hitbox Selection",
      "Multi-Jurisdiction Filtering (Austin, Taylor, Round Rock)",
      "Transmission & Watershed Overlays",
    ],
    invariants: [
      "Zero spatial hallucination on parcels and infrastructure",
      "Persistent visual seeds evolving across lifecycle stages",
      "Full historical auditability via StateProjector",
      "Sub-50ms interaction latency with zero network roundtrips",
    ],
    repositoryUri: "c:/Users/Owner/projects/atx-graphical-atlas",
  },
  {
    id: "atx-generative-console",
    slug: "generative-console",
    name: "ATX Generative Console — Investigative Analytical Workspace",
    shortName: "ATX Generative Console",
    category: "Generative UI & Investigative Workspace",
    summary:
      "Dynamic investigative workspace driven by natural-language inquiry, translating analyst intent into strongly-typed UI AST layouts that mutate in-place and ground all findings in immutable public records evidence.",
    status: "development",
    runtime: "Next.js 16 / React 19 / Cloudflare Worker",
    endpoint: "/systems/generative-ui",
    specPath: "docs/specs/atx-generative-console.md",
    adrPath: "docs/adr/0003-generative-ui-component-palette.md",
    technologies: [
      "React 19 RSC",
      "Gemini 2.5 Flash",
      "Zod UI AST",
      "Drizzle ORM",
      "Tailwind CSS v4",
      "Cloudflare D1",
    ],
    capabilities: [
      "Natural Language Intent-to-AST Planner",
      "In-Place Workspace Layout Mutation",
      "Forensic Evidence Split-View & Citations",
      "Multi-Track Timeline (Zoning vs Environmental)",
      "Operator Comparison Matrix",
      "Source Health Invariant Monitor",
    ],
    invariants: [
      "The interface is the conversation (no linear chat bubbles)",
      "100% Zod AST validation prior to React render",
      "Strict evidence-first provenance for all claims",
      "Curated palette without arbitrary CSS generation",
    ],
    repositoryUri: "c:/Users/Owner/projects/atx-generative-console",
  },
] as const;

export function getSystemById(id: string): SystemGatewayContract | undefined {
  if (!id || typeof id !== "string") return undefined;
  const targetId = id.trim().toLowerCase();
  if (!targetId) return undefined;
  return gatewaySystems.find((system) => system.id.toLowerCase() === targetId);
}

export function getSystemBySlug(slug: string): SystemGatewayContract | undefined {
  if (!slug || typeof slug !== "string") return undefined;
  const trimmed = slug.trim().toLowerCase();
  if (!trimmed) return undefined;

  // Strip leading and trailing slashes
  const cleanPath = trimmed.replace(/^\/+|\/+$/g, "");
  if (!cleanPath || cleanPath === "systems") return undefined;

  // Strip optional 'systems/' prefix
  const normalized = cleanPath.startsWith("systems/")
    ? cleanPath.slice("systems/".length).replace(/^\/+/, "")
    : cleanPath;

  if (!normalized) return undefined;

  return gatewaySystems.find((system) => {
    const sysSlug = system.slug.toLowerCase();
    const sysId = system.id.toLowerCase();
    const sysEndpoint = system.endpoint.toLowerCase().replace(/^\/+|\/+$/g, "");
    const sysEndpointNormalized = sysEndpoint.startsWith("systems/")
      ? sysEndpoint.slice("systems/".length)
      : sysEndpoint;

    return (
      sysSlug === normalized ||
      sysSlug === cleanPath ||
      sysId === normalized ||
      sysId === cleanPath ||
      sysEndpoint === cleanPath ||
      sysEndpointNormalized === normalized
    );
  });
}
