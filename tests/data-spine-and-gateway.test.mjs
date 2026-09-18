import assert from "node:assert/strict";
import fs from "node:fs";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { getSystemById, getSystemBySlug, gatewaySystems } from "../app/_data/systems.ts";
import * as schema from "../db/schema.ts";

test("SQLite D1 migration initializes all 11 Compute Atlas tables with foreign keys active", () => {
  const db = new DatabaseSync(":memory:");
  db.exec("PRAGMA foreign_keys = ON;");

  const migrationSql = fs.readFileSync("drizzle/0000_bitter_master_chief.sql", "utf8");
  db.exec(migrationSql);

  const tables = db
    .prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
    )
    .all()
    .map((row) => row.name);

  const expectedTables = [
    "connector_configs",
    "development_actions",
    "environmental_actions",
    "facilities",
    "infrastructure_relationships",
    "locations",
    "observations",
    "organizations",
    "projects",
    "repair_audits",
    "source_artifacts",
  ];

  assert.deepEqual(tables, expectedTables);

  // 1. Insert source_artifacts
  db.prepare(`
    INSERT INTO source_artifacts (id, sha256_hash, source_family, source_url, content_type, byte_size, storage_path, connector_version)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "art-001",
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "tdlr_tabs",
    "https://www.tdlr.texas.gov/TABS/Search/Project/TABS2024001",
    "text/html",
    1024,
    "artifacts/tdlr_tabs/art-001.html.gz",
    "v1.0.0"
  );

  // 2. Insert organizations
  db.prepare(`
    INSERT INTO organizations (id, slug, name, organization_type, headquarters, website)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    "org-001",
    "skyline-compute",
    "Skyline Compute LLC",
    "hyperscaler",
    "Austin, TX",
    "https://skylinecompute.example"
  );

  // 3. Insert locations
  db.prepare(`
    INSERT INTO locations (id, address, city, county, state, postal_code, latitude, longitude, parcel_id, jurisdiction, watershed)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "loc-001",
    "12000 Taylor Technology Blvd",
    "Taylor",
    "Williamson",
    "TX",
    "76574",
    30.5708,
    -97.4092,
    "R-123456",
    "City of Taylor ETJ",
    "Brushy Creek"
  );

  // 4. Insert projects
  db.prepare(`
    INSERT INTO projects (id, slug, name, operator, stage, acreage, estimated_cost_usd, power_demand_mw, location_id, organization_id, description)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "proj-001",
    "project-centaur",
    "Project Centaur Data Campus",
    "Skyline Operating Co",
    "construction",
    120.5,
    500000000.0,
    350.0,
    "loc-001",
    "org-001",
    "Hyperscale AI training data center campus"
  );

  // 5. Insert facilities
  db.prepare(`
    INSERT INTO facilities (id, project_id, name, facility_type, status, gross_square_feet, power_capacity_mw, address)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "fac-001",
    "proj-001",
    "Building 1 Data Hall",
    "data_center",
    "construction",
    250000.0,
    175.0,
    "12000 Taylor Tech Blvd Bldg 1"
  );

  // 6. Insert observations
  db.prepare(`
    INSERT INTO observations (id, subject_type, subject_id, property, value_json, source_artifact_id, connector_version, confidence, resolution_method)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "obs-001",
    "project",
    "proj-001",
    "power_demand_mw",
    JSON.stringify({ value: 350.0, unit: "MW" }),
    "art-001",
    "v1.0.0",
    0.98,
    "deterministic"
  );

  // 7. Insert development_actions
  db.prepare(`
    INSERT INTO development_actions (id, project_id, action_type, action_identifier, jurisdiction, status, filed_date, details)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "dev-001",
    "proj-001",
    "zoning",
    "Z-2024-0012",
    "City of Taylor",
    "approved",
    "2024-03-15",
    JSON.stringify({ rezone_from: "Agricultural", rezone_to: "Heavy Industrial (HI)" })
  );

  // 8. Insert environmental_actions
  db.prepare(`
    INSERT INTO environmental_actions (id, project_id, agency, action_type, permit_number, status, effective_date, emissions_summary)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "env-001",
    "proj-001",
    "TCEQ",
    "air_standard_permit",
    "AIR-78901",
    "approved",
    "2024-06-01",
    JSON.stringify({ nox_tpy: 42.5, generator_count: 36 })
  );

  // 9. Insert infrastructure_relationships
  db.prepare(`
    INSERT INTO infrastructure_relationships (id, source_entity_id, source_entity_type, target_entity_id, target_entity_type, relationship_type, capacity, status, metadata)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "rel-001",
    "proj-001",
    "project",
    "substation-taylor-east",
    "substation",
    "interconnect",
    "345kV",
    "under_construction",
    JSON.stringify({ interconnect_agreement_date: "2024-01-10" })
  );

  // 10. Insert connector_configs
  db.prepare(`
    INSERT INTO connector_configs (id, source_family, enabled, manifest, invariants, last_status)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    "tdlr_tabs_v1",
    "tdlr_tabs",
    1,
    JSON.stringify({ schedule: "0 2 * * *" }),
    JSON.stringify({ min_records_per_run: 5 }),
    "ok"
  );

  // 11. Insert repair_audits
  db.prepare(`
    INSERT INTO repair_audits (id, connector_id, failure_reason, proposed_patch, replay_results, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    "rep-001",
    "tdlr_tabs_v1",
    "Selector .project-detail table structure shifted in TDLR update",
    JSON.stringify({ selector_patch: "table.tabs-grid > tbody > tr" }),
    JSON.stringify({ total_fixtures: 20, passed: 20, failed: 0 }),
    "promoted"
  );

  // Verify counts
  for (const table of expectedTables) {
    const row = db.prepare(`SELECT count(*) as count FROM ${table}`).get();
    assert.equal(row.count, 1, `Expected 1 row in table ${table}`);
  }

  // Verify foreign key enforcement
  assert.throws(
    () => {
      db.prepare(`
        INSERT INTO observations (id, subject_type, subject_id, property, value_json, source_artifact_id, connector_version)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run("obs-bad", "project", "proj-001", "stage", JSON.stringify({}), "art-nonexistent", "v1.0.0");
    },
    (err) => err.message.includes("FOREIGN KEY constraint failed"),
    "Expected FK violation for invalid source_artifact_id"
  );

  assert.throws(
    () => {
      db.prepare(`
        INSERT INTO facilities (id, project_id, name, facility_type, status)
        VALUES (?, ?, ?, ?, ?)
      `).run("fac-bad", "proj-nonexistent", "Orphan Facility", "data_center", "proposed");
    },
    (err) => err.message.includes("FOREIGN KEY constraint failed"),
    "Expected FK violation for invalid project_id in facilities"
  );

  // Verify unique constraints
  assert.throws(
    () => {
      db.prepare(`
        INSERT INTO organizations (id, slug, name, organization_type)
        VALUES (?, ?, ?, ?)
      `).run("org-dup", "skyline-compute", "Duplicate Org Slug", "developer");
    },
    (err) => err.message.includes("UNIQUE constraint failed"),
    "Expected UNIQUE violation for duplicate organization slug"
  );

  assert.throws(
    () => {
      db.prepare(`
        INSERT INTO projects (id, slug, name)
        VALUES (?, ?, ?)
      `).run("proj-dup", "project-centaur", "Duplicate Project Slug");
    },
    (err) => err.message.includes("UNIQUE constraint failed"),
    "Expected UNIQUE violation for duplicate project slug"
  );
});

