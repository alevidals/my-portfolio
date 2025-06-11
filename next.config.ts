import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://avatars.githubusercontent.com/u/**?v=4")],
  },
  serverExternalPackages: ["@react-pdf/renderer"],
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
