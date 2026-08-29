"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { TopBar } from "./TopBar";
import { NavRail } from "./NavRail";
import { SiteFooter } from "./SiteFooter";

interface SiteShellProps {
  children: ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();

  const getPageClass = () => {
    if (pathname === "/") return "page-home";
    if (pathname?.startsWith("/work")) return "page-work";
    if (pathname?.startsWith("/profile")) return "page-profile";
    if (pathname?.startsWith("/contact")) return "page-contact";
    return "page-home";
  };

  return (
    <main className={`site ${getPageClass()}`}>
      <TopBar />
      <NavRail />
      <div className="stage" key={pathname}>
        {children}
      </div>
      <SiteFooter />
    </main>
  );
}
