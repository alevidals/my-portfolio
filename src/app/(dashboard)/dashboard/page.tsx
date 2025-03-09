"use client";

import { useUser } from "@/providers/user-provider";
import { use } from "react";

export default function DashboardPage() {
  const { userPromise } = useUser();
  const user = use(userPromise);

  return (
    <main>
      <h2 className="text-4xl xl:text-5xl font-medium">Dashboard</h2>
      <p className="text-muted-foreground font-light mt-4 mb-8">
        Welcome back, {user?.surname}! You are now logged in.
      </p>
    </main>
  );
}
