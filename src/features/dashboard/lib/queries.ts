import { getSession } from "@/shared/lib/auth";
import { db } from "@/shared/lib/db/drizzle";
import { redirect } from "next/navigation";

export async function getProfileSlug() {
  const session = await getSession();

  if (!session) redirect("/");

  const userProfile = await db.query.userProfiles.findFirst({
    where: (userProfiles, { eq }) => eq(userProfiles.userId, session.user.id),
  });

  return userProfile?.slug;
}
