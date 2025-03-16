import { Educations } from "@/app/dashboard/_components/educations";
import { Header } from "@/app/dashboard/_components/header";
import { getEducations } from "@/lib/db/queries/educations";
import { getUser } from "@/lib/db/queries/users";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const [educations] = await Promise.all([
    getEducations({
      userId: user.id,
    }),
  ]);

  return (
    <div className="py-6">
      <Header />
      <main className="container mx-auto mt-6">
        <Educations educations={educations} />
      </main>
    </div>
  );
}
