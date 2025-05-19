import { getProfileSlug } from "@/app/(app)/dashboard/_lib/queries";
import { DesktopNav } from "@/app/_components/desktop-nav";
import { MobileNav } from "@/app/_components/mobile-nav";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";

export async function Header() {
  const { userId } = await auth();
  const slug = await getProfileSlug();

  return (
    <header
      className="sticky top-0 z-50 px-4 
   backdrop-blur-md backdrop-saturate-150"
    >
      <div className="container mx-auto h-20 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl flex items-center gap-2">
          <span>MyPortfolio</span>
        </Link>
        {!userId ? (
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="secondary" size="lg">
                <span>
                  Sign in <span className="hidden md:inline">with Github</span>
                </span>
                <IconBrandGithub className="ml-1 size-5" />
              </Button>
            </SignInButton>
          </SignedOut>
        ) : (
          <SignedIn>
            <div className="flex items-center gap-4 md:gap-10 flex-row-reverse md:flex-row">
              <DesktopNav slug={slug} />
              <MobileNav slug={slug} />
              <UserButton />
            </div>
          </SignedIn>
        )}
      </div>
    </header>
  );
}
