"use server";

import { type FormResponse, validateAction } from "@/lib/utils";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

type Login = z.infer<typeof loginSchema>;

export async function login(
  _: unknown,
  formData: FormData,
): Promise<FormResponse<Login>> {
  const validate = validateAction({
    formData,
    schema: loginSchema,
  });

  if (!validate.success) {
    return validate;
  }

  const {
    data: { email, password },
  } = validate;

  // Perform login logic here
  console.log({ email, password });

  return redirect("/");
}

const passwordSchema = z
  .string()
  .min(8, {
    message: "Password must be at least 8 characters",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[0-9]/, {
    message: "Password must contain at least one digit",
  })
  .regex(/[^a-zA-Z0-9]/, {
    message: "Password must contain at least one special character",
  });

const registerSchema = z
  .object({
    name: z.string().min(3, {
      message: "Name must be at least 3 characters",
    }),
    surname: z.string().min(3, {
      message: "Surname must be at least 3 characters",
    }),
    email: z.string().email({
      message: "Invalid email address",
    }),
    username: z.string().min(3, {
      message: "Username must be at least 3 characters",
    }),
    password: passwordSchema,
    passwordConfirmation: passwordSchema,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

type Register = z.infer<typeof registerSchema>;

export async function register(
  _: unknown,
  formData: FormData,
): Promise<FormResponse<Register>> {
  const validate = validateAction({
    formData,
    schema: registerSchema,
  });

  if (!validate.success) {
    return validate;
  }

  const {
    data: { name, surname, email, username, password },
  } = validate;

  // Perform registration logic here
  console.log({ name, surname, email, username, password });

  return redirect("/");
}
