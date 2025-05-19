import { AddProjectDialog } from "@/app/(app)//dashboard/projects/_components/add-project-dialog";
import { ResponsiveDeleteDialog } from "@/app/(app)/dashboard/_components/responsive-delete-dialog";
import { deleteProject } from "@/app/(app)/dashboard/projects/_lib/actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { getUserProjects } from "@/lib/queries";
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
      <AddProjectDialog
        project={project}
        externalIsOpen={isOpenEdit}
        externalSetIsOpen={setIsOpenEdit}
      />
    </>
  );
}
