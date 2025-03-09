"use server";

import { comparePasswords, hashPassword, setSession } from "@/lib/auth";
import {
  addUser,
  existsUser,
  existsUserWithPassword,
} from "@/lib/db/queries/users";
import { type FormResponse, validateAction } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
  redirectTo: z.string().optional(),
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
    data: { email, password, redirectTo },
  } = validate;

  const user = await existsUserWithPassword({ email });

  if (!user) {
    return {
      success: false,
      errors: {
        email: "User not found",
      },
      data: validate.data,
    };
  }

  const passwordMatch = await comparePasswords({
    password,
    hashedPassword: user.password,
  });

  if (!passwordMatch) {
    return {
      success: false,
      errors: {
        password: "Invalid email or password",
      },
      data: validate.data,
    };
  }

  await setSession({ userId: user.id });

  redirect(redirectTo || "/dashboard");
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
    data: { email, username, password },
  } = validate;

  const existingUser = await existsUser({ email, username });

  if (existingUser) {
    if (existingUser.email === email) {
      return {
        success: false,
        errors: {
          email: "Email already in use",
        },
        data: validate.data,
      };
    }

    if (existingUser.username === username) {
      return {
        success: false,
        errors: {
          username: "Username already in use",
        },
        data: validate.data,
      };
    }
  }

  const hashedPassword = await hashPassword({ password });

  const createdUser = await addUser({
    ...validate.data,
    password: hashedPassword,
  });

  if (!createdUser) {
    return {
      success: false,
      message: "Failed to create user",
      data: validate.data,
    };
  }

  //  TODO: send a confirmation email (resend)

  await setSession({ userId: createdUser.id });

  redirect("/");
}

export async function signOut() {
  (await cookies()).delete("session");
  redirect("/");
}
