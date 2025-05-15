import { z } from "zod";

// GET REPOSITORY RESPONSE

const repositoryResponseSchema = z.object({
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
});

export const getRepositoriesResponseSchema = z.array(repositoryResponseSchema);

export type GetRespositoriesResponse = z.infer<
  typeof getRepositoriesResponseSchema
>;

// GET REPOSITORY LANGUAGES RESPONSE

export const getRepositoryLanguagesResponseSchema = z.record(z.number());

export type GetRepositoryLanguagesResponse = z.infer<
  typeof getRepositoryLanguagesResponseSchema
>;

// REPOSITORY

const repository = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  repositoryUrl: z.string(),
  deploymentUrl: z.string().nullable(),
  stars: z.number(),
  technologies: z.array(z.string()).optional(),
  username: z.string(),
});

export type Repository = z.infer<typeof repository>;
