import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaQuery } from "@/hooks/use-media-query";
import { IconPlus, IconX } from "@tabler/icons-react";
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useState,
} from "react";

type Props = {
  title: string;
  description: string;
  children: (helpers: {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
  }) => ReactNode;
} & (
  | {
      type: "add";
      externalIsOpen?: never;
      externalSetIsOpen?: never;
    }
  | {
      type: "update";
      externalIsOpen: boolean;
      externalSetIsOpen: Dispatch<SetStateAction<boolean>>;
    }
);

export function ResponsiveAddDialog({
  title,
  description,
  externalIsOpen,
  externalSetIsOpen,
  type,
  children,
}: Props) {
  const [isOpen, setIsOpen] =
    type === "update" ? [externalIsOpen, externalSetIsOpen] : useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {type === "add" && (
          <DialogTrigger asChild>
            <Button onClick={() => setIsOpen(true)}>
              <IconPlus />
              <span className="hidden md:flex">{title}</span>
            </Button>
          </DialogTrigger>
        )}
        <DialogContent className="p-0 [&>button]:hidden gap-0 max-h-3/4 flex flex-col">
          <DialogHeader className="border-b px-6 py-3">
            <DialogTitle className="flex items-center justify-between">
              <span>{title}</span>
              <DialogClose asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                >
                  <IconX />
                </Button>
              </DialogClose>
            </DialogTitle>
            <DialogDescription className="text-left">
              {description}
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 py-3 overflow-y-auto">
            <ScrollArea>{children({ setIsOpen })}</ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        {type === "add" && (
          <Button onClick={() => setIsOpen(true)}>
            <IconPlus />
            <span className="hidden md:flex">{title}</span>
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <ScrollArea className="overflow-y-auto">
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="px-4">{children({ setIsOpen })}</div>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
