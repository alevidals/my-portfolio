"use client";

import { Button } from "@/shared/components/ui/button";
import { DialogTitle } from "@/shared/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { DialogDescription } from "@radix-ui/react-dialog";
import { IconMenu } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

type Props = {
  slug?: string;
};

export function MobileNav({ slug }: Props) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("header");

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <IconMenu className="size-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-0 max-h-svh">
        <DialogTitle className="sr-only">{t("mobileNav.title")}</DialogTitle>
        <DialogDescription className="sr-only">
          {t("mobileNav.description")}
        </DialogDescription>
        <div className="p-6 flex flex-col gap-4">
          <Link href="/dashboard" onClick={() => setOpen(false)}>
            /dashboard
          </Link>
          <Link
            href={`/portfolio/${slug}`}
            target="_blank"
            onClick={() => setOpen(false)}
          >
            /portfolio
          </Link>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
