"use server";

import {
  addEducation as addEducationQuery,
  updateEducation as updateEducationQuery,
  deleteEducation as deleteEducationQuery,
} from "@/lib/db/queries/educations";
import {
  addExperience as addExperienceQuery,
  updateExperience as updateExperienceQuery,
  deleteExperience as deleteExperienceQuery,
} from "@/lib/db/queries/experiences";
import { getUser } from "@/lib/db/queries/users";
import type { InsertEducation, InsertExperience } from "@/lib/db/schema";
import { validateAction } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cache } from "react";
import { z } from "zod";

type BaseEducation = z.infer<typeof baseEducationSchema>;

type BaseExperience = z.infer<typeof baseExperienceSchema>;

const cachedGetUser = cache(getUser);

function validateDates(
  val: BaseEducation | BaseExperience,
  ctx: z.RefinementCtx,
) {
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
}

const baseEducationSchema = z.object({
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
});

const addEducationSchema = baseEducationSchema.superRefine(validateDates);

export async function addEducation(_: unknown, formData: FormData) {
  const user = await cachedGetUser();

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

  const createdEducation = await addEducationQuery({ education });

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

const deleteEducationSchema = z.object({
  id: z.string(),
});

export async function deleteEducation(_: unknown, formData: FormData) {
  const user = await cachedGetUser();

  if (!user) {
    redirect("/login");
  }

  const validate = validateAction({
    formData,
    schema: deleteEducationSchema,
  });

  if (!validate.success) {
    return validate;
  }

  const {
    data: { id },
  } = validate;

  await deleteEducationQuery({ id, userId: user.id });

  revalidatePath("/dashboard");
}

const editEducationSchema = baseEducationSchema
  .extend({
    id: z.string(),
  })
  .superRefine(validateDates);

export async function editEducation(_: unknown, formData: FormData) {
  const user = await cachedGetUser();

  if (!user) {
    redirect("/login");
  }

  const validate = validateAction({
    formData,
    schema: editEducationSchema,
  });

  if (!validate.success) {
    return validate;
  }

  const {
    data: { id, degree, institution, startMonth, startYear, endMonth, endYear },
  } = validate;

  const education: InsertEducation = {
    id,
    degree,
    institution,
    startDate: `${startYear}-${startMonth}-01`,
    ...(endMonth &&
      endYear && {
        endDate: `${endYear}-${endMonth}-01`,
      }),
    userId: user.id,
  };

  const updatedEducation = await updateEducationQuery({
    education,
    userId: user.id,
  });

  if (!updatedEducation) {
    return {
      success: false,
      message: "Failed to update education",
      errors: validate.errors,
      data: validate.data,
    };
  }

  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Education updated successfully",
  };
}

const baseExperienceSchema = z.object({
  companyName: z.string().min(3, {
    message: "Company name must be at least 3 characters",
  }),
  position: z.string().min(3, {
    message: "Position must be at least 3 characters",
  }),
  startMonth: z.string(),
  startYear: z.string(),
  endMonth: z.string().optional(),
  endYear: z.string().optional(),
});

const addExperienceSchema = baseExperienceSchema.superRefine(validateDates);

export async function addExperience(_: unknown, formData: FormData) {
  const user = await cachedGetUser();

  if (!user) {
    redirect("/login");
  }

  const validate = validateAction({
    formData,
    schema: addExperienceSchema,
  });

  if (!validate.success) {
    return validate;
  }

  const {
    data: { companyName, position, startMonth, startYear, endMonth, endYear },
  } = validate;

  const experience: InsertExperience = {
    companyName,
    position,
    startDate: `${startYear}-${startMonth}-01`,
    ...(endMonth &&
      endYear && {
        endDate: `${endYear}-${endMonth}-01`,
      }),
    userId: user.id,
  };

  const createdExperience = await addExperienceQuery({ experience });

  if (!createdExperience) {
    return {
      success: false,
      message: "Failed to create experience",
      errors: validate.errors,
      data: validate.data,
    };
  }

  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Experience created successfully",
  };
}

const editExperienceSchema = baseExperienceSchema
  .extend({
    id: z.string(),
  })
  .superRefine(validateDates);

export async function editExperience(_: unknown, formData: FormData) {
  const user = await cachedGetUser();

  if (!user) {
    redirect("/login");
  }

  const validate = validateAction({
    formData,
    schema: editExperienceSchema,
  });

  if (!validate.success) {
    return validate;
  }

  const {
    data: {
      id,
      companyName,
      position,
      startMonth,
      startYear,
      endMonth,
      endYear,
    },
  } = validate;

  const experience: InsertExperience = {
    id,
    companyName,
    position,
    startDate: `${startYear}-${startMonth}-01`,
    ...(endMonth &&
      endYear && {
        endDate: `${endYear}-${endMonth}-01`,
      }),
    userId: user.id,
  };

  const updatedExperience = await updateExperienceQuery({
    experience,
    userId: user.id,
  });

  if (!updatedExperience) {
    return {
      success: false,
      message: "Failed to update experience",
      errors: validate.errors,
      data: validate.data,
    };
  }

  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Experience updated successfully",
  };
}

const deleteExperienceSchema = z.object({
  id: z.string(),
});

export async function deleteExperience(_: unknown, formData: FormData) {
  const user = await cachedGetUser();

  if (!user) {
    redirect("/login");
  }

  const validate = validateAction({
    formData,
    schema: deleteExperienceSchema,
  });

  if (!validate.success) {
    return validate;
  }

  const {
    data: { id },
  } = validate;

  await deleteExperienceQuery({ id, userId: user.id });

  revalidatePath("/dashboard");
}
