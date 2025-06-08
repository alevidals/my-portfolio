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
import { useState } from "react";

type Props = {
  project: Awaited<ReturnType<typeof getUserProjects>>[number];
};

export function ProjectActionsDropdown({ project }: Props) {
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
          <DropdownMenuLabel className="font-bold">Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsOpenEdit(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpenDelete(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ResponsiveDeleteDialog
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        description="This action cannot be undone. This will permanently delete the project"
        itemId={project.id}
        itemName={project.name}
        itemFormName="projectId"
        action={deleteProject}
      />
      <ResponsiveAddDialog
        title="Edit Project"
        description="Edit your project"
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
