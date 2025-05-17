import type { InsertUserProfile } from "@/app/(app)//dashboard/profile/_lib/types";
import { db } from "@/lib/db/drizzle";
import { userProfiles } from "@/lib/db/schema";
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
