import { EducationsTable } from "@/features/dashboard/educations/components/educations-table";
import { getSession } from "@/shared/lib/auth";
import { getUserEducations } from "@/shared/lib/queries";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "MyPortfolio - Dashboard - Educations",
  description: "Manage your educations",
};

export default async function DashboardEducationsPage() {
  const session = await getSession();
  if (!session) redirect("/");

  const t = await getTranslations("educations");

  const educations = await getUserEducations({ userId: session.user.id });

  return (
    <>
      <h1 className="text-3xl mb-4">{t("title")}</h1>
      <EducationsTable educations={educations} />
    </>
  );
}
