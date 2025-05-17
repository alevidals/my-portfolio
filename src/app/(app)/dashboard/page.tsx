import { CopySlugToClipboard } from "@/app/(app)/dashboard/_components/copy-slug-to-clipboard";
import { getProfileSlug } from "@/app/(app)/dashboard/_lib/queries";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { IconExternalLink, IconInfoCircle } from "@tabler/icons-react";
import Link from "next/link";

export default async function DashboardPage() {
  const slug = await getProfileSlug();

  return (
    <main className="container mx-auto mt-4">
      <h1 className="text-3xl mb-4">Dashboard</h1>
      {slug ? (
        <div className="flex items-center gap-4">
          <CopySlugToClipboard slug={slug} />
          <Button variant="outline" asChild>
            <Link
              href={`/${slug}`}
              className="flex items-center gap-2"
              target="_blank"
            >
              Visit your portfolio
              <IconExternalLink size={22} />
            </Link>
          </Button>
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
      <ul className="mt-4">
        <li>
          <Button variant="link" className="p-0 text-base">
            <Link href="/dashboard/profile">Go to Profile</Link>
          </Button>
        </li>
        <li>
          <Button variant="link" className="p-0 text-base">
            <Link href="/dashboard/work-experiences">
              Go to Work Experiences
            </Link>
          </Button>
        </li>
        <li>
          <Button variant="link" className="p-0 text-base">
            <Link href="/dashboard/educations">Go to Educations</Link>
          </Button>
        </li>
        <li>
          <Button variant="link" className="p-0 text-base">
            <Link href="/dashboard/projects">Go to Projects</Link>
          </Button>
        </li>
      </ul>
    </main>
  );
}
