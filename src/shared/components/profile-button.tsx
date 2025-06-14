"use client";

import type { getUserAccountData } from "@/features/portfolio/lib/queries";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { signOut } from "@/shared/lib/auth-client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

type Props = {
  userData: Awaited<ReturnType<typeof getUserAccountData> | undefined>;
};

export function ProfileButton({ userData }: Props) {
  const router = useRouter();
  const t = useTranslations("header");

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
        <DropdownMenuLabel>{t("profileMenu.label")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ router })}>
          {t("profileMenu.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
