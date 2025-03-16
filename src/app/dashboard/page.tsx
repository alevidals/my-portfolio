import { Educations } from "@/app/dashboard/_components/educations";
import { Header } from "@/app/dashboard/_components/header";
import { getEducations } from "@/lib/db/queries/educations";

export default async function DashboardPage() {
  const [educations] = await Promise.all([getEducations()]);

  return (
    <div className="py-6">
      <Header />
      <main className="container mx-auto mt-6">
        <Educations educations={educations} />
      </main>
    </div>
  );
}
