"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  label: string;
};

export function HeaderLink({ href, label }: Props) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn("hover:underline-offset-4 transition-all", {
        "underline underline-offset-8": isActive,
        "hover:underline hover:underline-offset-8": !isActive,
      })}
    >
      {label}
    </Link>
  );
}
