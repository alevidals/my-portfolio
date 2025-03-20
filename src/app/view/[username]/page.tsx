import { getPortfolioInfo } from "@/lib/db/queries/users";
import { formatDate } from "@/lib/utils";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ username: string }>;
};

export default async function ViewPage({ params }: Props) {
  const { username } = await params;
  const portfolioInformation = await getPortfolioInfo({ username });

  if (!portfolioInformation) {
    redirect("/");
  }

  return (
    <main className="mt-6 grid gap-10">
      <p className="text-base">{portfolioInformation?.biography}</p>
      <section>
        <header>
          <h2 className="text-xl font-bold mb-8 underline underline-offset-8">
            Experiences
          </h2>
        </header>
        <ul className="flex flex-col gap-6 border-l border-muted-foreground pl-5 py-1">
          {portfolioInformation?.workExperiences.map((experience) => (
            <li key={experience.id} className="relative">
              <div className="absolute left-[-26px] top-[3px] size-3 rounded-full border border-muted-foreground bg-muted" />
              <div className="text-sm text-muted-foreground mb-2">
                <time dateTime={experience.startDate}>
                  {formatDate({
                    date: experience.startDate,
                  })}
                </time>
                <span> - </span>
                <time dateTime={experience.endDate || new Date().toISOString()}>
                  {experience.endDate
                    ? formatDate({
                        date: experience.endDate,
                      })
                    : "Present"}
                </time>
              </div>
              <h3 className="text-lg font-bold mb-1">{experience.position}</h3>
              <p className="text-muted-foreground mb-2">
                {experience.companyName}
              </p>
              <p className="text-sm">
                As a full-stack developer at Innovatech Solutions, I design and
                implement end-to-end software systems that drive business growth
                and enhance user experiences. My responsibilities include
                building scalable backend APIs using Node.js and Python,
                developing responsive front-end interfaces with React, and
                managing cloud-based infrastructure on AWS. I have successfully
                led the migration of legacy systems to microservices
                architecture, improving system performance by 40%. Additionally,
                I collaborate with cross-functional teams to integrate CI/CD
                pipelines, ensuring seamless deployment and continuous delivery.
                Passionate about clean code and innovation, I thrive on solving
                complex problems and delivering high-quality solutions that
                align with business goals.
              </p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <header>
          <h2 className="text-xl font-bold mb-8 underline underline-offset-8">
            Educations
          </h2>
        </header>
        <ul className="flex flex-col gap-6 border-l border-muted-foreground pl-5 py-1">
          {portfolioInformation?.educations.map((education) => (
            <li key={education.id} className="relative">
              <div className="absolute left-[-26px] top-[3px] size-3 rounded-full border border-muted-foreground bg-muted" />
              <div className="text-sm text-muted-foreground mb-2">
                <time dateTime={education.startDate}>
                  {formatDate({
                    date: education.startDate,
                  })}
                </time>
                <span> - </span>
                <time dateTime={education.endDate || new Date().toISOString()}>
                  {education.endDate
                    ? formatDate({
                        date: education.endDate,
                      })
                    : "Present"}
                </time>
              </div>
              <h3 className="text-lg font-bold mb-1">{education.degree}</h3>
              <p className="text-muted-foreground mb-2">
                {education.institution}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
