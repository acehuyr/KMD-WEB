"use client";

import { useId, useState } from "react";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

/**
 * Accessible drag-to-compare slider. The visible handle is driven by a
 * native `<input type="range">` (keyboard-operable, works with touch
 * drag natively) rather than custom pointer-event plumbing.
 *
 * Each side falls back to PhotoPlaceholder independently, so the
 * component itself stays usable even if only one real image exists.
 */
export function BeforeAfterSlider({
  beforeLabel,
  afterLabel,
  caption,
}: {
  beforeLabel: string;
  afterLabel: string;
  caption?: string;
}) {
  const [value, setValue] = useState(50);
  const id = useId();

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[16/10] w-full select-none overflow-hidden">
        <div className="absolute inset-0">
          <PhotoPlaceholder
            tone="light"
            label={`after — ${afterLabel}`}
            className="h-full w-full"
          />
        </div>
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        >
          <PhotoPlaceholder
            tone="dark"
            label={`before — ${beforeLabel}`}
            className="h-full w-full"
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-y-0 w-px bg-ivory"
          style={{ left: `${value}%` }}
        >
          <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-ivory bg-charcoal text-xs text-ivory">
            ↔
          </span>
        </div>

        <span className="eyebrow absolute left-4 top-4 text-ivory">Before</span>
        <span className="eyebrow absolute right-4 top-4 text-ivory">After</span>
      </div>

      <label htmlFor={id} className="sr-only">
        Drag to compare before and after
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        className="h-1 w-full cursor-ew-resize accent-bronze"
      />

      {caption && <p className="text-sm text-charcoal-soft">{caption}</p>}
    </div>
  );
}
