import { satteri } from "@astrojs/markdown-satteri";
import node from "@astrojs/node";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  adapter: process.env.VERCEL === "1" ? vercel() : node({ mode: "standalone" }),
  integrations: [react()],
  markdown: {
    processor: satteri({ features: { smartPunctuation: false } }),
    shikiConfig: {
      themes: { light: "github-dark", dark: "dracula" },
    },
  },
  vite: { plugins: [tailwindcss()] },
});
