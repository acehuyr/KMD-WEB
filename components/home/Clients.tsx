import { CLIENTS } from "@/content/clients";

/**
 * Renders nothing while no verified client is confirmed.
 *
 * This previously showed five "[CONFIRM: client name]" boxes, which read
 * as an unfinished build on a live page. The section reappears on its own
 * the moment a real client is added to content/clients.ts — see that file
 * for why the live site's own logo strip could not be migrated.
 */
export function Clients() {
  if (CLIENTS.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="clients-heading"
      className="bg-ivory py-section-sm md:py-section-md"
      id="clients"
    >
      <div className="wrapper flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <span className="eyebrow">Trusted By</span>
          <h2 id="clients-heading" className="sr-only">
            Trusted by
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-px border border-beige bg-beige sm:grid-cols-3 lg:grid-cols-5">
          {CLIENTS.map((client) => (
            <div
              key={client.name}
              className="flex h-24 items-center justify-center bg-ivory px-6 text-center grayscale transition-[filter] duration-300 hover:grayscale-0"
            >
              {client.logoSrc ? (
                // eslint-disable-next-line @next/next/no-img-element -- swap for next/image once real logo assets exist
                <img
                  src={client.logoSrc}
                  alt={client.name}
                  className="max-h-10 w-auto"
                />
              ) : (
                <span className="text-sm text-charcoal-soft">{client.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
