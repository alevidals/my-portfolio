import { env } from "@/shared/lib/env";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/shared/lib/db/drizzle";
import * as schema from "@/shared/lib/db/schema";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      ...schema,
      users: schema.usersSchema,
      accounts: schema.accountsSchema,
      sessions: schema.sessionsSchema,
      verifications: schema.verificationsSchema,
    },
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [nextCookies()],
});

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
}

export async function getGithubAccessToken() {
  // TODO: use this function when better-auth fix it with github provider: https://github.com/better-auth/better-auth/issues/2701
  //const data = await auth.api.getAccessToken({
  //   provider: "github",
  //   headers: await headers(),
  //});

  const session = await getSession();
  if (!session) redirect("/");

  const data = await db.query.accountsSchema.findFirst({
    columns: {
      accessToken: true,
    },
    where: (accounts, { eq }) =>
      eq(accounts.providerId, "github") && eq(accounts.userId, session.user.id),
  });

  if (!data) redirect("/");

  return data.accessToken as string;
}
