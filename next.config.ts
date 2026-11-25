import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Pexels stock photos (see lib/pexels.ts)
    remotePatterns: [{ protocol: "https", hostname: "images.pexels.com", pathname: "/photos/**" }],
  },
  experimental: {
    // Cap build workers (default is CPU count - 1) so builds don't run out of
    // memory on low-RAM machines. Raise or remove on a bigger machine/CI.
    cpus: 2,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
