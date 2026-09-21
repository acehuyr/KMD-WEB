import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Next.js 16 defaults this to `[75]`, and the `quality` prop is
     * rejected unless the value is on this list — so without it every
     * photograph on the site was re-encoded down to quality 75 at request
     * time, no matter how carefully the source file was prepared.
     *
     * KMD's photography is the product and the source files are only
     * ~1080–1280px wide (that is genuinely all that exists — see
     * MIGRATION-NOTES.md), so there are no spare pixels to trade away.
     * 90 is used by components/ui/Photo.tsx; 75 stays allowed for any
     * non-critical image added later.
     */
    qualities: [75, 90],
  },
};

export default nextConfig;
