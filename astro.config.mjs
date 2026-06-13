import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Static output: the GitHub repo cards are fetched at build time (see
// src/lib/github.ts), so the deployed site ships plain static HTML/JSON with no
// client-side API calls. Provider-agnostic dist/ deploy.
export default defineConfig({
  site: "https://ourovoros.io",
  vite: {
    plugins: [tailwindcss()],
  },
});
