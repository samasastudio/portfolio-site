import type { Metadata } from "next";
import { Fira_Sans, IBM_Plex_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const sans = Fira_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const serif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sam Johnson — Software Engineer",
  description: "Frontend-focused software engineer building clear systems for complicated work.",
  other: { "codex-preview": "development" },
};

import { SiteShell } from "./_components/layout/SiteShell";
import { TopBar } from "./_components/layout/TopBar";
import { NavRail } from "./_components/layout/NavRail";
import { SiteFooter } from "./_components/layout/SiteFooter";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
        <SiteShell
          header={<TopBar />}
          nav={<NavRail />}
          footer={<SiteFooter />}
        >
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
