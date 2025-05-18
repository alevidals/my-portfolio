import { CopySlugToClipboard } from "@/app/(app)/dashboard/_components/copy-slug-to-clipboard";
import { GenerateCVButton } from "@/app/(app)/dashboard/_components/generate-cv-button";
import { getProfileSlug } from "@/app/(app)/dashboard/_lib/queries";
import { getUserData } from "@/app/view/[username]/_lib/queries";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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
        <div className="flex items-center gap-4">
          <CopySlugToClipboard slug={slug} />
          <Button variant="outline" asChild>
            <Link
              href={`/view/${slug}`}
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
          <Button key={link.href} asChild variant="link">
            <Link
              href={link.href}
              className="border h-32 flex items-center justify-center rounded-lg gap-4 text-lg"
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
