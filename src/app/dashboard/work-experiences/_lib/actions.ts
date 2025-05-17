"use server";

import {
  deleteWorkExperience as deleteWorkExperienceQuery,
  insertWorkExperience as insertWorkExperienceQuery,
  updateWorkExperience as updateWorkExperienceQuery,
} from "@/app/dashboard/work-experiences/_lib/queries";
import {
  deleteWorkExperienceSchema,
  insertWorkExperienceSchema,
  updateWorkExperienceSchema,
} from "@/app/dashboard/work-experiences/_lib/schema";
import type {
  DeleteWorkExperienceSchema,
  InsertWorkExperience,
  InsertWorkExperienceSchema,
  UpdateWorkExperience,
  UpdateWorkExperienceSchema,
} from "@/app/dashboard/work-experiences/_lib/types";
import type { ActionResponse } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function insertWorkExperience(
  _: unknown,
  formData: FormData,
): Promise<ActionResponse<InsertWorkExperienceSchema>> {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const data = Object.fromEntries(
    formData.entries(),
  ) as InsertWorkExperienceSchema;

  const result = insertWorkExperienceSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: "Invalid input",
      errors: {
        companyName: result.error.formErrors.fieldErrors.companyName?.[0],
        position: result.error.formErrors.fieldErrors.position?.[0],
        description: result.error.formErrors.fieldErrors.description?.[0],
        startMonth: result.error.formErrors.fieldErrors.startMonth?.[0],
        startYear: result.error.formErrors.fieldErrors.startYear?.[0],
        endMonth: result.error.formErrors.fieldErrors.endMonth?.[0],
        endYear: result.error.formErrors.fieldErrors.endYear?.[0],
      },
      data,
    };
  }

  const workExperienceToInsert: InsertWorkExperience = {
    userId,
    companyName: result.data.companyName,
    position: result.data.position,
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

  const workExperience = await insertWorkExperienceQuery({
    workExperience: workExperienceToInsert,
  });

  if (!workExperience) {
    return {
      success: false,
      error: "Failed to create work experience",
      data: result.data,
    };
  }

  revalidatePath("/dashboard/work-experiences");

  return {
    success: true,
    message: "Work experience created successfully",
  };
}

export async function deleteWorkExperience(
  _: unknown,
  formData: FormData,
): Promise<ActionResponse<DeleteWorkExperienceSchema>> {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const data = Object.fromEntries(
    formData.entries(),
  ) as DeleteWorkExperienceSchema;

  const result = deleteWorkExperienceSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: "Invalid input",
      data,
    };
  }

  const { workExperienceId } = result.data;

  const deletedWorkExperience = await deleteWorkExperienceQuery({
    workExperienceId,
  });

  if (!deletedWorkExperience) {
    return {
      success: false,
      error: "Failed to delete work experience",
      data,
    };
  }

  revalidatePath("/dashboard/work-experiences");

  return {
    success: true,
    message: "Work experience deleted successfully",
  };
}

export async function updateWorkExperience(
  _: unknown,
  formData: FormData,
): Promise<ActionResponse<UpdateWorkExperienceSchema>> {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const data = Object.fromEntries(
    formData.entries(),
  ) as UpdateWorkExperienceSchema;

  const result = updateWorkExperienceSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: "Invalid input",
      data,
    };
  }

  const workExperience: UpdateWorkExperience = {
    id: result.data.id,
    userId,
    companyName: result.data.companyName,
    position: result.data.position,
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

  const updatedWorkExperience = await updateWorkExperienceQuery({
    workExperience,
  });

  if (!updatedWorkExperience) {
    return {
      success: false,
      error: "Failed to update work experience",
      data: result.data,
    };
  }

  revalidatePath("/dashboard/work-experiences");

  return {
    success: true,
    message: "Work experience updated successfully",
  };
}
