import { env } from "@/lib/env";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const url = env.NEXT_PUBLIC_SITE_URL;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/dashboard/",
    },
    sitemap: `${url}/sitemap.xml`,
  };
}
