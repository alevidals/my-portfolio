import type { InsertUserProfile } from "@/app/(app)/dashboard/profile/_lib/types";
import { EvilRabbitPortfolio } from "@/app/portfolio/[username]/_components/evil-rabbit-portfolio";
import { Studio535Portfolio } from "@/app/portfolio/[username]/_components/studio-535-portfolio";
import { getUserData } from "@/app/portfolio/[username]/_lib/queries";
import type { PortfolioProps } from "@/app/portfolio/[username]/_lib/types";
import type { Metadata } from "next";
import type { ReactNode } from "react";

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;

  return {
    title: `MyPortfolio - ${username}`,
    description: "MyPortfolio - View your portfolio",
  };
}

type PreferredPortfolio = NonNullable<InsertUserProfile["preferredPortfolio"]>;

const PORTFOLIOS: Record<
  PreferredPortfolio,
  ({ data }: PortfolioProps) => ReactNode
> = {
  "evil-rabbit": ({ data }) => <EvilRabbitPortfolio data={data} />,
  "studio-535": ({ data }) => <Studio535Portfolio data={data} />,
};

export default async function ViewPage({ params }: Props) {
  const { username } = await params;

  const data = await getUserData({
    slug: username,
  });

  const preferredPortfolio: PreferredPortfolio =
    data.profile?.preferredPortfolio ?? "studio-535";

  const Portfolio = PORTFOLIOS[preferredPortfolio];

  if (!Portfolio) {
    return <div>Portfolio not found</div>;
  }

  return <Portfolio data={data} />;
}
