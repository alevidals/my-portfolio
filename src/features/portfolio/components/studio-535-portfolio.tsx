import { SocialLinks } from "@/features/portfolio/components/social-links";
import type { PortfolioProps } from "@/features/portfolio/lib/types";
import { Badge } from "@/shared/components/ui/badge";
import { formatDate } from "@/shared/lib/utils";
import { IconExternalLink } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export function Studio535Portfolio({ data }: PortfolioProps) {
  const {
    userData,
    profile,
    workExperiences,
    educations,
    projects,
    languages,
  } = data;

  return (
    <div className="w-5/6 md:w-full max-w-xl mx-auto py-32">
      <header className="mb-20">
        {userData.imageUrl && (
          <Image
            src={userData.imageUrl}
            alt="Profile"
            width={100}
            height={100}
            className="rounded-lg mx-auto"
          />
        )}
        <nav className="mx-auto flex flex-col items-center mt-4 gap-2">
          <h1 className="font-bold text-xl">{userData.name}</h1>
          <SocialLinks
            email={userData.email}
            githubUrl={profile?.githubUrl}
            linkedInUrl={profile?.linkedInUrl}
            xUrl={profile?.xUrl}
          />
        </nav>
      </header>

      <main>
        {profile?.biography && (
          <section>
            <p>{profile?.biography}</p>
          </section>
        )}

        {workExperiences.length > 0 && (
          <section className="mt-14">
            <h2 className="text-lg font-bold uppercase">Work Experiences</h2>
            <ul className="list-disc pl-6 mt-2 flex flex-col gap-6">
              {workExperiences.map((experience) => (
                <li key={experience.id} className="">
                  <p className="text-base">
                    {experience.companyName} - {experience.position}
                  </p>
                  <p className="text-sm">
                    {formatDate({
                      monthFormat: "2-digit",
                      month: experience.startDate.month,
                      year: experience.startDate.year,
                    })}{" "}
                    -{" "}
                    {experience.endDate
                      ? formatDate({
                          monthFormat: "2-digit",
                          month: experience.endDate.month,
                          year: experience.endDate.year,
                        })
                      : "Present"}
                  </p>
                  {experience.description && (
                    <p className="text-sm mt-1">{experience.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {educations.length > 0 && (
          <section className="mt-14">
            <h2 className="text-lg font-bold uppercase">Educations</h2>
            <ul className="list-disc pl-6 mt-2 flex flex-col gap-6">
              {educations.map((education) => (
                <li key={education.id}>
                  <p className="text-base">
                    {education.institution} - {education.degree}
                  </p>
                  <p className="text-sm">
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
                  {education.description && (
                    <p className="text-sm mt-1">{education.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {projects.length > 0 && (
          <section className="mt-14">
            <h2 className="text-lg font-bold uppercase">Projects</h2>
            <ul className="list-disc pl-6 mt-2 flex flex-col gap-6">
              {projects.map((project) => (
                <li key={project.id}>
                  {project.deploymentUrl ? (
                    <a
                      href={project.deploymentUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="flex gap-2 hover:text-neutral-300 transition-colors"
                    >
                      <span>{project.name}</span>
                      <IconExternalLink size={16} />
                    </a>
                  ) : (
                    <p className="text-base">{project.name}</p>
                  )}
                  {project.repositoryUrl && (
                    <a
                      href={project.repositoryUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="text-sm underline underline-offset-4"
                    >
                      {project.repositoryUrl}
                    </a>
                  )}
                  <div className="flex flex-wrap my-2 gap-2">
                    {project.technologies.map((technology) => (
                      <Badge
                        variant="outline"
                        key={`${project.id}-${technology}`}
                      >
                        {technology}
                      </Badge>
                    ))}
                  </div>
                  {project.description && (
                    <p className="text-sm">{project.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {languages.length > 0 && (
          <section className="mt-14">
            <h2 className="text-lg font-bold uppercase">Languages</h2>
            <ul className="list-disc pl-6 mt-2 flex flex-col gap-6">
              {languages.map((language) => (
                <li key={language.id} className="">
                  {language.name} - {language.level}
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <footer className="mt-20">
        This portfolio was created with using{" "}
        <Link href="/" className="underline underline-offset-4">
          MyPortfolio
        </Link>{" "}
        and inspired by{" "}
        <a
          href="https://535.studio/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
        >
          535 Studio
        </a>
        .
      </footer>
    </div>
  );
}
