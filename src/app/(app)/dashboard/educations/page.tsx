import { EducationsTable } from "@/app/(app)//dashboard/educations/_components/educations-table";
import { getUserEducations } from "@/lib/queries";
import { auth } from "@clerk/nextjs/server";

export default async function DashboardWorkExperiencesPage() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const educations = await getUserEducations({ userId });

  return (
    <main className="container mx-auto mt-4">
      <h1 className="font-medium text-2xl mb-4">Educations</h1>
      <EducationsTable educations={educations} />
    </main>
  );
}
