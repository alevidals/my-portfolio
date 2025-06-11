import { WorkExperiencesTable } from "@/features/dashboard/work-experiences/components/work-experiences-table";
import { getSession } from "@/shared/lib/auth";
import { getUserWorkExperiences } from "@/shared/lib/queries";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "MyPortfolio - Dashboard - Work Experiences",
  description: "Manage your work experiences",
};

export default async function DashboardWorkExperiencesPage() {
  const session = await getSession();

  if (!session) redirect("/");

  const workExperiences = await getUserWorkExperiences({
    userId: session.user.id,
  });

  return (
    <>
      <h1 className="text-3xl mb-4">Work experiences</h1>
      <WorkExperiencesTable workExperiences={workExperiences} />
    </>
  );
}
