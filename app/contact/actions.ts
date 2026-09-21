"use server";

export type EnquiryFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

const REQUIRED_FIELDS = ["name", "phone", "email", "message"] as const;

/**
 * ⚠ LAUNCH BLOCKER — this form loses every enquiry it receives.
 *
 * The action validates the required fields and then returns a success
 * message telling the visitor "we've received your enquiry", but nothing
 * is sent anywhere: no email service, CRM or database is wired up, and
 * `formData` is discarded when this function returns.
 *
 * Do not put this page in front of real customers until the integration
 * below exists. Until then the only working enquiry routes are the
 * phone, email and WhatsApp links rendered next to the form.
 */
export async function submitEnquiry(
  _prevState: EnquiryFormState,
  formData: FormData
): Promise<EnquiryFormState> {
  for (const field of REQUIRED_FIELDS) {
    const value = formData.get(field);
    if (!value || String(value).trim() === "") {
      return {
        status: "error",
        message: "Please fill in your name, phone, email and message.",
      };
    }
  }

  // TODO: send `formData` to a real email service / CRM once available.

  return {
    status: "success",
    message:
      "Thank you — we've received your enquiry and will be in touch shortly.",
  };
}