test("Gateway systems metadata and lookup helpers", () => {
  assert.equal(gatewaySystems.length, 3);
  const ids = gatewaySystems.map((s) => s.id);
  assert.deepEqual(ids, ["gridlock-scraper", "gridlock-graphical-atlas", "gridlock-generative-console"]);

  // Test getSystemById with new canonical IDs
  assert.equal(getSystemById("gridlock-scraper")?.slug, "scraper");
  assert.equal(getSystemById("gridlock-graphical-atlas")?.slug, "graphical-atlas");
  assert.equal(getSystemById("gridlock-generative-console")?.slug, "generative-console");

  // Test getSystemById backward-compatibility with legacy ATX IDs
  assert.equal(getSystemById("atx-scraper")?.id, "gridlock-scraper");
  assert.equal(getSystemById("atx-graphical-atlas")?.id, "gridlock-graphical-atlas");
  assert.equal(getSystemById("atx-generative-console")?.id, "gridlock-generative-console");
  assert.equal(getSystemById("non-existent"), undefined);
  assert.equal(getSystemById(""), undefined);

  // Test getSystemBySlug with normalized slugs, route endpoints, and IDs
  assert.equal(getSystemBySlug("scraper")?.id, "gridlock-scraper");
  assert.equal(getSystemBySlug("/systems/scraper")?.id, "gridlock-scraper");
  assert.equal(getSystemBySlug("systems/scraper")?.id, "gridlock-scraper");
  assert.equal(getSystemBySlug("/scraper")?.id, "gridlock-scraper");
  assert.equal(getSystemBySlug("gridlock-scraper")?.id, "gridlock-scraper");

  assert.equal(getSystemBySlug("graphical-atlas")?.id, "gridlock-graphical-atlas");
  assert.equal(getSystemBySlug("/systems/graphical-atlas")?.id, "gridlock-graphical-atlas");
  assert.equal(getSystemBySlug("gridlock-graphical-atlas")?.id, "gridlock-graphical-atlas");
  assert.equal(getSystemBySlug("gridlock-atlas")?.id, "gridlock-graphical-atlas");

  assert.equal(getSystemBySlug("generative-console")?.id, "gridlock-generative-console");
  assert.equal(getSystemBySlug("generative-ui")?.id, "gridlock-generative-console");
  assert.equal(getSystemBySlug("/systems/generative-ui")?.id, "gridlock-generative-console");
  assert.equal(getSystemBySlug("gridlock-generative-console")?.id, "gridlock-generative-console");
  assert.equal(getSystemBySlug("gridlock-console")?.id, "gridlock-generative-console");

  // Legacy ATX slug compatibility
  assert.equal(getSystemBySlug("atx-scraper")?.id, "gridlock-scraper");
  assert.equal(getSystemBySlug("atx-graphical-atlas")?.id, "gridlock-graphical-atlas");
  assert.equal(getSystemBySlug("atx-generative-console")?.id, "gridlock-generative-console");

  // Edge case testing: trailing slashes, surrounding whitespace, case insensitivity
  assert.equal(getSystemBySlug("/systems/scraper/")?.id, "gridlock-scraper");
  assert.equal(getSystemBySlug("scraper/")?.id, "gridlock-scraper");
  assert.equal(getSystemBySlug("  scraper  ")?.id, "gridlock-scraper");
  assert.equal(getSystemBySlug("GRIDLOCK-SCRAPER")?.id, "gridlock-scraper");
  assert.equal(getSystemBySlug("Scraper")?.id, "gridlock-scraper");
  assert.equal(getSystemBySlug("/systems/generative-ui/")?.id, "gridlock-generative-console");
  assert.equal(getSystemBySlug("/systems/graphical-atlas/")?.id, "gridlock-graphical-atlas");
  assert.equal(getSystemBySlug("/systems"), undefined);
  assert.equal(getSystemBySlug("/systems/"), undefined);
  assert.equal(getSystemBySlug("/"), undefined);
  assert.equal(getSystemBySlug("   "), undefined);

  assert.equal(getSystemById("  gridlock-scraper  ")?.slug, "scraper");
  assert.equal(getSystemById("GRIDLOCK-SCRAPER")?.slug, "scraper");
  assert.equal(getSystemById("  atx-scraper  ")?.slug, "scraper");
  assert.equal(getSystemById("  "), undefined);

  assert.equal(getSystemBySlug("unknown"), undefined);
  assert.equal(getSystemBySlug(""), undefined);
});

