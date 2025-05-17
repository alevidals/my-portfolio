import { AddWorkExperienceDialog } from "@/app/(app)//dashboard/work-experiences/_components/add-work-experience-dialog";
import { DeleteWorkExperienceAlertDialog } from "@/app/(app)//dashboard/work-experiences/_components/delete-work-experience-alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { getUserWorkExperiences } from "@/lib/queries";
import { IconDots } from "@tabler/icons-react";
import { useState } from "react";

type Props = {
  workExperience: Awaited<ReturnType<typeof getUserWorkExperiences>>[number];
};

export function WorkExperienceActionsDropdown({ workExperience }: Props) {
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
      <DeleteWorkExperienceAlertDialog
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        workExperienceId={workExperience.id}
        companyName={workExperience.companyName}
      />
      <AddWorkExperienceDialog
        workExperience={workExperience}
        externalIsOpen={isOpenEdit}
        externalSetIsOpen={setIsOpenEdit}
      />
    </>
  );
}
