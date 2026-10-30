import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dynamic Ollama chat — avoid Cache Components constraints on route handlers
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
