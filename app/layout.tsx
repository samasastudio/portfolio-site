import type { Metadata } from "next";
import "./globals.css";

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
      <body>
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
