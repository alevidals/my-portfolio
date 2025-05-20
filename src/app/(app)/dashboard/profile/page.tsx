import { ProfileInformationForm } from "@/app/(app)//dashboard/profile/_components/profile-information-form";
import { getUserProfile } from "@/app/(app)//dashboard/profile/_lib/queries";
import { getUserLanguages } from "@/lib/queries";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyPortfolio - Dashboard - Profile",
  description: "Manage your profile information",
};

export default async function DashboardProfilePage() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const [userProfile, userLanguages] = await Promise.all([
    getUserProfile(),
    getUserLanguages({ userId }),
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
