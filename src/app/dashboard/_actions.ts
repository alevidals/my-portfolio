"use server";

import { addEducation as addEducationQuery } from "@/lib/db/queries/educations";
import { getUser } from "@/lib/db/queries/users";
import type { InsertEducation } from "@/lib/db/schema";
import { validateAction } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const addEducationSchema = z
  .object({
    degree: z.string().min(3, {
      message: "Degree must be at least 3 characters",
    }),
    institution: z.string().min(3, {
      message: "Institution must be at least 3 characters",
    }),
    startMonth: z.string(),
    startYear: z.string(),
    endMonth: z.string().optional(),
    endYear: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    if (val.endMonth && !val.endYear) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End year is required if end month is provided",
        path: ["endYear"],
      });
    }

    if (val.endYear && !val.endMonth) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End month is required if end year is provided",
        path: ["endMonth"],
      });
    }

    if (val.endYear && val.startYear > val.endYear) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Start year must be less than end year",
        path: ["startYear"],
      });
    }

    if (
      val.endYear &&
      val.endMonth &&
      val.startYear === val.endYear &&
      val.startMonth > val.endMonth
    ) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Start month must be less than end month",
        path: ["startMonth"],
      });
    }
  });

export async function addEducation(_: unknown, formData: FormData) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const validate = validateAction({
    formData,
    schema: addEducationSchema,
  });

  if (!validate.success) {
    return validate;
  }

  const {
    data: { degree, institution, startMonth, startYear, endMonth, endYear },
  } = validate;

  const education: InsertEducation = {
    degree,
    institution,
    startDate: `${startYear}-${startMonth}-01`,
    ...(endMonth &&
      endYear && {
        endDate: `${endYear}-${endMonth}-01`,
      }),
    userId: user.id,
  };

  const createdEducation = await addEducationQuery(education);

  if (!createdEducation) {
    return {
      success: false,
      message: "Failed to create education",
      errors: validate.errors,
      data: validate.data,
    };
  }

  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Education created successfully",
  };
}
