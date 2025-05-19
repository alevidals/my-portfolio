import { LoadingButton } from "@/components/loading-button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { ActionResponse } from "@/lib/types";
import { type Dispatch, type SetStateAction, useActionState } from "react";
import { toast } from "sonner";

type Props<T> = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  description: string;
  itemId: string;
  itemName: string;
  itemFormName: string;
  action: (_: unknown, formData: FormData) => Promise<ActionResponse<T>>;
};

export function ResponsiveDeleteDialog<T>({
  isOpen,
  setIsOpen,
  title,
  description,
  itemId,
  itemName,
  itemFormName,
  action,
}: Props<T>) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [_, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      const response = await action(_, formData);

      if (response.success) {
        setIsOpen(false);
        toast.success(response.message);
        return null;
      }

      toast.error(response.error);
      return null;
    },
    null,
  );

  if (isDesktop) {
    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {title ?? "Are you absolutely sure to delete?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {description}{" "}
              <strong className="text-destructive">{itemName}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <form action={formAction}>
              <AlertDialogAction asChild>
                <LoadingButton
                  isLoading={isPending}
                  name={itemFormName}
                  value={itemId}
                  type="submit"
                  className="w-full md:w-fit"
                >
                  Continue
                </LoadingButton>
              </AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>
            {description}{" "}
            <strong className="text-destructive">{itemName}</strong>.
          </DrawerDescription>
        </DrawerHeader>
        <form action={formAction} className="px-4">
          <LoadingButton
            isLoading={isPending}
            name={itemFormName}
            value={itemId}
            type="submit"
            className="w-full md:w-fit"
          >
            Continue
          </LoadingButton>
        </form>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
