import { db } from "@/lib/db/drizzle";
import { auth } from "@clerk/nextjs/server";

export async function getProfileSlug() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const userProfile = await db.query.userProfiles.findFirst({
    where: (userProfiles, { eq }) => eq(userProfiles.userId, userId),
  });

  return userProfile?.slug;
}
