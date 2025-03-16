import { db } from "@/lib/db/drizzle";
import { educationsSchema, type InsertEducation } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";

type GetEducationsParams = {
  userId: string;
};

type AddEducationParams = {
  education: InsertEducation;
};

type UpdateEducationsParams = {
  userId: string;
  education: InsertEducation;
};

type DeleteEducationsParams = {
  id: string;
  userId: string;
};

type BelongsEducationToUserParams = {
  id: string;
  userId: string;
};

export async function getEducations({ userId }: GetEducationsParams) {
  const educations = db.query.educationsSchema.findMany({
    columns: {
      id: true,
      degree: true,
      institution: true,
      startDate: true,
      endDate: true,
    },
    where: eq(educationsSchema.userId, userId),
  });

  return educations;
}

export async function addEducation({ education }: AddEducationParams) {
  try {
    const [createdEducation] = await db
      .insert(educationsSchema)
      .values(education)
      .returning({
        id: educationsSchema.id,
      });

    return createdEducation;
  } catch {
    return undefined;
  }
}

async function belongsEducationToUser({
  id,
  userId,
}: BelongsEducationToUserParams) {
  try {
    const education = db.query.educationsSchema.findFirst({
      columns: {
        id: true,
      },
      where: and(
        eq(educationsSchema.id, id),
        eq(educationsSchema.userId, userId),
      ),
    });

    return !!education;
  } catch {
    return false;
  }
}

export async function updateEducation({
  userId,
  education,
}: UpdateEducationsParams) {
  try {
    if (!education.id) {
      return undefined;
    }

    const belongsToUser = await belongsEducationToUser({
      id: education.id,
      userId,
    });

    if (!belongsToUser) {
      return undefined;
    }

    await db
      .update(educationsSchema)
      .set(education)
      .where(eq(educationsSchema.id, education.id));
    return education;
  } catch {
    return undefined;
  }
}

export async function deleteEducation({ id, userId }: DeleteEducationsParams) {
  try {
    const belongsToUser = await belongsEducationToUser({ id, userId });

    if (!belongsToUser) {
      return undefined;
    }

    await db.delete(educationsSchema).where(eq(educationsSchema.id, id));
  } catch {
    return undefined;
  }
}
