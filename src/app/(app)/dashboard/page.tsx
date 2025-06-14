import { CopySlugToClipboard } from "@/features/dashboard/components/copy-slug-to-clipboard";
import { GenerateCVButton } from "@/features/dashboard/components/generate-cv-button";
import { getProfileSlug } from "@/features/dashboard/lib/queries";
import { getUserData } from "@/features/portfolio/lib/queries";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { Button } from "@/shared/components/ui/button";
import {
  IconBook,
  IconBox,
  IconBriefcase2,
  IconExternalLink,
  IconInfoCircle,
  IconUser,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MyPortfolio - Dashboard",
  description: "Manage your portfolio and CV from here",
};

const DASHBOARD_LINKS = [
  { href: "/dashboard/profile", label: "Profile", icon: <IconUser /> },
  {
    href: "/dashboard/work-experiences",
    label: "Work Experiences",
    icon: <IconBriefcase2 />,
  },
  { href: "/dashboard/educations", label: "Educations", icon: <IconBook /> },
  { href: "/dashboard/projects", label: "Projects", icon: <IconBox /> },
];

export default async function DashboardPage() {
  const slug = await getProfileSlug();
  const data = slug ? await getUserData({ slug }) : undefined;

  return (
    <>
      <h1 className="text-3xl mb-4">Dashboard</h1>
      {slug ? (
        <div className="flex flex-col md:flex-row gap-4">
          <CopySlugToClipboard slug={slug} />
          <Button variant="outline" asChild>
            <Link
              href={`/portfolio/${slug}`}
              className="flex items-center gap-2"
              target="_blank"
            >
              Visit your portfolio
              <IconExternalLink size={22} />
            </Link>
          </Button>
          <GenerateCVButton data={data} />
        </div>
      ) : (
        <Alert variant="destructive">
          <IconInfoCircle className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            <p>
              You need to complete your profile (at least slug) to get the
              public.{" "}
              <Link
                href="/dashboard/profile"
                className="font-medium underline underline-offset-4"
              >
                Fill the profile now
              </Link>
              .
            </p>
          </AlertDescription>
        </Alert>
      )}
      <p className="mt-4 text-base">
        You can manage your portfolio from here. Click on the links below to
        navigate to different sections of your portfolio.
      </p>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {DASHBOARD_LINKS.map((link) => (
          <Button key={link.href} asChild variant="link" className="text-base">
            <Link
              href={link.href}
              className="border h-32 flex items-center justify-center rounded-lg gap-4"
            >
              {link.icon}
              {link.label}
            </Link>
          </Button>
        ))}
      </section>
    </>
  );
}
