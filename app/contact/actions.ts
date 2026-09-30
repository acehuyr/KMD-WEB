"use server";

import { SITE_CONTACT } from "@/content/contact";
import { deliverEnquiry, type Enquiry } from "@/lib/enquiry-delivery";

export type EnquiryFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

const REQUIRED_FIELDS = ["name", "phone", "email", "message"] as const;
const FIELDS: (keyof Enquiry)[] = [
  "name",
  "phone",
  "email",
  "projectLocation",
  "projectType",
  "approximateArea",
  "estimatedBudget",
  "expectedStartDate",
  "message",
];
const MAX_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FALLBACK = `Sorry — your enquiry couldn't be sent just now. Please call us on ${SITE_CONTACT.phoneDisplay} or email ${SITE_CONTACT.email}.`;

/**
 * Validates an enquiry and delivers it by email and/or to the enquiries
 * Google Sheet — see lib/enquiry-delivery.ts and .env.example for setup.
 *
 * The visitor is only told their enquiry was received when a channel
 * actually accepted it. If none is configured or every channel fails,
 * they get the phone number and email address instead, so nothing is
 * silently lost.
 */
export async function submitEnquiry(
  _prevState: EnquiryFormState,
  formData: FormData
): Promise<EnquiryFormState> {
  // Honeypot: a field hidden from people. Bots fill every input; pretend
  // it worked so they don't retry, but send nothing.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { status: "success", message: "Thank you — we've received your enquiry and will be in touch shortly." };
  }

  const enquiry = Object.fromEntries(
    FIELDS.map((field) => [field, String(formData.get(field) ?? "").trim()])
  ) as Enquiry;

  if (REQUIRED_FIELDS.some((field) => enquiry[field] === "")) {
    return { status: "error", message: "Please fill in your name, phone, email and message." };
  }
  if (!EMAIL_PATTERN.test(enquiry.email)) {
    return { status: "error", message: "Please check your email address." };
  }
  if (
    enquiry.message.length > MAX_MESSAGE_LENGTH ||
    FIELDS.some((field) => field !== "message" && enquiry[field].length > MAX_LENGTH)
  ) {
    return { status: "error", message: "Some of your answers are too long — please shorten them and try again." };
  }

  const result = await deliverEnquiry(enquiry);
  if (result !== "delivered") {
    return { status: "error", message: FALLBACK };
  }

  return {
    status: "success",
    message: "Thank you — we've received your enquiry and will be in touch shortly.",
  };
}
