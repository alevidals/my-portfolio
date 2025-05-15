import { insertProject } from "@/app/dashboard/projects/_actions";
import { FormItem } from "@/components/form-item";
import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useActionState, useState } from "react";
import { toast } from "sonner";

export function AddProjectDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const [state, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      const response = await insertProject(_, formData);

      if (response.success) {
        setIsOpen(false);
        toast.success(response.message);
        return null;
      }

      toast.error(response.error);

      return response;
    },
    null,
  );

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <IconPlus />
          <span>New Project</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 [&>button]:hidden gap-0">
        <DialogHeader className="border-b px-6 py-3">
          <DialogTitle className="flex items-center justify-between">
            <span>Add New Project</span>
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
          <DialogDescription className="sr-only">
            Add your new project details here.
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 py-3">
          <form
            className="grid gap-4"
            id="add-project-form"
            action={formAction}
          >
            <FormItem
              id="name"
              name="name"
              itemType="input"
              type="text"
              required
              labelChildren="Project Name"
              placeholder="Project Name"
              defaultValue={state?.name ?? ""}
              error={state?.errors?.name ?? ""}
            />
            <FormItem
              id="description"
              name="description"
              itemType="textarea"
              labelChildren="Description"
              placeholder="Project Description"
              defaultValue={state?.description ?? ""}
              error={state?.errors?.description ?? ""}
            />
            <FormItem
              id="techonologies"
              name="technologies"
              itemType="input"
              type="text"
              labelChildren="Techonologies"
              helperText="Comma separated list of techonologies"
              placeholder="JavaScript,TypeScript,etc."
              defaultValue={state?.technologies ?? ""}
              error={state?.errors?.technologies ?? ""}
            />
            <FormItem
              id="deploymentUrl"
              name="deploymentUrl"
              itemType="input"
              type="url"
              labelChildren="Deployment URL"
              placeholder="https://your-project.com"
              defaultValue={state?.deploymentUrl ?? ""}
              error={state?.errors?.deploymentUrl ?? ""}
            />
            <FormItem
              id="repositoryUrl"
              name="repositoryUrl"
              itemType="input"
              type="url"
              labelChildren="Repository URL"
              placeholder="https://wwww.github.com/your-project"
              defaultValue={state?.repositoryUrl ?? ""}
              error={state?.errors?.repositoryUrl ?? ""}
            />
          </form>
        </div>
        <DialogFooter className="px-6 py-3">
          <LoadingButton
            isLoading={isPending}
            type="submit"
            form="add-project-form"
          >
            Add Project
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
