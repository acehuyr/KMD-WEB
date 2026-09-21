/**
 * Minimal classnames combiner — avoids pulling in `clsx`/`cva` for the
 * handful of conditional classes used across layout components.
 */
export function cx(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
