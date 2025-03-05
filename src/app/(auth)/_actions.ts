"use server";

import { redirect } from "next/navigation";

// TODO: do not use any
export async function login(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);

  return redirect("/");
}
