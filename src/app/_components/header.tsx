import { HeaderLink } from "@/app/_components/header-link";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { IconBrandGithub, IconFileCv } from "@tabler/icons-react";
import Link from "next/link";

export async function Header() {
  const { userId } = await auth();

  return (
    <header className="container mx-auto h-20 flex items-center justify-between">
      <Link href="/" className="font-bold text-xl flex items-center gap-2">
        <span>MyPortfolio</span>
        <IconFileCv />
      </Link>
      {!userId ? (
        <SignedOut>
          <SignInButton mode="modal">
            <Button>
              <span>Sign in with Github</span>
              <IconBrandGithub className="ml-1 size-5" />
            </Button>
          </SignInButton>
        </SignedOut>
      ) : (
        <div className="flex items-center gap-10">
          <SignedIn>
            <nav className="flex gap-4 font-bold">
              <HeaderLink href="/dashboard" label="/dashboard" />
              <HeaderLink
                href="/dashboard/profile"
                label="/dashboard/profile"
              />
              <HeaderLink
                href="/dashboard/projects"
                label="/dashboard/projects"
              />
            </nav>
            <UserButton />
          </SignedIn>
        </div>
      )}
    </header>
  );
}
