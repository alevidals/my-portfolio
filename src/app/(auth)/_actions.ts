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
