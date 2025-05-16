import { AddProjectDialog } from "@/app/dashboard/projects/_components/add-project-dialog";
import { DeleteProjectAlertDialog } from "@/app/dashboard/projects/_components/delete-project-alert-dialog";
import type { getUserProjects } from "@/app/dashboard/projects/_lib/queries";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteProjectAlertDialog
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        projectName={project.name}
        projectId={project.id}
      />
      <AddProjectDialog
        project={project}
        externalIsOpen={isOpenEdit}
        externalSetIsOpen={setIsOpenEdit}
      />
    </>
  );
}
