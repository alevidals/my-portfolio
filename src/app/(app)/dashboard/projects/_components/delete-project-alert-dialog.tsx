import { deleteProject } from "@/app/(app)//dashboard/projects/_lib/actions";
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
  projectId: string;
  projectName: string;
};

export function DeleteProjectAlertDialog({
  isOpen,
  setIsOpen,
  projectId,
  projectName,
}: Props) {
  const [_, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      const response = await deleteProject(_, formData);

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
            project <strong className="text-destructive">{projectName}</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={formAction}>
            <AlertDialogAction asChild>
              <LoadingButton
                isLoading={isPending}
                name="projectId"
                value={projectId}
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
