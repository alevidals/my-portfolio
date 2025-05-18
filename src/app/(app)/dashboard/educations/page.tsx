import { EducationsTable } from "@/app/(app)//dashboard/educations/_components/educations-table";
import { getUserEducations } from "@/lib/queries";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyPortfolio - Dashboard - Educations",
  description: "Manage your educations",
};

export default async function DashboardWorkExperiencesPage() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const educations = await getUserEducations({ userId });

  return (
    <>
      <h1 className="text-3xl mb-4">Educations</h1>
      <EducationsTable educations={educations} />
    </>
  );
}
