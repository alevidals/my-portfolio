import { env } from "@/shared/lib/env";

export const siteConfig = {
  title: "MyPortfolio",
  description:
    "Create your portfolio and resume in one place. Share your profile with a unique link and stand out in selection processes.",
  links: {
    twitter: "https://twitter.com/alevidals",
    github: "https://github.com/alevidals",
  },
  ogImage: `${env.NEXT_PUBLIC_SITE_URL}/og.png`,
};
