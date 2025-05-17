import type { InsertEducation } from "@/app/dashboard/educations/_lib/types";
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
