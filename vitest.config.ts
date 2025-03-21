import path from "node:path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
});
