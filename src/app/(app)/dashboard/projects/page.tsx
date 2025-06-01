import { ProjectsTable } from "@/app/(app)//dashboard/projects/_components/projects-table";
import { getSession } from "@/lib/auth";
import { getUserProjects } from "@/lib/queries";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "MyPortfolio - Dashboard - Projects",
  description: "Manage your projects",
};

export default async function DashboardProjectsPage() {
  const session = await getSession();

  if (!session) redirect("/");

  const projects = await getUserProjects({ userId: session.user.id });

  return (
    <>
      <h1 className="text-3xl mb-4">Projects</h1>
      <ProjectsTable projects={projects} />
    </>
  );
}
