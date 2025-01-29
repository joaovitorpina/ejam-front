import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    HERO_SERVICE_BASE_URL: process.env.HERO_SERVICE_BASE_URL || "http://localhost:4000",
  },

};

export default nextConfig;
