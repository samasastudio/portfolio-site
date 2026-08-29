import type { ProjectItem } from "../_types/project";

export const archiveTitle = {
  subtitle: "Selected work / 2022—26",
  heading: "The working archive.",
  note: "Three representative systems. The details that belong to employers stay with employers.",
} as const;

export const projects: ProjectItem[] = [
  {
    n: "01",
    title: "Accounting analysis & reporting",
    tag: "Product engineering",
    body: "A full-stack financial workflow for insurance accounting—turning dense operational rules into a legible, maintainable interface.",
    stack: "React / TypeScript / Node / MSSQL",
    result: "SYSTEMS, NOT SCREENS",
  },
  {
    n: "02",
    title: "Shared component infrastructure",
    tag: "Frontend platform",
    body: "Organized a common React foundation used across teams, balancing API consistency, contribution patterns, and the reality of parallel delivery.",
    stack: "React / Design systems / DX",
    result: "ONE LANGUAGE, MANY TEAMS",
  },
  {
    n: "03",
    title: "AI-enabled engineering practice",
    tag: "Developer experience",
    body: "Piloted agentic workflows, shaped reusable project context, and taught teams how to use AI with more rigor than autocomplete.",
    stack: "Agents / Steering / Enablement",
    result: "TOOLS INTO PRACTICE",
  },
];
