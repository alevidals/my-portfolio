import {
  getRepositoriesQuerySchema,
  getRepositoriesResponseSchema,
  getRepositoryLanguagesParamsSchema,
  getRepositoryLanguagesResponseSchema,
  getUserResponseSchema,
} from "@/features/dashboard/projects/lib/schema";
import { getGithubAccessToken } from "@/shared/lib/auth";
import { env } from "@/shared/lib/env";
import { createFetch, createSchema } from "@better-fetch/fetch";

const schema = createSchema({
  "@get/user/repos": {
    query: getRepositoriesQuerySchema,
    output: getRepositoriesResponseSchema,
  },
  "@get/repos/:user/:repository/languages": {
    params: getRepositoryLanguagesParamsSchema,
    output: getRepositoryLanguagesResponseSchema,
  },
  "@get/user": {
    output: getUserResponseSchema,
  },
});

export const githubFetch = createFetch({
  baseURL: env.GITHUB_API_BASE_URL,
  schema,
  auth: {
    type: "Bearer",
    token: async () => await getGithubAccessToken(),
  },
});
