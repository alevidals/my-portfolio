"use server";

import { insertUserProfile as insertUserProfileQuery } from "@/lib/queries/user";
import { insertUserProfileSchema } from "@/lib/schema/users";
import type { ActionResponse } from "@/lib/types/actions";
import type { InsertUserProfileSchema } from "@/lib/types/users";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function insertUserProfile(
  _: unknown,
  formData: FormData,
): Promise<ActionResponse<InsertUserProfileSchema>> {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const data = Object.fromEntries(formData.entries());

  const result = insertUserProfileSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: "Invalid input",
      errors: {
        biography: result.error.formErrors.fieldErrors.biography?.[0],
        linkedInUrl: result.error.formErrors.fieldErrors.linkedInUrl?.[0],
        githubUrl: result.error.formErrors.fieldErrors.githubUrl?.[0],
      },
      data,
    };
  }

  const userProfile = await insertUserProfileQuery({
    userId,
    biography: result.data.biography,
    githubUrl: result.data.githubUrl,
    linkedInUrl: result.data.linkedInUrl,
  });

  if (!userProfile) {
    return {
      success: false,
      error: "Failed to update profile",
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
