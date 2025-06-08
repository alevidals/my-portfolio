import type {
  InsertWorkExperience,
  UpdateWorkExperience,
} from "@/features/dashboard/work-experiences/lib/types";
import { getSession } from "@/shared/lib/auth";
import { db } from "@/shared/lib/db/drizzle";
import { workExperiences } from "@/shared/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

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
  const session = await getSession();

  if (!session) redirect("/");

  const belongsToUser = await belongsWorkExperienceToUser({
    workExperienceId,
    userId: session.user.id,
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

type UpdateWorkExperienceParams = {
  workExperience: UpdateWorkExperience;
};

export async function updateWorkExperience({
  workExperience,
}: UpdateWorkExperienceParams) {
  const session = await getSession();

  if (!session) redirect("/");

  const belongsToUser = await belongsWorkExperienceToUser({
    workExperienceId: workExperience.id,
    userId: session.user.id,
  });

  if (!belongsToUser) {
    return;
  }

  const updatedWorkExperience = await db
    .update(workExperiences)
    .set(workExperience)
    .where(eq(workExperiences.id, workExperience.id))
    .returning()
    .get();

  return updatedWorkExperience;
}
