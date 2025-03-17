import { Educations } from "@/app/dashboard/_components/educations";
import { Experiences } from "@/app/dashboard/_components/experiences";
import { Header } from "@/app/dashboard/_components/header";
import { getEducations } from "@/lib/db/queries/educations";
import { getExperiences } from "@/lib/db/queries/experiences";
import { getUser } from "@/lib/db/queries/users";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const [educations, experiences] = await Promise.all([
    getEducations({
      userId: user.id,
    }),
    getExperiences({
      userId: user.id,
    }),
  ]);

  return (
    <div className="py-6">
      <Header />
      <main className="container mx-auto mt-6 grid gap-10">
        <Educations educations={educations} />
        <Experiences experiences={experiences} />
      </main>
    </div>
  );
}
