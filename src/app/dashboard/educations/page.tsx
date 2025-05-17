import { EducationsTable } from "@/app/dashboard/educations/_components/educations-table";
import { getUserEducations } from "@/app/dashboard/educations/_lib/queries";

export default async function DashboardWorkExperiencesPage() {
  const educations = await getUserEducations();

  return (
    <main className="container mx-auto mt-4">
      <h1 className="font-medium text-2xl mb-4">Educations</h1>
      <EducationsTable educations={educations} />
    </main>
  );
}
