"use client";

import { startTransition, useActionState, useEffect, useRef, type FormEvent } from "react";
import { FormField } from "@/components/forms/FormField";
import { submitEnquiry, type EnquiryFormState } from "@/app/contact/actions";
import { cx } from "@/lib/cx";

const PROJECT_TYPE_OPTIONS = [
  { label: "Residential", value: "Residential" },
  { label: "Commercial", value: "Commercial" },
  { label: "Hospitality", value: "Hospitality" },
  { label: "Turnkey Interior", value: "Turnkey Interior" },
  { label: "Carpentry", value: "Carpentry" },
  { label: "Other", value: "Other" },
];

const initialState: EnquiryFormState = { status: "idle", message: "" };

export function EnquiryForm() {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // React resets a form after every action, which would wipe a long
  // message when sending fails. Submitting through a transition skips
  // that reset, so the form is only cleared once the enquiry is received.
  // (Without JavaScript, `action` still posts the form normally.)
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  };

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} onSubmit={onSubmit} className="enquiry-form flex flex-col gap-10">
      <div className="enquiry-intro"><span className="eyebrow">Tell us what you have in mind</span><p>Share a few details about your space, your plans, and what matters to you.</p></div>
      {/* Spam trap: invisible to people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
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
          className="group button-primary"
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
