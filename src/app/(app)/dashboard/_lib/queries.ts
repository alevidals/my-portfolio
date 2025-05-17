import { db } from "@/lib/db/drizzle";
import { auth } from "@clerk/nextjs/server";

export async function getProfileSlug() {
  const { userId } = await auth();

  if (!userId) return;

  const userProfile = await db.query.userProfiles.findFirst({
    where: (userProfiles, { eq }) => eq(userProfiles.userId, userId),
  });

  return userProfile?.slug;
}
