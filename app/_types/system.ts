export type SystemStatus = "concept" | "development" | "live";

export interface SystemItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  summary: string;
  status: SystemStatus;
  runtime: string;
  endpoint?: string;
}
