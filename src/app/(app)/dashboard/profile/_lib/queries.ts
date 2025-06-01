import type {
  InsertLanguages,
  InsertUserProfile,
} from "@/app/(app)//dashboard/profile/_lib/types";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db/drizzle";
import { userProfiles } from "@/lib/db/schema";
import { languages as languagesSchema } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function getUserProfile() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const userProfile = await db.query.userProfiles.findFirst({
    where: (userProfiles, { eq }) => eq(userProfiles.userId, session.user.id),
  });

  return userProfile;
}

type ExistsUserProfileParams = {
  userId: string;
};

export async function existsUserProfile({ userId }: ExistsUserProfileParams) {
  const userProfile = await db.query.userProfiles.findFirst({
    where: (userProfiles, { eq }) => eq(userProfiles.userId, userId),
  });

  return !!userProfile;
}

type InsertUserProfileParams = {
  user: InsertUserProfile;
};

export async function insertUserProfile({ user }: InsertUserProfileParams) {
  const exists = await existsUserProfile({ userId: user.userId });

  if (!exists) {
    const userProfile = await db
      .insert(userProfiles)
      .values(user)
      .returning()
      .get();

    return userProfile;
  }

  const userProfile = await db
    .update(userProfiles)
    .set(user)
    .where(eq(userProfiles.userId, user.userId))
    .returning()
    .get();

  return userProfile;
}

type InsertUserLanguagesParams = {
  userId: string;
  languages: InsertLanguages[];
};

export async function insertUserLanguages({
  userId,
  languages,
}: InsertUserLanguagesParams) {
  await db.delete(languagesSchema).where(eq(languagesSchema.userId, userId));

  if (!languages.length) {
    return [];
  }

  const insertedLanguages = await db
    .insert(languagesSchema)
    .values(languages)
    .returning()
    .get();

  return insertedLanguages;
}
