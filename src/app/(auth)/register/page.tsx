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
    <div className="min-h-dvh p-6 grid grid-cols-1 lg:grid-cols-2">
      <section className="p-6 md:p-16 flex flex-col justify-center">
        <h1 className="text-2xl md:text-4xl xl:text-5xl font-medium">
          Create an account
        </h1>
        <p className="text-muted-foreground font-light mt-4 mb-8">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary underline underline-offset-2"
            aria-label="Login to your account"
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
          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="Name"
                autoComplete="name"
                required
                className="h-14"
                defaultValue={state?.data?.name}
                aria-describedby="name-error"
              />
              {state?.errors?.name && (
                <p
                  id="name-error"
                  className="text-red-500 text-sm mt-1"
                  role="alert"
                >
                  {state?.errors?.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="surname" className="sr-only">
                Surname
              </label>
              <Input
                id="surname"
                type="text"
                name="surname"
                placeholder="Surname"
                autoComplete="surname"
                required
                className="h-14"
                defaultValue={state?.data?.surname}
                aria-describedby="surname-error"
              />
              {state?.errors?.surname && (
                <p
                  id="surname-error"
                  className="text-red-500 text-sm mt-1"
                  role="alert"
                >
                  {state?.errors?.surname}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 mt-4">
            <div>
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
                aria-describedby="email-error"
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
            </div>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <Input
                type="text"
                name="username"
                placeholder="Username"
                autoComplete="username"
                required
                className="h-14"
                defaultValue={state?.data?.username}
                aria-describedby="username-error"
              />
              {state?.errors?.username && (
                <p
                  id="username-error"
                  className="text-red-500 text-sm mt-1"
                  role="alert"
                >
                  {state?.errors?.username}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 mt-4">
            <div>
              <div className="relative">
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
                  aria-describedby="password-error"
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
                <p
                  id="password-error"
                  className="text-red-500 text-sm mt-1"
                  role="alert"
                >
                  {state?.errors?.password}
                </p>
              )}
            </div>
            <div>
              <div className="relative">
                <label htmlFor="passwordConfirmation" className="sr-only">
                  Confirm your password
                </label>
                <Input
                  id="passwordConfirmation"
                  type={showConfirmationPassword ? "text" : "password"}
                  name="passwordConfirmation"
                  placeholder="Confirm your password"
                  autoComplete="current-password"
                  required
                  className="h-14 pr-10"
                  defaultValue={state?.data?.passwordConfirmation}
                  aria-describedby="password-confirmation-error"
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
              {state?.errors?.passwordConfirmation && (
                <p
                  id="password-confirmation-error"
                  className="text-red-500 text-sm mt-1"
                  role="alert"
                >
                  {state?.errors?.passwordConfirmation}
                </p>
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="mt-8 h-14 w-full text-base"
            disabled={pending}
            aria-label={pending ? "Registering, please wait" : "Register"}
          >
            {pending ? (
              <Loader2 className="animate-spin" aria-hidden="true" />
            ) : (
              "Register"
            )}
          </Button>
        </form>
      </section>
      <section className="hidden lg:flex bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-900 rounded-2xl" />
    </div>
  );
}
