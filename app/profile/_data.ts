export interface Capability {
  n: string;
  strong: string[];
  span: string;
  className: string;
}

export const profileData = {
  intro: {
    subtitle: "Profile / the short version",
    headingLines: ["Engineer.", "Translator."],
    emphasis: "Wayfinder.",
  },
  manifesto: {
    badge: "READING ROOM / 03",
    paragraphs: [
      "I’m a frontend-focused full-stack engineer who likes the difficult middle: where product intent, technical systems, and the people building them need to agree.",
      "At SelectQuote, I’ve built financial software across React, TypeScript, Node, MSSQL, and AWS—and served as a frontend SME helping teams make better, more durable decisions.",
    ],
  },
  capabilities: [
    {
      n: "01",
      strong: ["Make it", "clear"],
      span: "Interface & systems design",
      className: "cap cap-a",
    },
    {
      n: "02",
      strong: ["Make it", "real"],
      span: "Full-stack delivery",
      className: "cap cap-b",
    },
    {
      n: "03",
      strong: ["Make it", "repeatable"],
      span: "DX & team enablement",
      className: "cap cap-c",
    },
  ] as Capability[],
  centerBadge: {
    symbol: "✦",
    name: "SAM J.",
  },
  workingSet: {
    label: "Working set",
    tools:
      "React · TypeScript · JavaScript · Node.js · SQL · Zustand · TanStack Query · AWS · Design systems · AI-assisted development",
  },
} as const;
