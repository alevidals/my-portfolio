"use client";

import { signOut } from "@/app/(auth)/_actions";
import { Button } from "@/components/ui/button";
import { useUser } from "@/providers/user-provider";
import { ArrowRight, LogOut } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function Home() {
  const { userPromise } = useUser();
  const user = use(userPromise);

  async function handleSignOut() {
    await signOut();
  }

  return (
    <main className="min-h-dvh flex items-center justify-center">
      <section className="flex flex-col items-center">
        <h1 className="text-5xl font-bold">MyPortfolio</h1>
        <h2 className="text-3xl font-medium">Coming soon...</h2>
        {user ? (
          <>
            <p className="text-xl mt-4">Welcome, {user.username}!</p>
            <div className="flex gap-4 mt-4">
              <Button asChild variant="link">
                <Link href="/dashboard">
                  <span>Dashboard</span>
                  <ArrowRight />
                </Link>
              </Button>
              <form action={handleSignOut}>
                <Button variant="link">
                  <span>Sign Out</span>
                  <LogOut />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex gap-4 mt-4">
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}
