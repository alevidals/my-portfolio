import { db } from "@/lib/db/drizzle";
import { getUser } from "@/lib/db/queries/users";
import { educationsSchema, type InsertEducation } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getEducations() {
  const user = await getUser();

  if (!user) {
    return [];
  }

  const educations = db.query.educationsSchema.findMany({
    columns: {
      id: true,
      degree: true,
      institution: true,
      startDate: true,
      endDate: true,
    },
    where: eq(educationsSchema.userId, user.id),
  });

  return educations;
}

export async function addEducation(education: InsertEducation) {
  try {
    const user = await getUser();

    if (!user) {
      return undefined;
    }

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
