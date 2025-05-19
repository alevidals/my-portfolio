import { ResponsiveAddDialog } from "@/app/(app)/dashboard/_components/responsive-add-dialog";
import { ResponsiveDeleteDialog } from "@/app/(app)/dashboard/_components/responsive-delete-dialog";
import { AddWorkExperienceForm } from "@/app/(app)/dashboard/work-experiences/_components/add-work-experience-form";
import { deleteWorkExperience } from "@/app/(app)/dashboard/work-experiences/_lib/actions";
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
      <ResponsiveDeleteDialog
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        description="This action cannot be undone. This will permanently delete the work experience"
        itemId={workExperience.id}
        itemName={workExperience.companyName}
        itemFormName="workExperienceId"
        action={deleteWorkExperience}
      />
      <ResponsiveAddDialog
        title="Edit Work Experience"
        description="Edit your work experience"
        type="update"
        externalIsOpen={isOpenEdit}
        externalSetIsOpen={setIsOpenEdit}
      >
        {({ setIsOpen }) => (
          <AddWorkExperienceForm
            workExperience={workExperience}
            setIsOpen={setIsOpen}
          />
        )}
      </ResponsiveAddDialog>
    </>
  );
}
