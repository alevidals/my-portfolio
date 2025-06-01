"use client";

import type { getUserAccountData } from "@/app/portfolio/[username]/_lib/queries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

type Props = {
  userData: Awaited<ReturnType<typeof getUserAccountData> | undefined>;
};

export function ProfileButton({ userData }: Props) {
  const router = useRouter();

  const initals = userData?.name
    ? userData.name
        .split(" ")
        .map((name) => name.charAt(0).toUpperCase())
        .join("")
    : "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={userData?.imageUrl ?? ""} />
          <AvatarFallback>{initals}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ router })}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
