import { db } from "@/lib/db/drizzle";
import { workExperiences } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";

export async function getUserWorkExperiences() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const userWorkExperiences = await db
    .select()
    .from(workExperiences)
    .where(eq(workExperiences.userId, userId))
    .orderBy(desc(workExperiences.startDate))
    .all();

  return userWorkExperiences;
}
