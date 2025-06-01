import { EducationsTable } from "@/app/(app)//dashboard/educations/_components/educations-table";
import { getSession } from "@/lib/auth";
import { getUserEducations } from "@/lib/queries";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "MyPortfolio - Dashboard - Educations",
  description: "Manage your educations",
};

export default async function DashboardWorkExperiencesPage() {
  const session = await getSession();
  if (!session) redirect("/");

  const educations = await getUserEducations({ userId: session.user.id });

  return (
    <>
      <h1 className="text-3xl mb-4">Educations</h1>
      <EducationsTable educations={educations} />
    </>
  );
}
