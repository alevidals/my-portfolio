import { env } from "@/lib/env";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = env.NEXT_PUBLIC_SITE_URL;

  return [
    {
      url,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];
}
