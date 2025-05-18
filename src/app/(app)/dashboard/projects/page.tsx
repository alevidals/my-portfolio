import { ProjectsTable } from "@/app/(app)//dashboard/projects/_components/projects-table";
import { getUserProjects } from "@/lib/queries";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyPortfolio - Dashboard - Projects",
  description: "Manage your projects",
};

export default async function DashboardProjectsPage() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const projects = await getUserProjects({ userId });

  return (
    <>
      <h1 className="text-3xl mb-4">Projects</h1>
      <ProjectsTable projects={projects} />
    </>
  );
}
