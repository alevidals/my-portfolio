import { z } from "zod";

export const insertUserProfileSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(50, "Slug must be less than 50 characters")
    .regex(/^[a-zA-Z0-9-_]+$/, "Invalid slug format"),
  fullName: z.string().optional(),
  biography: z.string().optional(),
  linkedInUrl: z
    .string()
    .url("Invalid LinkedIn URL")
    .or(z.literal(""))
    .optional(),
  githubUrl: z.string().url("Invalid GitHub URL").or(z.literal("")).optional(),
  xUrl: z.string().url("Invalid X URL").or(z.literal("")).optional(),
});
