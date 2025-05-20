import { getClerkClient } from "@/lib/clerk";
import { db } from "@/lib/db/drizzle";
import {
  getUserEducations,
  getUserLanguages,
  getUserProjects,
  getUserWorkExperiences,
} from "@/lib/queries";
import { notFound } from "next/navigation";

type GetUserClerkDataParams = {
  userId: string;
};

async function getUserClerkData({ userId }: GetUserClerkDataParams) {
  try {
    const clerk = await getClerkClient();
    const user = await clerk.users.getUser(userId);

    if (!user) notFound();

    return {
      imageUrl: user.imageUrl,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.primaryEmailAddress?.emailAddress,
    };
  } catch (error) {
    notFound();
  }
}

type GetUserIdBySlugParams = {
  slug: string;
};

async function getUserIdBySlug({ slug }: GetUserIdBySlugParams) {
  const userProfile = await db.query.userProfiles.findFirst({
    columns: {
      userId: true,
    },
    where: (userProfiles, { eq }) => eq(userProfiles.slug, slug),
  });

  return userProfile?.userId;
}

type GetUserDataParams = {
  slug: string;
};

type GetUserProfileByUserIdParams = {
  userId: string;
};

export async function getUserProfileByUserId({
  userId,
}: GetUserProfileByUserIdParams) {
  const userProfile = await db.query.userProfiles.findFirst({
    where: (userProfiles, { eq }) => eq(userProfiles.userId, userId),
  });

  return userProfile;
}

export async function getUserData({ slug }: GetUserDataParams) {
  const userId = await getUserIdBySlug({ slug });

  if (!userId) notFound();

  const userData = await getUserClerkData({ userId });

  const [profile, projects, educations, workExperiences, languages] =
    await Promise.all([
      getUserProfileByUserId({ userId }),
      getUserProjects({ userId }),
      getUserEducations({ userId }),
      getUserWorkExperiences({ userId }),
      getUserLanguages({ userId }),
    ]);

  return {
    userData,
    profile,
    projects,
    educations,
    workExperiences,
    languages,
  };
}
