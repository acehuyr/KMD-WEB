import { SITE_CONTACT } from "@/content/contact";

/**
 * The page every visitor sees while the site is offline (see
 * lib/site-status.ts). proxy.ts returns it directly as a complete HTML
 * document, so it doesn't depend on the app's layout, header, scripts or
 * any route rendering — it keeps working whatever state the rest of the
 * site is in.
 *
 * Styling mirrors the site's tokens in app/globals.css (ivory, charcoal,
 * beige, a sparing bronze accent; Fraunces display serif over Geist).
 * The only assets are the logo and one project photograph, both in
 * public/ and excluded from the proxy matcher so they still load.
 */

const PHOTO = {
  src: "/projects/living-room-timber-ceiling.webp",
  alt: "Living room beneath a slatted timber ceiling",
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function renderOfflinePage(): string {
  const { email, phoneDisplay, phoneTel, officeLines } = SITE_CONTACT;
  const year = new Date().getFullYear();

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Temporarily offline | KMD Interiors Pvt. Ltd.</title>
<meta name="description" content="The KMD Interiors Pvt. Ltd. website is temporarily offline. Contact the studio by email or phone in the meantime.">
<link rel="icon" href="/brand/kmd-logo.jpeg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..400;1,9..144,300..400&family=Geist:wght@400;500&display=swap">
<style>
  :root {
    --ivory: #f6f4ed;
    --charcoal: #292e25;
    --charcoal-soft: #4c5145;
    --beige: #dcd2c2;
    --bronze: #8c6f4e;
    --serif: "Fraunces", Georgia, "Times New Roman", serif;
    --sans: "Geist", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; }
  html, body { min-height: 100%; }
  body {
    background: var(--ivory);
    color: var(--charcoal);
    font-family: var(--sans);
    -webkit-font-smoothing: antialiased;
  }
  a { color: inherit; text-decoration: none; }
  a:focus-visible { outline: 2px solid var(--bronze); outline-offset: 4px; }

  .offline { display: grid; min-height: 100vh; min-height: 100svh; grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); }

  .copy { display: flex; flex-direction: column; justify-content: space-between; gap: 64px; padding: 40px clamp(24px, 5vw, 80px) 36px; }
  .brand { display: block; width: fit-content; }
  .brand img { display: block; height: 88px; width: auto; aspect-ratio: 640 / 460; object-fit: cover; object-position: center 44%; }

  .message { max-width: 34rem; }
  .kicker { display: flex; align-items: center; gap: 16px; font-size: 10px; line-height: 1.5; letter-spacing: .18em; text-transform: uppercase; color: var(--charcoal-soft); }
  .kicker::before { content: ""; width: 40px; height: 1px; background: var(--bronze); }
  h1 { margin-top: 32px; font-family: var(--serif); font-weight: 350; font-size: clamp(44px, 5.6vw, 84px); line-height: 1.02; letter-spacing: -.045em; }
  h1 em { color: var(--bronze); }
  .lede { margin-top: 32px; max-width: 30rem; font-size: 15px; line-height: 1.85; color: var(--charcoal-soft); }

  .contact { margin-top: 48px; display: grid; grid-template-columns: repeat(2, minmax(0, max-content)); gap: 0 48px; border-top: 1px solid var(--beige); }
  .contact a { display: flex; flex-direction: column; gap: 6px; padding-top: 20px; }
  .contact span { font-size: 10px; letter-spacing: .15em; text-transform: uppercase; color: var(--charcoal-soft); }
  .contact strong { font-family: var(--serif); font-weight: 350; font-size: 22px; letter-spacing: -.02em; border-bottom: 1px solid transparent; transition: border-color .3s, color .3s; width: fit-content; }
  .contact a:hover strong { color: var(--bronze); border-color: currentColor; }

  .meta { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px 32px; padding-top: 20px; border-top: 1px solid var(--beige); font-size: 11px; line-height: 1.7; color: var(--charcoal-soft); }

  .photo { position: relative; margin: 0; min-height: 100%; overflow: hidden; background: var(--beige); }
  .photo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }

  @media (prefers-reduced-motion: no-preference) {
    .message > * { animation: rise .9s cubic-bezier(.22,1,.36,1) both; }
    .message > :nth-child(2) { animation-delay: .08s; }
    .message > :nth-child(3) { animation-delay: .16s; }
    .message > :nth-child(4) { animation-delay: .24s; }
    .photo img { animation: settle 1.6s cubic-bezier(.22,1,.36,1) both; }
    @keyframes rise { from { opacity: 0; transform: translateY(14px); } }
    @keyframes settle { from { transform: scale(1.04); } }
  }

  @media (max-width: 860px) {
    .offline { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto auto; }
    .photo { order: -1; min-height: 0; aspect-ratio: 4 / 3; max-height: 46vh; width: 100%; }
    .copy { padding: 32px 16px 28px; gap: 48px; }
    .brand img { height: 64px; }
    .contact { grid-template-columns: minmax(0, 1fr); }
    .contact a { padding-block: 18px 0; }
    .contact a + a { margin-top: 18px; border-top: 1px solid var(--beige); }
  }
</style>
</head>
<body>
<main class="offline">
  <div class="copy">
    <a class="brand" href="/" aria-label="KMD Interiors Pvt. Ltd.">
      <img src="/brand/kmd-logo.jpeg" width="640" height="640" alt="KMD Interiors Pvt. Ltd.">
    </a>
    <div class="message">
      <p class="kicker">Website temporarily offline</p>
      <h1>We’ll be back <em>shortly.</em></h1>
      <p class="lede">Our website is offline for a little while. The studio is still working as usual — for a new enquiry or an ongoing project, reach us directly.</p>
      <div class="contact">
        <a href="mailto:${escapeHtml(email)}"><span>Email</span><strong>${escapeHtml(email)}</strong></a>
        <a href="tel:${escapeHtml(phoneTel)}"><span>Phone</span><strong>${escapeHtml(phoneDisplay)}</strong></a>
      </div>
    </div>
    <footer class="meta">
      <span>${officeLines.map(escapeHtml).join(", ")}</span>
      <span>© ${year} KMD Interiors Pvt. Ltd.</span>
    </footer>
  </div>
  <figure class="photo">
    <img src="${PHOTO.src}" alt="${escapeHtml(PHOTO.alt)}">
  </figure>
</main>
</body>
</html>`;
}
