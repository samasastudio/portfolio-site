"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "../../_data/navigation";

export function NavRail() {
  const pathname = usePathname();

  return (
    <nav className="navrail" aria-label="Primary navigation">
      {navigationItems.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname?.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.id}
            href={item.href}
            className={isActive ? "active" : ""}
          >
            <small>{item.index}</small>
            <span>{item.label}</span>
            <b>↗</b>
          </Link>
        );
      })}
    </nav>
  );
}
