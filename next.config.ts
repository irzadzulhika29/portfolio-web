import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.16.2.201"],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
