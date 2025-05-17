import type { DatesSchema } from "@/app/dashboard/_lib/types";
import { z } from "zod";

export function validateDates<S extends z.ZodType<DatesSchema>>(
  val: z.infer<S>,
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
