import { ProjectsTable } from "@/app/(app)//dashboard/projects/_components/projects-table";
import { getUserProjects } from "@/lib/queries";
import { auth } from "@clerk/nextjs/server";

export default async function DashboardProjectsPage() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const projects = await getUserProjects({ userId });

  return (
    <main className="container mx-auto mt-4">
      <h1 className="font-medium text-2xl mb-4">Projects</h1>
      <ProjectsTable projects={projects} />
    </main>
  );
}
