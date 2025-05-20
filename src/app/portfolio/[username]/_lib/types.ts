import type { getUserData } from "@/app/portfolio/[username]/_lib/queries";

export type PortfolioProps = {
  data: Awaited<ReturnType<typeof getUserData>>;
};
