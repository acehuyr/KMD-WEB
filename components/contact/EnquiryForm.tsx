"use client";

import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, AlertCircle, LoaderCircle } from "lucide-react";
import { FormField } from "@/components/forms/FormField";
import { submitEnquiry, type EnquiryFormState } from "@/app/contact/actions";
import { cx } from "@/lib/cx";
import { SITE_CONTACT } from "@/content/contact";

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
  const [state, formAction, pending] = useActionState(
    async (previous: EnquiryFormState, data: FormData): Promise<EnquiryFormState> => {
      try {
        return await submitEnquiry(previous, data);
      } catch {
        // A network interruption or server timeout must not crash the form
        // or claim that delivery succeeded. Keep the visitor's draft.
        return {
          status: "error",
          message: `We couldn't confirm whether your enquiry was sent. Your details are still here. Please contact us on ${SITE_CONTACT.phoneDisplay} or email ${SITE_CONTACT.email} before trying again.`,
        };
      }
    },
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const [isTakingLonger, setIsTakingLonger] = useState(false);

  useEffect(() => {
    if (!pending) return;
    const timer = window.setTimeout(() => setIsTakingLonger(true), 8000);
    return () => window.clearTimeout(timer);
  }, [pending]);

  // React resets a form after every action, which would wipe a long
  // message when sending fails. Submitting through a transition skips
  // that reset, so the form is only cleared once the enquiry is received.
  // (Without JavaScript, `action` still posts the form normally.)
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;
    setIsTakingLonger(false);
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  };

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
    if (state.status !== "idle") {
      feedbackRef.current?.focus({ preventScroll: true });
      feedbackRef.current?.scrollIntoView({ behavior: "instant", block: "nearest" });
    }
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
          {pending ? "Sending your enquiry…" : state.status === "success" ? "Enquiry sent ✓" : "Send Project Enquiry"}
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </button>

        <div
          ref={feedbackRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="outline-none"
        >
        {(pending || state.message) && (
          <div
            className={cx(
              "flex items-start gap-3 border p-5 text-sm",
              pending ? "border-bronze/30 bg-ivory text-charcoal" : state.status === "error" ? "border-red-800/25 bg-red-50 text-red-950" : "border-green-800/25 bg-green-50 text-green-950"
            )}
          >
            {pending ? <LoaderCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 motion-safe:animate-spin" /> : state.status === "success" ? <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" /> : <AlertCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />}
            <div>
              <p className="font-semibold">{pending ? "Sending your enquiry" : state.status === "success" ? "Your enquiry has been sent" : "Please check your enquiry"}</p>
              <p className="mt-1 leading-relaxed">{pending ? isTakingLonger ? "This is taking a little longer. Please keep this page open — we'll confirm the result here." : "Please wait while we send your details. You don't need to submit again." : state.message}</p>
            </div>
          </div>
        )}
        </div>
      </div>
    </form>
  );
}
