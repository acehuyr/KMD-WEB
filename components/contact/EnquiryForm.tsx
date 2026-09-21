"use client";

import { useActionState } from "react";
import { FormField } from "@/components/forms/FormField";
import { submitEnquiry, type EnquiryFormState } from "@/app/contact/actions";
import { cx } from "@/lib/cx";

const PROJECT_TYPE_OPTIONS = [
  { label: "Residential", value: "residential" },
  { label: "Commercial", value: "commercial" },
  { label: "Hospitality", value: "hospitality" },
  { label: "Turnkey Interior", value: "turnkey" },
  { label: "Carpentry", value: "carpentry" },
  { label: "Other", value: "other" },
];

const initialState: EnquiryFormState = { status: "idle", message: "" };

export function EnquiryForm() {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-10">
      <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
        <FormField label="Name" name="name" required placeholder="Your full name" />
        <FormField label="Phone" name="phone" type="tel" required placeholder="+91" />
        <FormField
          label="Email"
          name="email"
          type="email"
          required
          placeholder="you@email.com"
          className="sm:col-span-2"
        />
        <FormField
          label="Project Location"
          name="projectLocation"
          placeholder="e.g. Bandra West, Mumbai"
        />
        <FormField
          as="select"
          label="Project Type"
          name="projectType"
          placeholder="Select a project type"
          options={PROJECT_TYPE_OPTIONS}
        />
        <FormField
          label="Approximate Area"
          name="approximateArea"
          placeholder="e.g. 1,200 sq ft"
        />
        <FormField
          label="Estimated Budget"
          name="estimatedBudget"
          placeholder="Optional"
        />
        <FormField
          label="Expected Start Date"
          name="expectedStartDate"
          type="date"
          className="sm:col-span-2"
        />
      </div>

      <FormField
        as="textarea"
        label="Message"
        name="message"
        required
        rows={5}
        placeholder="Tell us about your space and what you're planning."
      />

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex w-fit items-center gap-2 border border-bronze px-6 py-3.5 text-sm tracking-wide text-charcoal transition-colors duration-300 hover:bg-bronze hover:text-ivory disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Sending…" : "Send Project Enquiry"}
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </button>

        {state.message && (
          <p
            aria-live="polite"
            className={cx(
              "text-sm",
              state.status === "error" ? "text-bronze-dark" : "text-charcoal-soft"
            )}
          >
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
