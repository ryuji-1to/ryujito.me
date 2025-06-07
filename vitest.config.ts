import { defineConfig } from "vitest/config";
import path from "node:path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  test: {
    projects: [
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
            instances: [{ browser: "chromium" }],
          },
          alias: {
            "@": path.resolve(__dirname, "./src"),
          },
        },
      },
      {
        test: {
          globals: true,
          include: ["src/**/*.test.ts"],
          alias: {
            "@": path.resolve(__dirname, "./src"),
          },
        },
      },
    ],
  },
});
