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

export const updateProjectSchema = insertProjectSchema.extend({
  id: z.string().uuid("Invalid project ID"),
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

export const getUserResponseSchema = z.object({
  login: z.string(),
  id: z.number(),
  user_view_type: z.string(),
  node_id: z.string(),
  avatar_url: z.string().url(),
  gravatar_id: z.string().nullable(),
  url: z.string().url(),
  html_url: z.string().url(),
  followers_url: z.string().url(),
  following_url: z.string(),
  gists_url: z.string(),
  starred_url: z.string(),
  subscriptions_url: z.string().url(),
  organizations_url: z.string().url(),
  repos_url: z.string().url(),
  events_url: z.string(),
  received_events_url: z.string().url(),
  type: z.string(),
  site_admin: z.boolean(),
  name: z.string().nullable(),
  company: z.string().nullable(),
  blog: z.string().nullable(),
  location: z.string().nullable(),
  email: z.string().email().nullable(),
  notification_email: z.string().email().nullable(),
  hireable: z.boolean().nullable(),
  bio: z.string().nullable(),
  twitter_username: z.string().nullable(),
  public_repos: z.number(),
  public_gists: z.number(),
  followers: z.number(),
  following: z.number(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  private_gists: z.number(),
  total_private_repos: z.number(),
  owned_private_repos: z.number(),
  disk_usage: z.number(),
  collaborators: z.number(),
  two_factor_authentication: z.boolean(),
  plan: z.object({
    name: z.string(),
    space: z.number(),
    private_repos: z.number(),
    collaborators: z.number(),
  }),
  business_plus: z.boolean().optional(),
  ldap_dn: z.string().optional(),
});

// -- FETCH --
