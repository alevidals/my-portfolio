import { db } from "@/shared/lib/db/drizzle";
import { sql } from "drizzle-orm";

type GetUserEducationsParams = {
  userId: string;
};

export async function getUserEducations({ userId }: GetUserEducationsParams) {
  const userEducations = await db.query.educations.findMany({
    where: (educations, { eq }) => eq(educations.userId, userId),
    orderBy: (educations, { desc }) => [
      desc(sql`json_extract(${educations.startDate}, '$.year')`),
      desc(sql`json_extract(${educations.startDate}, '$.month')`),
    ],
  });

  return userEducations;
}

type GetUserProjectsParams = {
  userId: string;
};

export async function getUserProjects({ userId }: GetUserProjectsParams) {
  const userProjects = await db.query.projects.findMany({
    where: (projects, { eq }) => eq(projects.userId, userId),
  });

  return userProjects;
}

type GetUserWorkExperiencesParams = {
  userId: string;
};

export async function getUserWorkExperiences({
  userId,
}: GetUserWorkExperiencesParams) {
  const userWorkExperiences = await db.query.workExperiences.findMany({
    where: (workExperiences, { eq }) => eq(workExperiences.userId, userId),
    orderBy: (workExperiences, { desc }) => [
      desc(sql`json_extract(${workExperiences.startDate}, '$.year')`),
      desc(sql`json_extract(${workExperiences.startDate}, '$.month')`),
    ],
  });

  return userWorkExperiences;
}

type GetUserLanguagesParams = {
  userId: string;
};

export async function getUserLanguages({ userId }: GetUserLanguagesParams) {
  const languages = await db.query.languages.findMany({
    where: (languages, { eq }) => eq(languages.userId, userId),
  });

  return languages;
}
