import { Educations } from "@/app/dashboard/_components/educations";
import { Experiences } from "@/app/dashboard/_components/experiences";
import { ProfileInformation } from "@/app/dashboard/_components/profile-information";
import { Projects } from "@/app/dashboard/_components/projects";
import { getEducations } from "@/lib/db/queries/educations";
import { getExperiences } from "@/lib/db/queries/experiences";
import { getProjects } from "@/lib/db/queries/projects";
import { getUser } from "@/lib/db/queries/users";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const [projects, educations, experiences] = await Promise.all([
    getProjects({
      userId: user.id,
    }),
    getEducations({
      userId: user.id,
    }),
    getExperiences({
      userId: user.id,
    }),
  ]);

  return (
    <main className="container mx-auto mt-6 grid gap-10">
      <ProfileInformation />
      <Projects projects={projects} />
      <Educations educations={educations} />
      <Experiences experiences={experiences} />
    </main>
  );
}
