import { z } from "zod";

export const insertProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  deploymentUrl: z.string().optional(),
  repositoryUrl: z.string().optional(),
  technologies: z.string().optional(),
});

export const importProjectsSchema = z.array(
  z.object({
    name: z.string().min(1, "Project name is required"),
    description: z.string().optional().nullable(),
    deploymentUrl: z.string().optional().nullable(),
    repositoryUrl: z.string().optional().nullable(),
    technologies: z.array(z.string()).optional(),
  }),
);
