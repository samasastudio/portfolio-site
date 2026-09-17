export interface Capability {
  n: string;
  category: string;
  strong: string[];
  span: string;
  className: string;
}

export const profileData = {
  intro: {
    subtitle: "Profile / background & practice",
    headingLines: ["Frontend architect."],
    emphasis: "Systems engineer.",
  },
  manifesto: {
    badge: "READING ROOM / 03",
    paragraphs: [
      "I’m a frontend-focused full-stack engineer who thrives in the difficult middle: where product intent, technical systems, and the teams building them must align.",
      "At SelectQuote, I’ve architected financial platforms across React, TypeScript, Node, MSSQL, and AWS—serving as a frontend SME helping engineering teams build durable, maintainable software.",
    ],
  },
  capabilities: [
    {
      n: "01",
      category: "ARCHITECTURE & PLATFORM",
      strong: ["Systems &", "Interface"],
      span: "Component design, type-safe API boundaries, design systems, and dense financial data workflows.",
      className: "cap cap-a",
    },
    {
      n: "02",
      category: "PRACTICE & ENABLEMENT",
      strong: ["DX & Team", "Leverage"],
      span: "Engineering patterns, developer tooling, steering standards, and agentic workflows.",
      className: "cap cap-b",
    },
  ] as Capability[],
  stampBadge: {
    symbol: "✦",
    name: "SAM J.",
    location: "AUSTIN",
  },
  workingSet: {
    label: "Working set / technical disciplines",
    groups: [
      { discipline: "CORE STACK & UI", stack: "React · TypeScript · Next.js · Design Systems · Vite · Tailwind" },
      { discipline: "PLATFORMS & DX", stack: "Node.js · MSSQL · Drizzle · Agentic Workflows · CI/CD · Cloudflare · AWS" },
    ],
  },
} as const;
