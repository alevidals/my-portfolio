import { getUserOauthToken } from "@/lib/clerk";
import { env } from "@/lib/env";
import {
  getRepositoriesOutputSchema,
  getRepositoriesQuerySchema,
  getRepositoryLanguagesOutputSchema,
  getRepositoryLanguagesParamsSchema,
} from "@/lib/schema/fetch";
import { createFetch, createSchema } from "@better-fetch/fetch";

const schema = createSchema({
  "@get/user/repos": {
    query: getRepositoriesQuerySchema,
    output: getRepositoriesOutputSchema,
  },
  "@get/repos/:user/:repository/languages": {
    params: getRepositoryLanguagesParamsSchema,
    output: getRepositoryLanguagesOutputSchema,
  },
});

export const $fetch = createFetch({
  baseURL: env.GITHUB_API_BASE_URL,
  schema,
  auth: {
    type: "Bearer",
    token: async () => await getUserOauthToken(),
  },
});
