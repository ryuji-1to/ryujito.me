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
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
