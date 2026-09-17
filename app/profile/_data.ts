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
    headingLines: ["Systems engineer.", "Frontend architect."],
    emphasis: "Technical lead.",
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
      category: "ARCHITECTURE",
      strong: ["Systems &", "Interface"],
      span: "Component design, type-safe APIs, and design tokens.",
      className: "cap cap-a",
    },
    {
      n: "02",
      category: "DELIVERY",
      strong: ["Full-Stack", "Reliability"],
      span: "Dense transactional logic, Node services, and resilient data.",
      className: "cap cap-b",
    },
    {
      n: "03",
      category: "PRACTICE",
      strong: ["DX & Team", "Leverage"],
      span: "Engineering patterns, developer tooling, and agentic workflows.",
      className: "cap cap-c",
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
      { discipline: "FRONTEND", stack: "React · TypeScript · Next.js · Design Systems · Vite" },
      { discipline: "DATA & RUNTIME", stack: "Node.js · MSSQL · Drizzle · Zustand · TanStack" },
      { discipline: "DX & AGENTS", stack: "Agentic Steering · CI/CD · Cloudflare · AWS" },
    ],
  },
} as const;
