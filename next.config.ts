import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    disableStaticImages: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.po": {
        loaders: ["@lingui/loader"],
        as: "*.js",
      },
      "*.svg": {
        loaders: ["@svgr/webpack"],
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
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
