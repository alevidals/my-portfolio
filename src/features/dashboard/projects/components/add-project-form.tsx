import {
  insertProject,
  updateProject,
} from "@/features/dashboard/projects/lib/actions";
import { FormItem } from "@/shared/components/form-item";
import { LoadingButton } from "@/shared/components/loading-button";
import type { getUserProjects } from "@/shared/lib/queries";
import { useTranslations } from "next-intl";
import { type Dispatch, type SetStateAction, useActionState } from "react";
import { toast } from "sonner";

type Props = {
  project?: Awaited<ReturnType<typeof getUserProjects>>[number];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function AddProjectForm({ project, setIsOpen }: Props) {
  const t = useTranslations("projects");

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

  const buttonText = project ? t("editDialog.title") : t("addDialog.title");

  return (
    <form className="grid gap-4" id="project-form" action={formAction}>
      <FormItem
        id="name"
        name="name"
        itemType="input"
        type="text"
        required
        labelChildren={t("form.name")}
        placeholder={t("form.name")}
        defaultValue={state?.data?.name ?? project?.name}
        error={state?.errors?.name ?? ""}
      />
      <FormItem
        id="description"
        name="description"
        itemType="textarea"
        labelChildren={t("form.description")}
        placeholder={t("form.description")}
        defaultValue={state?.data?.description ?? project?.description ?? ""}
        error={state?.errors?.description ?? ""}
      />
      <FormItem
        id="techonologies"
        name="technologies"
        itemType="input"
        type="text"
        labelChildren={t("form.technologies")}
        helperText={t("form.technologiesHelperText")}
        placeholder="JavaScript, TypeScript, etc."
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
        labelChildren={t("form.deploymentUrl")}
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
        labelChildren={t("form.repositoryUrl")}
        placeholder="https://wwww.github.com/your-project"
        defaultValue={
          state?.data?.repositoryUrl ?? project?.repositoryUrl ?? ""
        }
        error={state?.errors?.repositoryUrl ?? ""}
      />
      {project && <input type="hidden" name="id" value={project.id} />}

      <LoadingButton
        className="justify-self-end w-full md:w-auto"
        isLoading={isPending}
        type="submit"
        form="project-form"
      >
        {buttonText}
      </LoadingButton>
    </form>
  );
}
