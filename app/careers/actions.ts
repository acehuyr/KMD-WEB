"use server";

export type ApplicationFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

const REQUIRED_FIELDS = ["name", "email", "phone"] as const;

/**
 * ⚠ LAUNCH BLOCKER — this form loses every application it receives.
 *
 * Same problem as app/contact/actions.ts: required fields are validated
 * and the applicant is told their application was received, but neither
 * the form data nor the uploaded CV is sent anywhere. Wire up a real
 * email service / ATS before this page goes live.
 */
export async function submitApplication(
  _prevState: ApplicationFormState,
  formData: FormData
): Promise<ApplicationFormState> {
  for (const field of REQUIRED_FIELDS) {
    const value = formData.get(field);
    if (!value || String(value).trim() === "") {
      return {
        status: "error",
        message: "Please fill in your name, email and phone number.",
      };
    }
  }

  // TODO: send `formData` (including the CV file) to a real email
  // service / applicant tracking system once available.

  return {
    status: "success",
    message: "Thank you — we've received your application and will be in touch.",
  };
}
