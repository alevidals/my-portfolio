import { validateDates } from "@/features/dashboard/lib/utils";
import { z } from "zod";

// -- ACTIONS --

const baseEducationSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  description: z.string().optional(),
  startMonth: z.string().min(1, { message: "Start month is required" }),
  startYear: z.string().min(1, { message: "Start year is required" }),
  endMonth: z.string().optional(),
  endYear: z.string().optional(),
});

export const insertEducationSchema =
  baseEducationSchema.superRefine(validateDates);

export const deleteEducationSchema = z.object({
  educationId: z.string().uuid("Invalid education ID"),
});

export const updateEducationSchema = baseEducationSchema
  .extend({
    id: z.string().uuid("Invalid education ID"),
  })
  .superRefine(validateDates);

// -- ACTIONS --
