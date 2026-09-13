declare interface Fetcher {
  fetch(request: Request | string, init?: RequestInit): Promise<Response>;
}

declare interface D1Result<T = unknown> {
  results: T[];
  success: boolean;
  meta: Record<string, unknown>;
  error?: string;
}

declare type D1Response<T = unknown> = D1Result<T>;

declare interface D1ExecResult {
  count: number;
  duration: number;
}

declare interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T | null>;
  run<T = unknown>(): Promise<D1Result<T>>;
  all<T = unknown>(): Promise<D1Result<T>>;
  raw<T = unknown>(options?: { columnNames?: boolean }): Promise<T[]>;
}

declare interface D1Database {
  prepare(query: string): D1PreparedStatement;
  dump(): Promise<ArrayBuffer>;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  exec(query: string): Promise<D1ExecResult>;
}

declare interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

declare module "cloudflare:workers" {
  export type {
    Fetcher,
    D1Result,
    D1Response,
    D1ExecResult,
    D1PreparedStatement,
    D1Database,
    ExecutionContext,
  };
  export const env: {
    DB?: D1Database;
    ASSETS?: Fetcher;
    [key: string]: unknown;
  };
}
