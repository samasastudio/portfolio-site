export type SystemStatus = "concept" | "development" | "live";

/**
 * SystemGatewayContract defines metadata and runtime status contracts
 * for the 3 Compute Atlas gateway surfaces.
 */
export interface SystemGatewayContract {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: string;
  summary: string;
  status: SystemStatus;
  runtime: string;
  endpoint: string;
  specPath: string;
  adrPath: string;
  technologies: readonly string[];
  capabilities: readonly string[];
  invariants: readonly string[];
  repositoryUri?: string;
}

export type SystemItem = SystemGatewayContract;
