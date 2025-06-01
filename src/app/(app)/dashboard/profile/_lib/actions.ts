"use server";

import {
  insertUserLanguages,
  insertUserProfile as insertUserProfileQuery,
} from "@/app/(app)//dashboard/profile/_lib/queries";
import { insertUserProfileSchema } from "@/app/(app)//dashboard/profile/_lib/schema";
import type {
  InsertLanguages,
  InsertUserProfile,
  InsertUserProfileSchema,
} from "@/app/(app)//dashboard/profile/_lib/types";
import { getSession } from "@/lib/auth";
import type { ActionResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function insertUserProfile(
  _: unknown,
  formData: FormData,
): Promise<ActionResponse<InsertUserProfileSchema>> {
  const session = await getSession();

  if (!session) redirect("/");

  const data = Object.fromEntries(formData.entries());

  const result = insertUserProfileSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: "Invalid input",
      errors: {
        preferredPortfolio: result.error.formErrors.fieldErrors
          .preferredPortfolio?.[0] as InsertUserProfileSchema["preferredPortfolio"],
        slug: result.error.formErrors.fieldErrors.slug?.[0],
        fullName: result.error.formErrors.fieldErrors.fullName?.[0],
        biography: result.error.formErrors.fieldErrors.biography?.[0],
        linkedInUrl: result.error.formErrors.fieldErrors.linkedInUrl?.[0],
        githubUrl: result.error.formErrors.fieldErrors.githubUrl?.[0],
        xUrl: result.error.formErrors.fieldErrors.xUrl?.[0],
      },
      data,
    };
  }

  const languages = JSON.parse(
    result.data.languages ?? "[]",
  ) as InsertLanguages[];

  const userToInsert: InsertUserProfile = {
    userId: session.user.id,
    slug: result.data.slug,
    preferredPortfolio: result.data.preferredPortfolio,
    fullName: result.data.fullName,
    biography: result.data.biography,
    githubUrl: result.data.githubUrl,
    linkedInUrl: result.data.linkedInUrl,
    xUrl: result.data.xUrl,
  };

  const userProfile = await insertUserProfileQuery({ user: userToInsert });

  if (!userProfile) {
    return {
      success: false,
      error: "Failed to update profile",
      data: result.data,
    };
  }

  const userLanguages: InsertLanguages[] = languages.map((language) => ({
    userId: session.user.id,
    name: language.name,
    level: language.level,
  }));

  const insertedLanguages = await insertUserLanguages({
    userId: session.user.id,
    languages: userLanguages,
  });

  if (!insertedLanguages) {
    return {
      success: false,
      error: "Failed to update languages",
      data: result.data,
    };
  }

  revalidatePath("/dashboard/profile");

  return {
    success: true,
    message: "Profile updated successfully",
    ...result.data,
  };
}
