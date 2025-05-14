import {
  getRepositoriesResponseSchema,
  getRepositoryLanguagesResponseSchema,
} from "@/lib/schema/github";
import { z } from "zod";

export const getRepositoriesQuerySchema = z.object({
  type: z.enum(["owner", "public", "private"]),
  per_page: z.number().default(100),
  page: z.number().default(1),
});

export const getRepositoriesOutputSchema = getRepositoriesResponseSchema;

export const getRepositoryLanguagesParamsSchema = z.object({
  user: z.string(),
  repository: z.string(),
});

export const getRepositoryLanguagesOutputSchema =
  getRepositoryLanguagesResponseSchema;
