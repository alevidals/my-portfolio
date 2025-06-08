import type {
  InsertEducation,
  UpdateEducation,
} from "@/features/dashboard/educations/lib/types";
import { getSession } from "@/shared/lib/auth";
import { db } from "@/shared/lib/db/drizzle";
import { educations } from "@/shared/lib/db/schema";
import { eq } from "drizzle-orm";

type InsertEducationParams = {
  education: InsertEducation;
};

export async function insertEducation({ education }: InsertEducationParams) {
  const newEducation = await db
    .insert(educations)
    .values(education)
    .returning()
    .get();

  return newEducation;
}

type BelongsEducationToUserParams = {
  educationId: string;
  userId: string;
};

export async function belongsEducationToUser({
  educationId,
  userId,
}: BelongsEducationToUserParams) {
  const education = await db.query.educations.findFirst({
    where: (education, { eq, and }) =>
      and(eq(education.id, educationId), eq(education.userId, userId)),
  });

  return !!education;
}

type DeleteEducationParams = {
  educationId: string;
};

export async function deleteEducation({ educationId }: DeleteEducationParams) {
  const session = await getSession();
  if (!session) return;

  const belongsToUser = await belongsEducationToUser({
    educationId,
    userId: session.user.id,
  });

  if (!belongsToUser) {
    return;
  }

  const deletedEducation = await db
    .delete(educations)
    .where(eq(educations.id, educationId))
    .returning()
    .get();

  return deletedEducation;
}

type UpdateEducationParams = {
  education: UpdateEducation;
};

export async function updateEducation({ education }: UpdateEducationParams) {
  const session = await getSession();
  if (!session) return;

  const belongsToUser = await belongsEducationToUser({
    educationId: education.id,
    userId: session.user.id,
  });

  if (!belongsToUser) {
    return;
  }

  const updatedEducation = await db
    .update(educations)
    .set(education)
    .where(eq(educations.id, education.id))
    .returning()
    .get();

  return updatedEducation;
}
