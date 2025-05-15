import { z } from "zod";

export const insertProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  deploymentUrl: z.string().optional(),
  repositoryUrl: z.string().optional(),
  technologies: z.string().optional(),
});
