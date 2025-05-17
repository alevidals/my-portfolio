import { deleteEducation } from "@/app/dashboard/educations/_lib/actions";
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
  educationId: string;
  institution: string;
  degree: string;
};

export function DeleteEducationAlertDialog({
  isOpen,
  setIsOpen,
  educationId,
  institution,
  degree,
}: Props) {
  const [_, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      const response = await deleteEducation(_, formData);

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
            This action cannot be undone. This will permanently delete the
            education{" "}
            <strong className="text-destructive">
              {institution} - {degree}
            </strong>
            .
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={formAction}>
            <AlertDialogAction asChild>
              <LoadingButton
                isLoading={isPending}
                name="educationId"
                value={educationId}
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
