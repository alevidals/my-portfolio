"use client";

import { register } from "@/app/(auth)/_actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);
  const [state, action, pending] = useActionState(register, null);

  return (
    <div className="min-h-dvh p-6 grid grid-cols-2">
      <section className="p-28 flex flex-col justify-center">
        <h1 className="text-6xl font-medium">Create an account</h1>
        <p className="text-muted-foreground font-light mt-4 mb-8">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary underline underline-offset-2"
          >
            Login
          </Link>
        </p>
        {!state?.success && state?.message && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}
        <form action={action}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                type="text"
                name="name"
                placeholder="Name"
                autoComplete="name"
                required
                className="h-14"
                defaultValue={state?.data?.name}
              />
              {state?.errors?.name && (
                <p className="text-red-500 text-sm mt-1">
                  {state?.errors?.name}
                </p>
              )}
            </div>
            <div>
              <Input
                type="text"
                name="surname"
                placeholder="Surname"
                autoComplete="surname"
                required
                className="h-14"
                defaultValue={state?.data?.surname}
              />
              {state?.errors?.surname && (
                <p className="text-red-500 text-sm mt-1">
                  {state?.errors?.surname}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="email"
                required
                className="h-14"
                defaultValue={state?.data?.email}
              />
              {state?.errors?.email && (
                <p className="text-red-500 text-sm mt-1">
                  {state?.errors?.email}
                </p>
              )}
            </div>
            <div>
              <Input
                type="text"
                name="username"
                placeholder="Username"
                autoComplete="username"
                required
                className="h-14"
                defaultValue={state?.data?.username}
              />
              {state?.errors?.username && (
                <p className="text-red-500 text-sm mt-1">
                  {state?.errors?.username}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
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
              {state?.errors?.password && (
                <p className="text-red-500 text-sm mt-1">
                  {state?.errors?.password}
                </p>
              )}
            </div>
            <div>
              <div className="relative">
                <Input
                  type={showConfirmationPassword ? "text" : "password"}
                  name="passwordConfirmation"
                  placeholder="Confirm your password"
                  autoComplete="current-password"
                  required
                  className="h-14 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() =>
                    setShowConfirmationPassword(!showConfirmationPassword)
                  }
                  aria-label={
                    showConfirmationPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmationPassword ? (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {state?.errors?.passwordConfirmation && (
                <p className="text-red-500 text-sm mt-1">
                  {state?.errors?.passwordConfirmation}
                </p>
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="mt-8 h-14 w-full text-base"
            disabled={pending}
          >
            {pending ? <Loader2 className="animate-spin" /> : "Register"}
          </Button>
        </form>
      </section>
      <section className="bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-900 rounded-2xl" />
    </div>
  );
}
