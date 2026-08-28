---
name: mcp-builder
description: Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools. Use when building MCP servers to integrate external APIs, databases, or local tools in TypeScript or Python.
---

# Model Context Protocol (MCP) Server Builder

Use this skill when designing, implementing, or testing an MCP server to connect AI agents to external APIs, databases, or developer tools.

## Core MCP Principles

1. **Tool Granularity & Naming**:
   - Use clear, action-oriented names with consistent prefixes (e.g., `drizzle_query_schema`, `github_create_issue`).
   - Write concise, unambiguous tool descriptions so the model understands exactly when and how to call each tool.

2. **Schema & Validation**:
   - Use **Zod** (TypeScript) or **Pydantic** (Python) for strict input validation.
   - Provide clear field descriptions and enum constraints to eliminate invalid parameters.

3. **Context-Conscious Outputs**:
   - Return structured, token-efficient responses.
   - Implement pagination and filtering so large API payloads do not blow out the agent's context window.

4. **Actionable Error Messages**:
   - In case of failure, return descriptive error messages that explain *why* the failure occurred and suggest remedial parameters or actions.

---

## Standard TypeScript MCP Server Implementation

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "my-custom-mcp-server",
  version: "1.0.0"
});

// Register Tool
server.tool(
  "query_data",
  "Fetches filtered records from the internal service",
  {
    category: z.string().describe("Data category to query"),
    limit: z.number().min(1).max(50).default(10).describe("Maximum items to return")
  },
  async ({ category, limit }) => {
    try {
      const results = await fetchInternalData(category, limit);
      return {
        content: [{ type: "text", text: JSON.stringify(results, null, 2) }]
      };
    } catch (error) {
      return {
        isError: true,
        content: [{ type: "text", text: `Error fetching data: ${(error as Error).message}` }]
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
```

---

## Testing & Verification
- Test tools locally using the official inspector:
  ```bash
  npx @modelcontextprotocol/inspector <path-to-server-executable>
  ```
