import {
  insertProject,
  updateProject,
} from "@/app/dashboard/projects/_lib/actions";
import type { getUserProjects } from "@/app/dashboard/projects/_lib/queries";
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
import {
  type Dispatch,
  type SetStateAction,
  useActionState,
  useState,
} from "react";
import { toast } from "sonner";

type Props =
  | {
      project: Awaited<ReturnType<typeof getUserProjects>>[number];
      externalIsOpen: boolean;
      externalSetIsOpen: Dispatch<SetStateAction<boolean>>;
    }
  | {
      project?: never;
      externalIsOpen?: never;
      externalSetIsOpen?: never;
    };

export function AddProjectDialog({
  project,
  externalIsOpen,
  externalSetIsOpen,
}: Props) {
  const [isOpen, setIsOpen] = project
    ? [externalIsOpen, externalSetIsOpen]
    : useState(false);

  const [state, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      const action = project ? updateProject : insertProject;

      const response = await action(_, formData);

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

  const title = project ? "Edit Project" : "Add New Project";
  const description = project
    ? "Edit your project details here."
    : "Add your new project details here.";
  const buttonText = project ? "Edit Project" : "Add Project";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {!project && (
        <DialogTrigger asChild>
          <Button onClick={() => setIsOpen(true)}>
            <IconPlus />
            <span>Add New Project</span>
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="p-0 [&>button]:hidden gap-0">
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
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="px-6 py-3">
          <form className="grid gap-4" id="project-form" action={formAction}>
            <FormItem
              id="name"
              name="name"
              itemType="input"
              type="text"
              required
              labelChildren="Project Name"
              placeholder="Project Name"
              defaultValue={state?.data?.name ?? project?.name}
              error={state?.errors?.name ?? ""}
            />
            <FormItem
              id="description"
              name="description"
              itemType="textarea"
              labelChildren="Description"
              placeholder="Project Description"
              defaultValue={
                state?.data?.description ?? project?.description ?? ""
              }
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
              defaultValue={
                state?.data?.technologies ?? project?.technologies.join(",")
              }
              error={state?.errors?.technologies ?? ""}
            />
            <FormItem
              id="deploymentUrl"
              name="deploymentUrl"
              itemType="input"
              type="url"
              labelChildren="Deployment URL"
              placeholder="https://your-project.com"
              defaultValue={
                state?.data?.deploymentUrl ?? project?.deploymentUrl ?? ""
              }
              error={state?.errors?.deploymentUrl ?? ""}
            />
            <FormItem
              id="repositoryUrl"
              name="repositoryUrl"
              itemType="input"
              type="url"
              labelChildren="Repository URL"
              placeholder="https://wwww.github.com/your-project"
              defaultValue={
                state?.data?.repositoryUrl ?? project?.repositoryUrl ?? ""
              }
              error={state?.errors?.repositoryUrl ?? ""}
            />
            {project && <input type="hidden" name="id" value={project.id} />}
          </form>
        </div>
        <DialogFooter className="px-6 py-3">
          <LoadingButton
            isLoading={isPending}
            type="submit"
            form="project-form"
          >
            {buttonText}
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
