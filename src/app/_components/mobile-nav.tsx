"use client";

import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { DialogDescription } from "@radix-ui/react-dialog";
import { IconMenu } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
  slug?: string;
};

export function MobileNav({ slug }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <IconMenu className="size-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-0 max-h-svh">
        <DialogTitle className="sr-only">Mobile Navigation</DialogTitle>
        <DialogDescription className="sr-only">
          This modal shows the mobile navigation links.
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