test("Drizzle ORM getDb executes typed queries against simulated D1 database", async () => {
  const sqlite = new DatabaseSync(":memory:");
  sqlite.exec("PRAGMA foreign_keys = ON;");
  const migrationSql = fs.readFileSync("drizzle/0000_bitter_master_chief.sql", "utf8");
  sqlite.exec(migrationSql);

  const mockD1 = {
    prepare(query) {
      return {
        _query: query,
        _params: [],
        bind(...params) {
          this._params = params;
          return this;
        },
        async all() {
          const stmt = sqlite.prepare(this._query);
          const results = stmt.all(...this._params);
          return { results, success: true, meta: {} };
        },
        async run() {
          const stmt = sqlite.prepare(this._query);
          stmt.run(...this._params);
          return { results: [], success: true, meta: {} };
        },
        async first(col) {
          const stmt = sqlite.prepare(this._query);
          const row = stmt.get(...this._params);
          if (!row) return null;
          return col ? row[col] : row;
        },
        async raw() {
          const stmt = sqlite.prepare(this._query);
          const rows = stmt.all(...this._params);
          return rows.map((r) => Object.values(r));
        },
      };
    },
    async batch(statements) {
      const results = [];
      for (const stmt of statements) {
        results.push(await stmt.run());
      }
      return results;
    },
    async exec(query) {
      sqlite.exec(query);
      return { count: 0, duration: 0 };
    },
    async dump() {
      return new ArrayBuffer(0);
    },
  };

  const db = drizzle(mockD1, { schema });

  // 1. Insert organization via typed Drizzle ORM query builder
  await db.insert(schema.organizations).values({
    id: "org-typed-1",
    slug: "meta-platforms-tx",
    name: "Meta Platforms Texas",
    organizationType: "hyperscaler",
    headquarters: "Menlo Park, CA",
  });

  // 2. Query it back via typed Drizzle select
  const orgRows = await db
    .select()
    .from(schema.organizations)
    .where(eq(schema.organizations.slug, "meta-platforms-tx"));

  assert.equal(orgRows.length, 1);
  assert.equal(orgRows[0].name, "Meta Platforms Texas");
  assert.equal(orgRows[0].organizationType, "hyperscaler");

  // 3. Insert project linked to organization
  await db.insert(schema.projects).values({
    id: "proj-typed-1",
    slug: "project-hyperion",
    name: "Project Hyperion",
    organizationId: "org-typed-1",
    stage: "permitting",
    powerDemandMw: 400.0,
  });

  const projRows = await db
    .select()
    .from(schema.projects)
    .where(eq(schema.projects.slug, "project-hyperion"));

  assert.equal(projRows.length, 1);
  assert.equal(projRows[0].powerDemandMw, 400.0);
  assert.equal(projRows[0].stage, "permitting");
});

