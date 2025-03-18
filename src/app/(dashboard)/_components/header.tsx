"use client";

import { signOut } from "@/app/(auth)/_actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@/providers/user-provider";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, use } from "react";

type LinkButtonProps = {
  href: string;
  label: string;
};

function LinkButton({ href, label }: LinkButtonProps) {
  const pathname = usePathname();

  return (
    <Button
      variant="link"
      className={cn("text-base", {
        underline: pathname.startsWith(href),
      })}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
}

function NavbarLinks() {
  const { userPromise } = useUser();
  const user = use(userPromise);

  async function handleSignOut() {
    await signOut();
  }

  if (!user) {
    return (
      <ul className="flex gap-4">
        <li>
          <Button variant="link" className="text-base">
            <Link href="/login">Login</Link>
          </Button>
        </li>
        <li>
          <Button variant="link" className="text-base">
            <Link href="/register">Register</Link>
          </Button>
        </li>
      </ul>
    );
  }

  return (
    <ul className="flex gap-4">
      <li>
        <LinkButton href="/dashboard" label="Dashboard" />
      </li>
      <li>
        <LinkButton href={`/view/${user.username}`} label="Portfolio" />
      </li>
      <li>
        <form action={handleSignOut}>
          <Button variant="link" className="text-base">
            <span>Sign out</span>
            <LogOut className="ml-1" />
          </Button>
        </form>
      </li>
    </ul>
  );
}

export function Header() {
  return (
    <header className="container mx-auto sticky top-6 bg-background z-50">
      <div className="h-12 flex items-center justify-between">
        <Link href="/">
          <h1 className="text-xl font-bold">MyPortfolio</h1>
        </Link>
        <nav>
          <Suspense>
            <NavbarLinks />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}
