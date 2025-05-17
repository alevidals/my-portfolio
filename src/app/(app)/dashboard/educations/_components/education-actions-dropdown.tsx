import { AddEducationDialog } from "@/app/(app)//dashboard/educations/_components/add-education-dialog";
import { DeleteEducationAlertDialog } from "@/app/(app)//dashboard/educations/_components/delete-education-alert-dialog";
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
      <DeleteEducationAlertDialog
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        educationId={education.id}
        institution={education.institution}
        degree={education.degree}
      />
      <AddEducationDialog
        education={education}
        externalIsOpen={isOpenEdit}
        externalSetIsOpen={setIsOpenEdit}
      />
    </>
  );
}
