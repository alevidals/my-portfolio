import type {
  InsertEducation,
  UpdateEducation,
} from "@/app/dashboard/educations/_lib/types";
import { db } from "@/lib/db/drizzle";
import { educations } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";

export async function getUserEducations() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

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
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const belongsToUser = await belongsEducationToUser({
    educationId,
    userId,
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
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const belongsToUser = await belongsEducationToUser({
    educationId: education.id,
    userId,
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
