import { db } from "@/lib/db/drizzle";
import { auth } from "@clerk/nextjs/server";

export async function getUserProjects() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const userProjects = await db.query.projects.findMany({
    where: (projects, { eq }) => eq(projects.userId, userId),
  });

  return userProjects;
}
