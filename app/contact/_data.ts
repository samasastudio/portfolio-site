import { siteConfig } from "../_data/site";

export const contactData = {
  lead: {
    subtitle: "Contact / open channel",
    heading: ["Pull up", "a chair."],
    emphasis: "Let’s talk.",
  },
  signal: {
    statusText: "Signal open",
    imageSrc: siteConfig.snakeMarkImage,
  },
  body: "I’m interested in senior frontend, product engineering, and developer experience work—especially where craft and systems thinking are treated as the same job.",
  cta: {
    label: "Start a conversation",
    linkText: "LinkedIn ↗",
    url: siteConfig.linkedinUrl,
  },
  fineprint: ["BASED IN AUSTIN, TEXAS", "WORKING ACROSS TIME ZONES"],
} as const;
