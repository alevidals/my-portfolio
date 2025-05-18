import { env } from "@/lib/env";

export const siteConfig = {
  title: "MyPortfolio",
  description:
    "The place where you can create your portfolio and CV at the same time",
  links: {
    twitter: "https://twitter.com/alevidals",
    github: "https://github.com/alevidals",
  },
  ogImage: `${env.NEXT_PUBLIC_SITE_URL}/og.png`,
};
