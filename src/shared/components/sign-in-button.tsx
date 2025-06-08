"use client";

import { Button } from "@/shared/components/ui/button";
import { signInWithGithub } from "@/shared/lib/auth-client";

type Props = {
  children: React.ReactNode;
};

export function SignInButton({ children }: Props) {
  async function handleSignIn() {
    await signInWithGithub();
  }

  return (
    <Button variant="secondary" size="lg" onClick={handleSignIn}>
      {children}
    </Button>
  );
}
