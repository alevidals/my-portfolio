import { getProfileSlug } from "@/features/dashboard/lib/queries";
import { getUserAccountData } from "@/features/portfolio/lib/queries";
import { DesktopNav } from "@/shared/components/desktop-nav";
import { MobileNav } from "@/shared/components/mobile-nav";
import { ProfileButton } from "@/shared/components/profile-button";
import { SignInButton } from "@/shared/components/sign-in-button";
import { getSession } from "@/shared/lib/auth";
import { IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";

export async function Header() {
  const session = await getSession();

  const slug = session ? await getProfileSlug() : undefined;
  const userData = session
    ? await getUserAccountData({ userId: session.user.id })
    : undefined;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md backdrop-saturate-150">
      <div className="container mx-auto h-20 flex items-center justify-between px-4">
        <Link href="/" className="font-bold text-xl flex items-center gap-2">
          <span>MyPortfolio</span>
        </Link>
        {session ? (
          <div className="flex items-center gap-4 md:gap-10 flex-row-reverse md:flex-row">
            <DesktopNav slug={slug} />
            <MobileNav slug={slug} />
            <ProfileButton userData={userData} />
          </div>
        ) : (
          <SignInButton>
            <span>
              Sign in <span className="hidden md:inline">with Github</span>
            </span>
            <IconBrandGithub className="ml-1 size-5" />
          </SignInButton>
        )}
      </div>
    </header>
  );
}
