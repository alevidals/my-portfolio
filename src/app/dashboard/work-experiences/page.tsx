import { WorkExperiencesTable } from "@/app/dashboard/work-experiences/_components/work-experiences-table";
import { getUserWorkExperiences } from "@/app/dashboard/work-experiences/_lib/queries";

export default async function DashboardWorkExperiencesPage() {
  const workExperiences = await getUserWorkExperiences();

  return (
    <main className="container mx-auto mt-4">
      <h1 className="font-medium text-2xl mb-4">Work experiences</h1>
      <WorkExperiencesTable workExperiences={workExperiences} />
    </main>
  );
}
