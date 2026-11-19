import { NextResponse } from "next/server";
import { renderOfflinePage } from "@/lib/offline-page";
import { isSiteOffline } from "@/lib/site-status";

/**
 * Maintenance mode. While lib/site-status.ts says the site is offline,
 * every page request — and every form submission — gets the offline page
 * with a 503 and a Retry-After header, which tells search engines the
 * outage is temporary so existing rankings are kept.
 *
 * Static files (scripts, styles, images, fonts) are excluded by the
 * matcher so the offline page's own logo and photograph still load.
 */
export function proxy() {
  if (!isSiteOffline()) return NextResponse.next();

  return new NextResponse(renderOfflinePage(), {
    status: 503,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Retry-After": "3600",
    },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.(?:png|jpe?g|webp|avif|gif|svg|ico|woff2?|ttf|txt|xml|webmanifest)$).*)",
  ],
};
