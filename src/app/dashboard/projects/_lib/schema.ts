import { z } from "zod";

// -- ACTIONS --

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

export const deleteProjectSchema = z.object({
  projectId: z.string().uuid("Invalid project ID"),
});

// -- ACTIONS --

// -- FETCH --

export const getRepositoriesResponseSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    html_url: z.string(),
    description: z.string().nullable(),
    homepage: z.string().nullable(),
    stargazers_count: z.number(),
    languages: z.array(z.string()).optional(),
    owner: z.object({
      login: z.string(),
    }),
  }),
);

export const getRepositoryLanguagesResponseSchema = z.record(z.number());

export const getRepositoriesQuerySchema = z.object({
  type: z.enum(["owner", "public", "private"]),
  per_page: z.number().default(100),
  page: z.number().default(1),
});

export const getRepositoryLanguagesParamsSchema = z.object({
  user: z.string(),
  repository: z.string(),
});

// -- FETCH --
