import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the Turbopack project root to this folder — without this, Next.js
  // walks up looking for a lockfile and can pick up an unrelated one from a
  // parent directory (e.g. C:\Users\kavya), which triggers a build warning.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
