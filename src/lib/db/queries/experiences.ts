import { db } from "@/lib/db/drizzle";
import { type InsertExperience, workExperiencesSchema } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";

type GetExperiencesParams = {
  userId: string;
};

type AddExperienceParams = {
  experience: InsertExperience;
};

type BelongsExperienceToUserParams = {
  id: string;
  userId: string;
};

type UpdateExperienceParams = {
  userId: string;
  experience: InsertExperience;
};

type DeleteExperienceParams = {
  id: string;
  userId: string;
};

export async function getExperiences({ userId }: GetExperiencesParams) {
  try {
    const experiences = await db.query.workExperiencesSchema.findMany({
      columns: {
        id: true,
        companyName: true,
        position: true,
        startDate: true,
        endDate: true,
      },
      where: eq(workExperiencesSchema.userId, userId),
    });

    return experiences;
  } catch {
    return [];
  }
}

export async function addExperience({ experience }: AddExperienceParams) {
  try {
    const [createdExperience] = await db
      .insert(workExperiencesSchema)
      .values(experience)
      .returning({
        id: workExperiencesSchema.id,
      });

    return createdExperience;
  } catch {
    return undefined;
  }
}

async function belongsExperienceToUser({
  id,
  userId,
}: BelongsExperienceToUserParams) {
  try {
    const experience = db.query.educationsSchema.findFirst({
      columns: {
        id: true,
      },
      where: and(
        eq(workExperiencesSchema.id, id),
        eq(workExperiencesSchema.userId, userId),
      ),
    });

    return !!experience;
  } catch {
    return false;
  }
}

export async function updateExperience({
  userId,
  experience,
}: UpdateExperienceParams) {
  try {
    if (!experience.id) {
      return undefined;
    }

    const belongsToUser = await belongsExperienceToUser({
      id: experience.id,
      userId,
    });

    if (!belongsToUser) {
      return undefined;
    }

    await db
      .update(workExperiencesSchema)
      .set(experience)
      .where(eq(workExperiencesSchema.id, experience.id));
    return experience;
  } catch {
    return undefined;
  }
}

export async function deleteExperience({ id, userId }: DeleteExperienceParams) {
  try {
    const belongsToUser = await belongsExperienceToUser({ id, userId });

    if (!belongsToUser) {
      return undefined;
    }

    await db
      .delete(workExperiencesSchema)
      .where(eq(workExperiencesSchema.id, id));
  } catch {
    return undefined;
  }
}
