import { z } from "zod";

export const datesSchema = z.object({
  startMonth: z.string().min(1, { message: "Start month is required" }),
  startYear: z.string().min(1, { message: "Start year is required" }),
  endMonth: z.string().optional(),
  endYear: z.string().optional(),
});
