import type { InsertWorkExperience } from "@/app/dashboard/work-experiences/_lib/types";
import { db } from "@/lib/db/drizzle";
import { workExperiences } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";

export async function getUserWorkExperiences() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

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

type InsertWorkExperienceParams = {
  workExperience: InsertWorkExperience;
};

export async function insertWorkExperience({
  workExperience,
}: InsertWorkExperienceParams) {
  const newWorkExperience = await db
    .insert(workExperiences)
    .values(workExperience)
    .returning()
    .get();

  return newWorkExperience;
}

type BelongsWorkExperienceToUserParams = {
  workExperienceId: string;
  userId: string;
};

export async function belongsWorkExperienceToUser({
  workExperienceId,
  userId,
}: BelongsWorkExperienceToUserParams) {
  const workExperience = await db.query.workExperiences.findFirst({
    where: (workExperience, { eq, and }) =>
      and(
        eq(workExperience.id, workExperienceId),
        eq(workExperience.userId, userId),
      ),
  });

  return !!workExperience;
}

type DeleteWorkExperienceParams = {
  workExperienceId: string;
};

export async function deleteWorkExperience({
  workExperienceId,
}: DeleteWorkExperienceParams) {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const belongsToUser = await belongsWorkExperienceToUser({
    workExperienceId,
    userId,
  });

  if (!belongsToUser) {
    return;
  }

  const deletedWorkExperience = await db
    .delete(workExperiences)
    .where(eq(workExperiences.id, workExperienceId))
    .returning()
    .get();

  return deletedWorkExperience;
}
