"use client";

import { useActionState } from "react";
import { FormField } from "@/components/forms/FormField";
import { submitApplication, type ApplicationFormState } from "@/app/careers/actions";
import { cx } from "@/lib/cx";

const initialState: ApplicationFormState = { status: "idle", message: "" };

export function ApplicationForm() {
  const [state, formAction, pending] = useActionState(submitApplication, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-10">
      <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
        <FormField label="Name" name="name" required placeholder="Your full name" />
        <FormField label="Email" name="email" type="email" required placeholder="you@email.com" />
        <FormField label="Phone" name="phone" type="tel" required placeholder="+91" />
        <FormField
          label="Role Interested In"
          name="role"
          placeholder="e.g. Interior Designer"
        />
        <FormField
          label="Experience"
          name="experience"
          placeholder="e.g. 3 years"
        />
        <FormField
          as="file"
          label="CV Upload"
          name="cv"
          accept=".pdf,.doc,.docx"
        />
      </div>

      <FormField
        as="textarea"
        label="Message"
        name="message"
        rows={5}
        placeholder="Tell us a bit about yourself and why you'd like to join KMD Interior."
      />

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex w-fit items-center gap-2 border border-bronze px-6 py-3.5 text-sm tracking-wide text-charcoal transition-colors duration-300 hover:bg-bronze hover:text-ivory disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Sending…" : "Submit Application"}
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
