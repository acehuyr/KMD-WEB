/** Spec-sheet-style project meta block (location, type, area, etc.). */
export function CaseStudyMeta({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <dl className="grid grid-cols-2 gap-x-8 gap-y-8 border-t border-beige pt-8 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-2">
          <dt className="eyebrow">{item.label}</dt>
          <dd className="font-serif text-lg text-charcoal">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
