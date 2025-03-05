"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";
import { login } from "@/app/(auth)/_actions";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, action, pending] = useActionState(login, {
    email: "",
  });

  return (
    <div className="min-h-dvh p-6 grid grid-cols-2">
      <section className="bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-900 rounded-2xl" />
      <section className="p-28 flex flex-col justify-center">
        <h1 className="text-6xl font-medium">Create an account</h1>
        <p className="text-muted-foreground font-light mt-4 mb-8">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-primary underline underline-offset-2"
          >
            Register
          </Link>
        </p>
        <form action={action}>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="h-14"
          />
          <div className="relative mt-6">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              required
              className="h-14 pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Eye className="w-4 h-4 text-muted-foreground" />
              )}
            </Button>
          </div>
          <Button
            type="submit"
            className="mt-8 h-14 w-full text-base"
            disabled={pending}
          >
            {pending ? <Loader2 className="animate-spin" /> : "Login"}
          </Button>
        </form>
      </section>
    </div>
  );
}
