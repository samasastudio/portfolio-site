import Link from "next/link";
import type { ReactNode } from "react";

interface RoundLinkProps {
  href: string;
  children: ReactNode;
  arrow?: string;
  className?: string;
}

export function RoundLink({
  href,
  children,
  arrow = "↘",
  className = "",
}: RoundLinkProps) {
  return (
    <Link className={`round-link ${className}`.trim()} href={href}>
      <span>{children}</span>
      <b>{arrow}</b>
    </Link>
  );
}
