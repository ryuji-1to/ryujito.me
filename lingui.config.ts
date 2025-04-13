import { defineConfig } from "@lingui/conf";

export default defineConfig({
  locales: ["ja", "en"],
  sourceLocale: "ja",
  fallbackLocales: {
    default: "ja",
  },
  catalogs: [
    {
      path: "src/locales/{locale}",
      include: ["src/"],
    },
  ],
});
