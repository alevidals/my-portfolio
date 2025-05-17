import {
  insertProject,
  updateProject,
} from "@/app/(app)//dashboard/projects/_lib/actions";
import type { getUserProjects } from "@/app/(app)//dashboard/projects/_lib/queries";
import { FormItem } from "@/components/form-item";
import { LoadingButton } from "@/components/loading-button";
import { type Dispatch, type SetStateAction, useActionState } from "react";
import { toast } from "sonner";

type Props = {
  project?: Awaited<ReturnType<typeof getUserProjects>>[number];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function AddProjectForm({ project, setIsOpen }: Props) {
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

  const buttonText = project ? "Edit Project" : "Add Project";

  return (
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
        defaultValue={state?.data?.description ?? project?.description ?? ""}
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

      <LoadingButton
        className="justify-self-end"
        isLoading={isPending}
        type="submit"
        form="project-form"
      >
        {buttonText}
      </LoadingButton>
    </form>
  );
}
