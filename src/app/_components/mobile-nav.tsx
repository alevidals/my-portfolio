import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { UserButton } from "@clerk/nextjs";
import { DialogDescription } from "@radix-ui/react-dialog";
import { IconMenu } from "@tabler/icons-react";
import Link from "next/link";

type Props = {
  slug?: string;
};

export function MobileNav({ slug }: Props) {
  return (
    <Drawer>
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
          <Link href="/dashboard">/dashboard</Link>
          <Link href={`/view/${slug}`}>/portfolio</Link>
          <UserButton
            appearance={{
              elements: {
                userButtonPopoverCard: {
                  pointerEvents: "initial",
                },
              },
            }}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
