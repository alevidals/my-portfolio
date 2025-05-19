import { AddEducationDialog } from "@/app/(app)//dashboard/educations/_components/add-education-dialog";
import { ResponsiveDeleteDialog } from "@/app/(app)/dashboard/_components/responsive-delete-dialog";
import { deleteEducation } from "@/app/(app)/dashboard/educations/_lib/actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { getUserEducations } from "@/lib/queries";
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

      <AddEducationDialog
        education={education}
        externalIsOpen={isOpenEdit}
        externalSetIsOpen={setIsOpenEdit}
      />
    </>
  );
}
