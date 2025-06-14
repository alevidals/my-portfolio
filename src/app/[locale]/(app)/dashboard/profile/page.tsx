import { ProfileInformationForm } from "@/features/dashboard/profile/components/profile-information-form";
import { getUserProfile } from "@/features/dashboard/profile/lib/queries";
import { getSession } from "@/shared/lib/auth";
import { getUserLanguages } from "@/shared/lib/queries";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "MyPortfolio - Dashboard - Profile",
  description: "Manage your profile information",
};

export default async function DashboardProfilePage() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const t = await getTranslations("profile");

  const [userProfile, userLanguages] = await Promise.all([
    getUserProfile(),
    getUserLanguages({ userId: session.user.id }),
  ]);

  return (
    <>
      <h1 className="text-3xl mb-4">{t("title")}</h1>
      <ProfileInformationForm
        userProfile={userProfile}
        userLanguages={userLanguages}
      />
    </>
  );
}
