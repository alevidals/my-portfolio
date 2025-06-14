import { WorkExperiencesTable } from "@/features/dashboard/work-experiences/components/work-experiences-table";
import { getSession } from "@/shared/lib/auth";
import { getUserWorkExperiences } from "@/shared/lib/queries";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "MyPortfolio - Dashboard - Work Experiences",
  description: "Manage your work experiences",
};

export default async function DashboardWorkExperiencesPage() {
  const session = await getSession();

  if (!session) redirect("/");

  const t = await getTranslations("workExperiences");

  const workExperiences = await getUserWorkExperiences({
    userId: session.user.id,
  });

  return (
    <>
      <h1 className="text-3xl mb-4">{t("title")}</h1>
      <WorkExperiencesTable workExperiences={workExperiences} />
    </>
  );
}
