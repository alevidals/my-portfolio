import { db } from "@/lib/db/drizzle";
import { projects } from "@/lib/db/schema";
import type { InsertProject } from "@/lib/types/projects";
import { auth } from "@clerk/nextjs/server";

export async function getUserProjects() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const userProjects = await db.query.projects.findMany({
    where: (projects, { eq }) => eq(projects.userId, userId),
  });

  return userProjects;
}

type InsertProjectParams = {
  project: InsertProject;
};

export async function insertProject({ project }: InsertProjectParams) {
  const insertedProject = await db
    .insert(projects)
    .values(project)
    .returning()
    .get();

  return insertedProject;
}
