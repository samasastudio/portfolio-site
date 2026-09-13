"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface SiteShellProps {
  header: ReactNode;
  nav: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}

export function SiteShell({ header, nav, footer, children }: SiteShellProps) {
  const pathname = usePathname();

  const getPageClass = () => {
    if (pathname === "/") return "page-home";
    if (pathname === "/work" || pathname?.startsWith("/work/")) return "page-work";
    if (pathname === "/profile" || pathname?.startsWith("/profile/")) return "page-profile";
    if (pathname === "/contact" || pathname?.startsWith("/contact/")) return "page-contact";
    if (pathname === "/systems" || pathname?.startsWith("/systems/")) return "page-systems";
    return "page-default";
  };

  return (
    <main className={`site ${getPageClass()}`}>
      {header}
      {nav}
      <div className="stage" key={pathname}>
        {children}
      </div>
      {footer}
    </main>
  );
}
