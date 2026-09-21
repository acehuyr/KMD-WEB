import type { ReactNode } from "react";
import {
  SITE_CONTACT,
  SITE_CONTACT_MAPS_HREF,
  SITE_CONTACT_WHATSAPP_HREF,
} from "@/content/contact";

export function ContactDetails() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-8 border-t border-beige pt-8">
        <ContactRow label="Call">
          <a
            href={`tel:${SITE_CONTACT.phoneTel}`}
            className="font-serif text-2xl text-charcoal transition-colors duration-300 hover:text-bronze"
          >
            {SITE_CONTACT.phoneDisplay}
          </a>
        </ContactRow>

        <ContactRow label="Email">
          <a
            href={`mailto:${SITE_CONTACT.email}`}
            className="font-serif text-2xl text-charcoal transition-colors duration-300 hover:text-bronze"
          >
            {SITE_CONTACT.email}
          </a>
        </ContactRow>

        <ContactRow label="Office">
          <address className="font-serif text-2xl not-italic text-charcoal">
            {SITE_CONTACT.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <a
            href={SITE_CONTACT_MAPS_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-2 text-sm tracking-wide text-bronze"
          >
            Get Directions
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </ContactRow>
      </div>

      <a
        href={SITE_CONTACT_WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex w-fit items-center gap-2 border border-bronze px-6 py-3.5 text-sm tracking-wide text-charcoal transition-colors duration-300 hover:bg-bronze hover:text-ivory"
      >
        Message Us on WhatsApp
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </a>
    </div>
  );
}

function ContactRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="eyebrow">{label}</span>
      {children}
    </div>
  );
}
