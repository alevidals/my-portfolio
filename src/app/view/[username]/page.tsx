import { getUserData } from "@/app/view/[username]/_lib/queries";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconExternalLink,
  IconMail,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: Promise<{
    username: string;
  }>;
};

type LinksProps = {
  email?: string;
  githubUrl?: string | null;
  linkedInUrl?: string | null;
};

function Links({ email, githubUrl, linkedInUrl }: LinksProps) {
  return (
    <div className="flex gap-4">
      {email && (
        <a
          href={`mailto:${email}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-neutral-300 transition-colors"
        >
          <IconMail size={26} />
        </a>
      )}
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-neutral-300 transition-colors"
        >
          <IconBrandGithub size={26} />
        </a>
      )}
      {linkedInUrl && (
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-neutral-300 transition-colors"
        >
          <IconBrandLinkedin size={26} />
        </a>
      )}
    </div>
  );
}

export default async function ViewPage({ params }: Props) {
  const { username } = await params;

  const { userData, profile, projects, educations, workExperiences } =
    await getUserData({
      slug: username,
    });

  const fullName = `${userData.firstName} ${userData.lastName}`;

  console.log(profile);

  return (
    <div className="w-5/6 md:w-full max-w-xl mx-auto py-32">
      <header className="mb-20">
        <Image
          src={userData.imageUrl}
          alt="Profile"
          width={100}
          height={100}
          className="rounded-lg mx-auto"
        />
        <nav className="mx-auto flex flex-col items-center mt-4 gap-2">
          <h1 className="font-bold text-xl">{fullName}</h1>
          <Links
            email={userData.email}
            githubUrl={profile?.githubUrl}
            linkedInUrl={profile?.linkedInUrl}
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
                  <p>
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
                    <p className="text-sm">{experience.description}</p>
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
                  <p>
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
                    <p className="text-sm">{education.description}</p>
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
                <li key={project.id} className="">
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
