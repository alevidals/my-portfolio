import { validateDates } from "@/app/(app)//dashboard/_lib/utils";
import { z } from "zod";

// -- ACTIONS --

const baseWorkExperienceSchema = z.object({
  companyName: z.string().min(1, { message: "Company name is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  description: z.string().optional(),
  startMonth: z.string().min(1, { message: "Start month is required" }),
  startYear: z.string().min(1, { message: "Start year is required" }),
  endMonth: z.string().optional(),
  endYear: z.string().optional(),
});

export const insertWorkExperienceSchema =
  baseWorkExperienceSchema.superRefine(validateDates);

export const deleteWorkExperienceSchema = z.object({
  workExperienceId: z.string().uuid("Invalid work experience ID"),
});

export const updateWorkExperienceSchema = baseWorkExperienceSchema
  .extend({
    id: z.string().uuid("Invalid work experience ID"),
  })
  .superRefine(validateDates);

// -- ACTIONS --
