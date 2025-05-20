import type { PortfolioProps } from "@/app/portfolio/[username]/_lib/types";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { IconExternalLink } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export function EvilRabbitPortfolio({ data }: PortfolioProps) {
  const fullName =
    data.profile?.fullName ||
    `${data.userData.firstName} ${data.userData.lastName}`;

  return (
    <div>
      <main className="max-w-[700px] mx-auto px-4">
        <Image
          src={data.userData.imageUrl}
          alt="user avatar"
          width={100}
          height={100}
          className="my-24"
        />
        <p>{fullName}</p>
        {data.profile?.biography && (
          <p className="text-neutral-500 mt-4">{data.profile.biography}</p>
        )}

        {data.workExperiences.length > 0 && (
          <section className="mt-8">
            <h2 className="text-lg font-bold uppercase">Work Experiences</h2>
            {data.workExperiences.map((workExperience) => (
              <div
                key={workExperience.id}
                className="flex justify-between border-b border-neutral-300 py-4"
              >
                <div>
                  <h3 className="font-normal">{workExperience.companyName}</h3>
                  <p className="text-neutral-500">{workExperience.position}</p>
                </div>
                <div>
                  <p className="text-neutral-500">
                    {formatDate({
                      monthFormat: "2-digit",
                      month: workExperience.startDate.month,
                      year: workExperience.startDate.year,
                    })}{" "}
                    -{" "}
                    {workExperience.endDate
                      ? formatDate({
                          monthFormat: "2-digit",
                          month: workExperience.endDate.month,
                          year: workExperience.endDate.year,
                        })
                      : "Present"}
                  </p>
                </div>
              </div>
            ))}
          </section>
        )}

        {data.educations.length > 0 && (
          <section className="mt-16">
            <h2 className="text-lg font-bold uppercase">Educations</h2>
            {data.educations.map((education) => (
              <div
                key={education.id}
                className="flex justify-between border-b border-neutral-300 py-4"
              >
                <div>
                  <h3 className="font-normal">{education.institution}</h3>
                  <p className="text-neutral-500">{education.degree}</p>
                </div>
                <div>
                  <p className="text-neutral-500">
                    {formatDate({
                      monthFormat: "2-digit",
                      month: education.startDate.month,
                      year: education.startDate.year,
                    })}{" "}
                    -{" "}
                    {education.endDate
                      ? formatDate({
                          monthFormat: "2-digit",
                          month: education.endDate.month,
                          year: education.endDate.year,
                        })
                      : "Present"}
                  </p>
                </div>
              </div>
            ))}
          </section>
        )}

        {data.projects.length > 0 && (
          <section className="mt-16">
            <h2 className="text-lg font-bold uppercase">Projects</h2>
            {data.projects.map((project) => (
              <div
                key={project.id}
                className="border-b border-neutral-300 py-4 flex flex-col gap-2"
              >
                <div>
                  <h3 className="font-normal">{project.name}</h3>
                  <p className="text-neutral-500">{project.description}</p>
                  <div className="flex flex-wrap my-2 gap-1">
                    {project.technologies.map((technology) => (
                      <Badge
                        variant="outline"
                        key={`${project.id}-${technology}`}
                      >
                        {technology}
                      </Badge>
                    ))}
                  </div>
                </div>
                {project.repositoryUrl && (
                  <a
                    href={project.repositoryUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-sm underline underline-offset-4 flex items-center gap-2 mt-1"
                  >
                    {project.repositoryUrl}
                    <IconExternalLink size={16} />
                  </a>
                )}
                {project.deploymentUrl && (
                  <a
                    href={project.deploymentUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-sm underline underline-offset-4 flex items-center gap-2 mt-1"
                  >
                    {project.deploymentUrl}
                    <IconExternalLink size={16} />
                  </a>
                )}
              </div>
            ))}
          </section>
        )}

        {data.languages.length > 0 && (
          <section className="mt-16">
            <h2 className="text-lg font-bold uppercase">Languages</h2>
            {data.languages.map((language) => (
              <div
                key={language.id}
                className="flex justify-between border-b border-neutral-300 py-4"
              >
                <div>
                  <h3 className="font-normal">{language.name}</h3>
                  <p className="text-neutral-500">{language.level}</p>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>

      <footer className="mt-30 h-32 border-t border-neutral-300 flex items-center justify-center text-neutral-500">
        <p className="max-w-[700px] mx-auto">
          This portfolio was created with using{" "}
          <Link href="/" className="underline underline-offset-4">
            MyPortfolio
          </Link>{" "}
          and inspired by{" "}
          <a
            href="https://www.evilrabbit.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            Evil Rabbit
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
