import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { OfficeMap } from "@/components/contact/OfficeMap";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with KMD Interior — interior design, turnkey contracting and carpentry in Santacruz West, Mumbai. Call, WhatsApp or send a project enquiry.",
};

export default function ContactPage() {
  return (
    <>
    <section aria-labelledby="contact-heading" className="bg-ivory pb-section-md pt-32 md:pt-40 lg:pb-section-lg">
      <div className="wrapper flex flex-col gap-16">
        <SectionHeading
          as="h1"
          id="contact-heading"
          eyebrow="Start a Project"
          lines={["A space of your own.", "Let’s begin."]}
        />

        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-24">
          <ContactDetails />
          <EnquiryForm />
        </div>
      </div>
    </section>
    <OfficeMap />
    </>
  );
}
