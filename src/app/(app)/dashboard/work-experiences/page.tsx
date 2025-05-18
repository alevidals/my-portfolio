import { WorkExperiencesTable } from "@/app/(app)//dashboard/work-experiences/_components/work-experiences-table";
import { getUserWorkExperiences } from "@/lib/queries";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyPortfolio - Dashboard - Work Experiences",
  description: "Manage your work experiences",
};

export default async function DashboardWorkExperiencesPage() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const workExperiences = await getUserWorkExperiences({ userId });

  return (
    <>
      <h1 className="text-3xl mb-4">Work experiences</h1>
      <WorkExperiencesTable workExperiences={workExperiences} />
    </>
  );
}
