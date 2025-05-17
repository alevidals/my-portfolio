import { getProfileSlug } from "@/app/(app)/dashboard/_lib/queries";
import { DesktopNav } from "@/app/_components/desktop-nav";
import { MobileNav } from "@/app/_components/mobile-nav";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { IconBrandGithub, IconFileCv } from "@tabler/icons-react";
import Link from "next/link";

export async function Header() {
  const { userId } = await auth();
  const slug = await getProfileSlug();

  return (
    <header className="container mx-auto h-20 flex items-center justify-between fixed top-0 bg-background">
      <Link href="/" className="font-bold text-xl flex items-center gap-2">
        <span>MyPortfolio</span>
        <IconFileCv />
      </Link>
      {!userId ? (
        <SignedOut>
          <SignInButton mode="modal">
            <Button>
              <span>
                Sign in <span className="hidden md:inline">with Github</span>
              </span>
              <IconBrandGithub className="ml-1 size-5" />
            </Button>
          </SignInButton>
        </SignedOut>
      ) : (
        <SignedIn>
          <DesktopNav slug={slug} />
          <MobileNav slug={slug} />
        </SignedIn>
      )}
    </header>
  );
}
