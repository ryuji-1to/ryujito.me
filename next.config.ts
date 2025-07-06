import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    disableStaticImages: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
