import { ResponsiveAddDialog } from "@/features/dashboard/components/responsive-add-dialog";
import { ResponsiveDeleteDialog } from "@/features/dashboard/components/responsive-delete-dialog";
import { AddProjectForm } from "@/features/dashboard/projects/components/add-project-form";
import { deleteProject } from "@/features/dashboard/projects/lib/actions";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import type { getUserProjects } from "@/shared/lib/queries";
import { IconDots } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

type Props = {
  project: Awaited<ReturnType<typeof getUserProjects>>[number];
};

export function ProjectActionsDropdown({ project }: Props) {
  const t = useTranslations("projects");

  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <IconDots />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-neutral-950">
          <DropdownMenuLabel className="font-bold">
            {t("dropdown.label")}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsOpenEdit(true)}>
            {t("dropdown.edit")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpenDelete(true)}>
            {t("dropdown.delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ResponsiveDeleteDialog
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        description={t("dropdown.deleteWarning")}
        itemId={project.id}
        itemName={project.name}
        itemFormName="projectId"
        action={deleteProject}
      />
      <ResponsiveAddDialog
        title={t("editDialog.title")}
        description={t("editDialog.description")}
        type="update"
        externalIsOpen={isOpenEdit}
        externalSetIsOpen={setIsOpenEdit}
      >
        {({ setIsOpen }) => (
          <AddProjectForm project={project} setIsOpen={setIsOpen} />
        )}
      </ResponsiveAddDialog>
    </>
  );
}
