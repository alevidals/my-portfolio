import { z } from "zod";

export const insertUserProfileSchema = z.object({
  biography: z.string().optional(),
  linkedInUrl: z
    .string()
    .url("Invalid LinkedIn URL")
    .or(z.literal(""))
    .optional(),
  githubUrl: z.string().url("Invalid GitHub URL").or(z.literal("")).optional(),
  xUrl: z.string().url("Invalid X URL").or(z.literal("")).optional(),
});
