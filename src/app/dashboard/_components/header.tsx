"use client";

import { signOut } from "@/app/(auth)/_actions";
import { Button } from "@/components/ui/button";
import { useUser } from "@/providers/user-provider";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export function Header() {
  const { userPromise } = useUser();
  const user = use(userPromise);

  async function handleSignOut() {
    await signOut();
  }

  return (
    <header className="container mx-auto">
      <div className="h-12 flex items-center justify-between">
        <Link href="/">
          <h1 className="text-xl font-bold">MyPortfolio</h1>
        </Link>
        <form action={handleSignOut}>
          <Button className="rounded-full font-bold">
            <LogOut />
            <span>Sign out</span>
          </Button>
        </form>
      </div>
    </header>
  );
}
