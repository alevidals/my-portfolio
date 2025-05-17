import { z } from "zod";

// -- ACTIONS --

export const insertWorkExperienceSchema = z
  .object({
    companyName: z.string().min(10, { message: "Company name is required" }),
    position: z.string().min(1, { message: "Position is required" }),
    description: z.string().optional(),
    startMonth: z.string().min(1, { message: "Start month is required" }),
    startYear: z.string().min(1, { message: "Start year is required" }),
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

export const deleteWorkExperienceSchema = z.object({
  workExperienceId: z.string().uuid("Invalid work experience ID"),
});

// -- ACTIONS --
