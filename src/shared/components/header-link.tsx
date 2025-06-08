"use client";

import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes } from "react";

type Props = {
  href: string;
  label: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
};

export function HeaderLink({ href, label, target }: Props) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      target={target}
      className={cn("hover:underline-offset-4 transition-all", {
        "underline underline-offset-8": isActive,
        "hover:underline hover:underline-offset-8": !isActive,
      })}
    >
      {label}
    </Link>
  );
}
