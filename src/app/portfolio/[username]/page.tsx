import type { InsertUserProfile } from "@/features/dashboard/profile/lib/types";
import { EvilRabbitPortfolio } from "@/features/portfolio/components/evil-rabbit-portfolio";
import { Studio535Portfolio } from "@/features/portfolio/components/studio-535-portfolio";
import { getUserData } from "@/features/portfolio/lib/queries";
import type { PortfolioProps } from "@/features/portfolio/lib/types";
import type { Metadata } from "next";
import type { ReactNode } from "react";

type Props = {
  params: Promise<{
    username: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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

export default async function ViewPage({ params, searchParams }: Props) {
  const { username } = await params;

  const data = await getUserData({
    slug: username,
  });

  const previewTheme = (await searchParams).preview as
    | PreferredPortfolio
    | undefined;

  const preferredPortfolio: PreferredPortfolio =
    previewTheme ?? data.profile?.preferredPortfolio ?? "studio-535";

  const Portfolio = PORTFOLIOS[preferredPortfolio];

  if (!Portfolio) {
    return <div>Portfolio not found</div>;
  }

  return <Portfolio data={data} />;
}
