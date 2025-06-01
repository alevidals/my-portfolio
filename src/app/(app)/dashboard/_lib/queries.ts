import { getSession } from "@/lib/auth";
import { db } from "@/lib/db/drizzle";
import { redirect } from "next/navigation";

export async function getProfileSlug() {
  const session = await getSession();

  if (!session) redirect("/");

  const userProfile = await db.query.userProfiles.findFirst({
    where: (userProfiles, { eq }) => eq(userProfiles.userId, session.user.id),
  });

  return userProfile?.slug;
}
