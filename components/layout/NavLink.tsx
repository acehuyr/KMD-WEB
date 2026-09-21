"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

/**
 * Desktop nav item with a bronze underline that grows in on hover, and
 * stays filled for the active route (bronze is the brand's accent for
 * active nav state).
 */
export function NavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cx(
        "group relative py-1 text-sm tracking-wide text-current",
        isActive && "text-bronze"
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className={cx(
          "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-bronze transition-transform duration-300 ease-out",
          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        )}
      />
    </Link>
  );
}
