import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // basePath and assetPrefix removed to fix root URL 404 error
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
