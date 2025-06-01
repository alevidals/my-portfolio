import { ProfileInformationForm } from "@/app/(app)/dashboard/profile/_components/profile-information-form";
import { getUserProfile } from "@/app/(app)/dashboard/profile/_lib/queries";
import { getSession } from "@/lib/auth";
import { getUserLanguages } from "@/lib/queries";
import type { Metadata } from "next";
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

  const [userProfile, userLanguages] = await Promise.all([
    getUserProfile(),
    getUserLanguages({ userId: session.user.id }),
  ]);

  return (
    <>
      <h1 className="text-3xl mb-4">Profile information</h1>
      <ProfileInformationForm
        userProfile={userProfile}
        userLanguages={userLanguages}
      />
    </>
  );
}
