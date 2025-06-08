import { createAuthClient } from "better-auth/react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const authClient = createAuthClient();

export async function signInWithGithub() {
  await authClient.signIn.social({
    provider: "github",
    callbackURL: "/dashboard",
  });
}

type SignOutParams = {
  router: AppRouterInstance;
};

export async function signOut({ router }: SignOutParams) {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        router.refresh();
      },
    },
  });
}
