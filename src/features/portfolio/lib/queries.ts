import { db } from "@/shared/lib/db/drizzle";
import {
  getUserEducations,
  getUserLanguages,
  getUserProjects,
  getUserWorkExperiences,
} from "@/shared/lib/queries";
import { notFound } from "next/navigation";

type GetUserAccountDataParams = {
  userId: string;
};

export async function getUserAccountData({ userId }: GetUserAccountDataParams) {
  // TODO: refactor and extract this to a query
  const user = await db.query.usersSchema.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
    columns: {
      image: true,
      name: true,
      email: true,
    },
  });

  return {
    imageUrl: user?.image,
    name: user?.name,
    email: user?.email,
  };
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

  const userData = await getUserAccountData({ userId });

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
