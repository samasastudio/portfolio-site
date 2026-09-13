import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

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
      <body className={`${sans.variable} ${mono.variable}`}>
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
