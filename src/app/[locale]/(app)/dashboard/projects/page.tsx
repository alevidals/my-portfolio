import { ProjectsTable } from "@/features/dashboard/projects/components/projects-table";
import { getSession } from "@/shared/lib/auth";
import { getUserProjects } from "@/shared/lib/queries";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "MyPortfolio - Dashboard - Projects",
  description: "Manage your projects",
};

export default async function DashboardProjectsPage() {
  const session = await getSession();

  if (!session) redirect("/");

  const t = await getTranslations("projects");

  const projects = await getUserProjects({ userId: session.user.id });

  return (
    <>
      <h1 className="text-3xl mb-4">{t("title")}</h1>
      <ProjectsTable projects={projects} />
    </>
  );
}
