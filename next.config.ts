import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Pin Turbopack to this app so a parent folder lockfile (e.g. ~/Downloads) is not treated as the monorepo root.
  turbopack: {
    root: projectRoot,
  },
  async redirects() {
    return [
      {
        source: "/character-intro",
        destination: "/explore",
        permanent: true,
      },
    ];
  },
  // Avoid stale CSS/JS chunks in the browser while iterating locally (globals.css edits not “sticking”).
  ...(process.env.NODE_ENV === "development"
    ? {
        async headers() {
          return [
            {
              source: "/_next/static/:path*",
              headers: [
                {
                  key: "Cache-Control",
                  value: "no-store, max-age=0, must-revalidate",
                },
              ],
            },
          ];
        },
      }
    : {}),
};

export default nextConfig;
