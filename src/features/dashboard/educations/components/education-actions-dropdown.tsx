import { ResponsiveAddDialog } from "@/features/dashboard/components/responsive-add-dialog";
import { ResponsiveDeleteDialog } from "@/features/dashboard/components/responsive-delete-dialog";
import { AddEducationForm } from "@/features/dashboard/educations/components/add-education-form";
import { deleteEducation } from "@/features/dashboard/educations/lib/actions";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import type { getUserEducations } from "@/shared/lib/queries";
import { IconDots } from "@tabler/icons-react";
import { useState } from "react";

type Props = {
  education: Awaited<ReturnType<typeof getUserEducations>>[number];
};

export function EducationActionsDropdown({ education }: Props) {
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
        description="This action cannot be undone. This will permanently delete the education"
        itemId={education.id}
        itemName={`${education.institution} - ${education.degree}`}
        itemFormName="educationId"
        action={deleteEducation}
      />

      <ResponsiveAddDialog
        title="Edit Education"
        description="Edit your education"
        type="update"
        externalIsOpen={isOpenEdit}
        externalSetIsOpen={setIsOpenEdit}
      >
        {({ setIsOpen }) => (
          <AddEducationForm education={education} setIsOpen={setIsOpen} />
        )}
      </ResponsiveAddDialog>
    </>
  );
}
