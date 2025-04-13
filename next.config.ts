import type { NextConfig } from "next";
// import { locales } from "./lingui.config";
// TODO: redirect

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // i18n: {
  //   locales,
  //   defaultLocale: "en",
  //   localeDetection: false,
  // },
  turbopack: {
    rules: {
      "*.po": {
        loaders: ["@lingui/loader"],
        as: "*.js",
      },
    },
  },
  experimental: {
    swcPlugins: [["@lingui/swc-plugin", {}]],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.po$/,
      use: {
        loader: "@lingui/loader",
      },
    });

    return config;
  },
};

export default nextConfig;
