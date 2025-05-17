import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getClerkClient() {
  const client = await clerkClient();

  return client;
}

export async function getUserOauthToken() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const client = await getClerkClient();

  const { data } = await client.users.getUserOauthAccessToken(userId, "github");

  if (data.length === 0) return redirectToSignIn();

  return data[0].token;
}
