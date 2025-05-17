import { db } from "@/lib/db/drizzle";
import { educations, workExperiences } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

type GetUserEducationsParams = {
  userId: string;
};

export async function getUserEducations({ userId }: GetUserEducationsParams) {
  const userEducations = await db
    .select()
    .from(educations)
    .where(eq(educations.userId, userId))
    .orderBy(
      sql`json_extract(${educations.startDate}, '$.year') DESC`,
      sql`json_extract(${educations.startDate}, '$.month') DESC`,
    )
    .all();

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
  const userWorkExperiences = await db
    .select()
    .from(workExperiences)
    .where(eq(workExperiences.userId, userId))
    .orderBy(
      sql`json_extract(${workExperiences.startDate}, '$.year') DESC`,
      sql`json_extract(${workExperiences.startDate}, '$.month') DESC`,
    )
    .all();

  return userWorkExperiences;
}
