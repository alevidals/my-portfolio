"use server";

import { insertEducation as insertEducationQuery } from "@/app/dashboard/educations/_lib/queries";
import { insertEducationSchema } from "@/app/dashboard/educations/_lib/schema";
import type {
  InsertEducation,
  InsertEducationSchema,
} from "@/app/dashboard/educations/_lib/types";
import type { ActionResponse } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function insertEducation(
  _: unknown,
  formData: FormData,
): Promise<ActionResponse<InsertEducationSchema>> {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const data = Object.fromEntries(formData.entries()) as InsertEducationSchema;

  const result = insertEducationSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: "Invalid input",
      errors: {
        institution: result.error.formErrors.fieldErrors.institution?.[0],
        degree: result.error.formErrors.fieldErrors.degree?.[0],
        description: result.error.formErrors.fieldErrors.description?.[0],
        startMonth: result.error.formErrors.fieldErrors.startMonth?.[0],
        startYear: result.error.formErrors.fieldErrors.startYear?.[0],
        endMonth: result.error.formErrors.fieldErrors.endMonth?.[0],
        endYear: result.error.formErrors.fieldErrors.endYear?.[0],
      },
      data,
    };
  }

  const educationToInsert: InsertEducation = {
    userId,
    institution: result.data.institution,
    degree: result.data.degree,
    description: result.data.description,
    startDate: {
      month: result.data.startMonth,
      year: result.data.startYear,
    },
    ...(result.data.endMonth &&
      result.data.endYear && {
        endDate: {
          month: result.data.endMonth,
          year: result.data.endYear,
        },
      }),
  };

  const education = await insertEducationQuery({
    education: educationToInsert,
  });

  if (!education) {
    return {
      success: false,
      error: "Failed to create education",
      data: result.data,
    };
  }

  revalidatePath("/dashboard/educations");

  return {
    success: true,
    message: "Education created successfully",
  };
}
