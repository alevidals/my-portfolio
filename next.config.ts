import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://img.clerk.com/**")],
  },
  serverExternalPackages: ["@react-pdf/renderer"],
};

export default nextConfig;
