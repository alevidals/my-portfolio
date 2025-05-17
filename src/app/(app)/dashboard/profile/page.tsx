import { ProfileInformationForm } from "@/app/(app)//dashboard/profile/_components/profile-information-form";
import { getUserProfile } from "@/app/(app)//dashboard/profile/_lib/queries";

export default async function DashboardProfilePage() {
  const userProfile = await getUserProfile();

  return (
    <main className="container mx-auto mt-4">
      <h1 className="font-medium text-2xl mb-4">Profile information</h1>
      <ProfileInformationForm userProfile={userProfile} />
    </main>
  );
}
