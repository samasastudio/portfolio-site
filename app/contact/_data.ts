import { siteConfig } from "../_data/site";

export const contactData = {
  lead: {
    subtitle: "Contact / direct channel",
    heading: ["Direct channel."],
    emphasis: "Let’s talk.",
  },
  signal: {
    statusText: "Signal open",
    badge: "OPERATIONAL STATUS",
    availability: "Available for select roles & systems advisory",
    location: "Austin, Texas · US Central (UTC-5)",
    focus: "Frontend Architecture · Platforms · DX",
  },
  body: "I’m interested in senior frontend, platform architecture, and developer enablement work—especially where systems thinking and product craft are treated as the same discipline.",
  cta: {
    label: "Start a conversation",
    linkText: "LinkedIn ↗",
    url: siteConfig.linkedinUrl,
  },
  fineprint: [
    "BASED IN AUSTIN, TEXAS · UTC-5",
    "REMOTE & HYBRID COLLABORATION",
    "DIRECT RESPONSE WITHIN 48 HOURS",
  ],
} as const;
