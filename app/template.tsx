"use client";

import { useEffect, useState, type ReactNode } from "react";

// Flipped once the first page has mounted, so the entrance below only
// plays on client-side navigations. On the initial load it would hold the
// hero — and the LCP photograph — behind an opacity ramp, and the hero
// already has its own entrance.
let hasMounted = false;

export default function Template({ children }: { children: ReactNode }) {
  const [enter] = useState(() => hasMounted);
  useEffect(() => {
    hasMounted = true;
  }, []);

  return <div className={enter ? "page-enter" : undefined}>{children}</div>;
}
