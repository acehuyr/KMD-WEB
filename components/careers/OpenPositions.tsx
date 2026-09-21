import { OPENINGS } from "@/content/careers";

export function OpenPositions() {
  return (
    <div className="flex flex-col gap-8">
      <span className="eyebrow">Open Positions</span>

      {OPENINGS.length > 0 ? (
        <ul className="flex flex-col border-t border-beige">
          {OPENINGS.map((job) => (
            <li
              key={job.title}
              className="flex flex-col gap-2 border-b border-beige py-8 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="font-serif text-2xl text-charcoal">{job.title}</span>
              <span className="text-sm text-charcoal-soft">
                {job.location} — {job.type}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center gap-3 border border-dashed border-beige px-8 py-16 text-center">
          <p className="font-serif text-2xl text-charcoal">
            We&rsquo;re always interested in meeting talented people.
          </p>
          <p className="max-w-md text-charcoal-soft">
            There are no open positions listed right now — send your CV below
            and we&rsquo;ll keep it on file for future opportunities.
          </p>
        </div>
      )}
    </div>
  );
}
