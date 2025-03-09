import { getUser } from "@/lib/db/queries/users";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default async function DashboardLayout({ children }: Props) {
  const user = await getUser();

  if (!user) {
    redirect("/login?redirectTo=/dashboard");
  }

  return <div>{children}</div>;
}
