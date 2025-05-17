import { WorkExperiencesTable } from "@/app/(app)//dashboard/work-experiences/_components/work-experiences-table";
import { getUserWorkExperiences } from "@/lib/queries";
import { auth } from "@clerk/nextjs/server";

export default async function DashboardWorkExperiencesPage() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const workExperiences = await getUserWorkExperiences({ userId });

  return (
    <main className="container mx-auto mt-4">
      <h1 className="font-medium text-2xl mb-4">Work experiences</h1>
      <WorkExperiencesTable workExperiences={workExperiences} />
    </main>
  );
}