test("db/schema.ts exports all 11 Compute Atlas entity tables", () => {
  const tableNames = [
    "sourceArtifacts",
    "observations",
    "organizations",
    "locations",
    "projects",
    "facilities",
    "developmentActions",
    "environmentalActions",
    "infrastructureRelationships",
    "connectorConfigs",
    "repairAudits",
  ];

  for (const name of tableNames) {
    assert.ok(schema[name], `Expected schema.${name} to be defined`);
    assert.equal(typeof schema[name], "object");
  }
});

test("Worker fetch handles requests cleanly when optional bindings (DB, IMAGES) are absent", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  // 1. Root route fetch with only ASSETS provided
  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    }
  );

  assert.equal(response.status, 200);

  // 2. Image route fetch without IMAGES binding does not crash
  let assetFetched = false;
  const imgResponse = await worker.fetch(
    new Request("http://localhost/_vinext/image?url=%2Fsam-johnson-snake-mark.png&w=640&q=75", {
      headers: { accept: "image/webp,image/*" },
    }),
    {
      ASSETS: {
        fetch: async () => {
          assetFetched = true;
          return new Response(new Uint8Array([0x89, 0x50, 0x4e, 0x47]), {
            status: 200,
            headers: { "content-type": "image/png" },
          });
        },
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    }
  );

  assert.equal(imgResponse.status, 200);
  assert.equal(assetFetched, true);
});

