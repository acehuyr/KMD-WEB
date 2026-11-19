/**
 * Maintenance switch for the whole site.
 *
 * While the site is offline, proxy.ts answers every page request with the
 * offline page (lib/offline-page.ts) and an HTTP 503, so visitors see a
 * holding page and search engines know the outage is temporary.
 *
 * To bring the site back online, either:
 *   - set SITE_OFFLINE_DEFAULT below to `false` and redeploy, or
 *   - set the SITE_OFFLINE environment variable to "false" on the host
 *     (e.g. Vercel → Settings → Environment Variables) and redeploy —
 *     no code change needed. "true" forces the site offline the same way.
 */
const SITE_OFFLINE_DEFAULT = true;

export function isSiteOffline(): boolean {
  const override = process.env.SITE_OFFLINE?.trim().toLowerCase();
  if (override === "true") return true;
  if (override === "false") return false;
  return SITE_OFFLINE_DEFAULT;
}
