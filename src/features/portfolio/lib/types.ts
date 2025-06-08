import type { getUserData } from "@/features/portfolio/lib/queries";

export type PortfolioProps = {
  data: Awaited<ReturnType<typeof getUserData>>;
};
