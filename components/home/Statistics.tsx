import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { COMPANY_STATS as STATS } from "@/content/company";
import { cx } from "@/lib/cx";

export function Statistics() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="bg-ivory py-section-sm md:py-section-md"
    >
      <div className="wrapper">
        <h2 id="stats-heading" className="sr-only">
          KMD Interior, in numbers
        </h2>

        <div className="border-y border-beige">
          <div className="grid grid-cols-1 lg:grid-cols-4">
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={cx(
                  "flex flex-col gap-2 py-10",
                  index < STATS.length - 1 && "border-b border-beige lg:border-b-0",
                  index > 0 && "lg:border-l lg:border-beige lg:pl-10"
                )}
              >
                <span className="font-serif text-display text-charcoal">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="eyebrow">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
