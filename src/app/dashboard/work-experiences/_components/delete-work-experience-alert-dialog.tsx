import { deleteWorkExperience } from "@/app/dashboard/work-experiences/_lib/actions";
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
import { type Dispatch, type SetStateAction, useActionState } from "react";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  workExperienceId: string;
  companyName: string;
};

export function DeleteWorkExperienceAlertDialog({
  isOpen,
  setIsOpen,
  workExperienceId,
  companyName,
}: Props) {
  const [_, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      const response = await deleteWorkExperience(_, formData);

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

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure to delete?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the work
            experience{" "}
            <strong className="text-destructive">{companyName}</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={formAction}>
            <AlertDialogAction asChild>
              <LoadingButton
                isLoading={isPending}
                name="workExperienceId"
                value={workExperienceId}
                type="submit"
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
