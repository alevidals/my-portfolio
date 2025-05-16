import { db } from "@/lib/db/drizzle";
import { userProfiles } from "@/lib/db/schema";
import type { InsertUserProfile } from "@/lib/types/users";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function getUserProfile() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const userProfile = await db.query.userProfiles.findFirst({
    where: (userProfiles, { eq }) => eq(userProfiles.userId, userId),
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

type InsertUserProfileParams = InsertUserProfile;

export async function insertUserProfile({
  userId,
  biography,
  githubUrl,
  linkedInUrl,
}: InsertUserProfileParams) {
  const exists = await existsUserProfile({ userId });

  if (!exists) {
    const userProfile = await db
      .insert(userProfiles)
      .values({
        userId,
        biography,
        githubUrl,
        linkedInUrl,
      })
      .returning()
      .get();

    return userProfile;
  }

  const userProfile = await db
    .update(userProfiles)
    .set({
      biography,
      githubUrl,
      linkedInUrl,
    })
    .where(eq(userProfiles.userId, userId))
    .returning()
    .get();

  return userProfile;
}
