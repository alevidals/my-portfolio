import { paraglideWebpackPlugin } from "@inlang/paraglide-js";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://avatars.githubusercontent.com/u/**?v=4")],
  },
  serverExternalPackages: ["@react-pdf/renderer"],
  webpack: (config) => {
    config.plugins.push(
      paraglideWebpackPlugin({
        outdir: "./src/paraglide",
        project: "./project.inlang",
        strategy: ["url", "cookie", "baseLocale"],
      }),
    );

    return config;
  },
};

export default nextConfig;
