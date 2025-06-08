"use server";

import {
  deleteEducation as deleteEducationQuery,
  insertEducation as insertEducationQuery,
  updateEducation as updateEducationQuery,
} from "@/features/dashboard/educations/lib/queries";
import {
  deleteEducationSchema,
  insertEducationSchema,
  updateEducationSchema,
} from "@/features/dashboard/educations/lib/schema";
import type {
  DeleteEducationSchema,
  InsertEducation,
  InsertEducationSchema,
  UpdateEducation,
  UpdateEducationSchema,
} from "@/features/dashboard/educations/lib/types";
import { getSession } from "@/shared/lib/auth";
import type { ActionResponse } from "@/shared/lib/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function insertEducation(
  _: unknown,
  formData: FormData,
): Promise<ActionResponse<InsertEducationSchema>> {
  const session = await getSession();
  if (!session) redirect("/");

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
    userId: session.user.id,
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

export async function deleteEducation(
  _: unknown,
  formData: FormData,
): Promise<ActionResponse<DeleteEducationSchema>> {
  const session = await getSession();
  if (!session) redirect("/");

  const data = Object.fromEntries(formData.entries()) as DeleteEducationSchema;

  const result = deleteEducationSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: "Invalid input",
      data,
    };
  }

  const { educationId } = result.data;

  const deletedEducation = await deleteEducationQuery({
    educationId,
  });

  if (!deletedEducation) {
    return {
      success: false,
      error: "Failed to delete education.",
      data,
    };
  }

  revalidatePath("/dashboard/educations");

  return {
    success: true,
    message: "Education deleted successfully.",
  };
}

export async function updateEducation(
  _: unknown,
  formData: FormData,
): Promise<ActionResponse<UpdateEducationSchema>> {
  const session = await getSession();
  if (!session) redirect("/");

  const data = Object.fromEntries(formData.entries()) as UpdateEducationSchema;

  const result = updateEducationSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: "Invalid input",
      data,
    };
  }

  const newEducation: UpdateEducation = {
    id: result.data.id,
    userId: session.user.id,
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

  const updatedEducation = await updateEducationQuery({
    education: newEducation,
  });

  if (!updatedEducation) {
    return {
      success: false,
      error: "Failed to update education",
      data: result.data,
    };
  }

  revalidatePath("/dashboard/educations");

  return {
    success: true,
    message: "Education updated successfully.",
  };
}
