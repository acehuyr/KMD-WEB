import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/nav-links";
import { SITE_CONTACT, SITE_CONTACT_MAPS_HREF } from "@/content/contact";
import { COMPANY_FOOTER_NOTE } from "@/content/company";
import { Logo } from "./Logo";

/**
 * No social icons here on purpose. kmdinterior.com links to no social
 * profile anywhere on any page, so there is nothing to migrate — and the
 * three icons that used to sit here all pointed at href="#", which is a
 * dead link on a production page. The icon components remain in
 * components/icons/social.tsx for when real profile URLs are confirmed.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="section-dark">
      <div className="wrapper pb-8 pt-16 lg:pt-20">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="flex flex-col gap-6">
            <Logo withTagline />
            <p className="text-measure text-ivory/70">{COMPANY_FOOTER_NOTE}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-4">
            <span className="eyebrow">Navigate</span>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ivory/80 transition-colors hover:text-bronze"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <span className="eyebrow">Contact</span>
            <address className="flex flex-col gap-2 not-italic text-ivory/80">
              <a
                href={SITE_CONTACT_MAPS_HREF}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-bronze"
              >
                {SITE_CONTACT.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </a>
              <a
                href={`tel:${SITE_CONTACT.phoneTel}`}
                className="pt-1 transition-colors hover:text-bronze"
              >
                {SITE_CONTACT.phoneDisplay}
              </a>
              <a
                href={`mailto:${SITE_CONTACT.email}`}
                className="transition-colors hover:text-bronze"
              >
                {SITE_CONTACT.email}
              </a>
            </address>
          </div>
        </div>

        <div className="footer-masthead" aria-hidden="true">Spaces. Stories. Soul.</div>

        {/*
          Privacy Policy / Terms links removed: /privacy and /terms are not
          routes in this app and the live site publishes no such pages, so
          both were 404s in the footer of every page. Add the pages first,
          then link them.
        */}
        <div className="flex flex-wrap justify-between gap-4 border-t border-ivory/15 pt-6 text-[10px] text-ivory/60">
          <p>© {year} KMD Interior. All Rights Reserved.</p>
          <p>Made with care. Based in Mumbai.</p>
        </div>
      </div>
    </footer>
  );
}
