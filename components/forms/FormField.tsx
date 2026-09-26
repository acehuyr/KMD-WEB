import { cx } from "@/lib/cx";

const inputClass =
  "w-full border-b border-beige bg-transparent py-3 text-charcoal placeholder:text-charcoal-soft/50 focus:border-bronze focus:outline-none transition-colors duration-300";

type BaseProps = {
  label: string;
  name: string;
  required?: boolean;
  className?: string;
};

type FormFieldProps =
  | (BaseProps & { as?: "input"; type?: string; placeholder?: string })
  | (BaseProps & { as: "textarea"; placeholder?: string; rows?: number })
  | (BaseProps & {
      as: "select";
      options: { label: string; value: string }[];
      placeholder?: string;
    })
  | (BaseProps & { as: "file"; accept?: string });

/**
 * Flat underline-style field (no boxed/rounded input chrome, per the
 * design system) shared by the Contact and Careers forms. Polymorphic
 * over input/textarea/select/file rather than four near-duplicate
 * components.
 */
export function FormField(props: FormFieldProps) {
  const { label, name, required, className } = props;

  return (
    <label htmlFor={name} className={cx("form-field flex flex-col gap-2", className)}>
      <span className="eyebrow">
        {label}
        {required && (
          <span aria-hidden="true" className="text-bronze">
            {" "}
            *
          </span>
        )}
      </span>

      {props.as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          required={required}
          placeholder={props.placeholder}
          rows={props.rows ?? 5}
          className={cx(inputClass, "resize-none")}
        />
      ) : props.as === "select" ? (
        <select
          id={name}
          name={name}
          required={required}
          defaultValue=""
          className={inputClass}
        >
          <option value="" disabled>
            {props.placeholder ?? "Select"}
          </option>
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : props.as === "file" ? (
        <input
          id={name}
          name={name}
          type="file"
          required={required}
          accept={props.accept}
          className={cx(
            inputClass,
            "text-sm text-charcoal-soft file:mr-4 file:border file:border-bronze file:bg-transparent file:px-4 file:py-2 file:text-sm file:text-bronze file:transition-colors file:duration-300 hover:file:bg-bronze hover:file:text-ivory"
          )}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={props.type ?? "text"}
          required={required}
          placeholder={props.placeholder}
          className={inputClass}
        />
      )}
    </label>
  );
}
