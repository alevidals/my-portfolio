import { ProjectsTable } from "@/app/dashboard/projects/_components/projects-table";
import { getUserProjects } from "@/app/dashboard/projects/_lib/queries";

export default async function DashboardProjectsPage() {
  const projects = await getUserProjects();

  return (
    <main className="container mx-auto mt-4">
      <h1 className="font-medium text-2xl mb-4">Projects</h1>
      <ProjectsTable projects={projects} />
    </main>
  );
}
