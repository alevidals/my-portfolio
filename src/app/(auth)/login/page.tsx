"use client";

import { login } from "@/app/(auth)/_actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, action, pending] = useActionState(login, null);

  return (
    <div className="min-h-dvh p-6 grid grid-cols-1 lg:grid-cols-2">
      <section className="hidden lg:flex bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-900 rounded-2xl" />
      <section className="p-6 md:p-16 flex flex-col justify-center">
        <h1 className="text-4xl xl:text-5xl font-medium">Welcome back!</h1>
        <p className="text-muted-foreground font-light mt-4 mb-8">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-primary underline underline-offset-2"
            aria-label="Register a new account"
          >
            Register
          </Link>
        </p>
        <form action={action}>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            required
            className="h-14"
            defaultValue={state?.data?.email}
            aria-describedby={state?.errors?.email ? "email-error" : undefined}
          />
          {state?.errors?.email && (
            <p
              id="email-error"
              className="text-red-500 text-sm mt-1"
              role="alert"
            >
              {state?.errors?.email}
            </p>
          )}
          <div className="relative mt-6">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="h-14 pr-10"
              defaultValue={state?.data?.password}
              aria-describedby={
                state?.errors?.password ? "password-error" : undefined
              }
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
                <EyeOff
                  className="w-4 h-4 text-muted-foreground"
                  aria-hidden="true"
                />
              ) : (
                <Eye
                  className="w-4 h-4 text-muted-foreground"
                  aria-hidden="true"
                />
              )}
            </Button>
          </div>
          {state?.errors?.password && (
            <p id="password-error" className="text-red-500 text-sm mt-1">
              {state?.errors?.password}
            </p>
          )}
          <Button
            type="submit"
            className="mt-8 h-14 w-full text-base"
            disabled={pending}
            aria-label={pending ? "Logging in, please wait" : "Login"}
          >
            {pending ? (
              <Loader2 className="animate-spin" aria-hidden="true" />
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </section>
    </div>
  );
}
