import { z } from "zod";

// -- ACTIONS --

export const insertWorkExperienceSchema = z.object({
  companyName: z.string().min(1, { message: "Company name is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  description: z.string().optional(),
  startMonth: z.string().min(1, { message: "Start month is required" }),
  startYear: z.string().min(1, { message: "Start year is required" }),
  endMonth: z.string().optional(),
  endYear: z.string().optional(),
});

// -- ACTIONS --
