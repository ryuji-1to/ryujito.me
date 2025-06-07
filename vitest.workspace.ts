import { defineWorkspace } from "vitest/config";
import path from "node:path";
import react from "@vitejs/plugin-react";

export default defineWorkspace([
  {
    plugins: [react()],
    test: {
      globals: true,
      name: "browser",
      include: ["src/**/*.browser.test.tsx"],
      browser: {
        enabled: true,
        name: "chromium",
        provider: "playwright",
        // https://playwright.dev
        instances: [{ browser: "chromium" }],
        providerOptions: {},
      },
    },
  },
  {
    plugins: [react()],
    test: {
      globals: true,
      name: "happy-dom",
      include: ["src/**/*.test.tsx"],
      exclude: ["src/**/*.browser.test.tsx"],
      environment: "happy-dom",
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  },
]);
