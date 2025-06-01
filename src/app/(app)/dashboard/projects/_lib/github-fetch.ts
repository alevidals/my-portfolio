import {
  getRepositoriesQuerySchema,
  getRepositoriesResponseSchema,
  getRepositoryLanguagesParamsSchema,
  getRepositoryLanguagesResponseSchema,
  getUserResponseSchema,
} from "@/app/(app)//dashboard/projects/_lib/schema";
import { getGithubAccessToken } from "@/lib/auth";
import { env } from "@/lib/env";
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
