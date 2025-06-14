import { ResponsiveAddDialog } from "@/features/dashboard/components/responsive-add-dialog";
import { ResponsiveDeleteDialog } from "@/features/dashboard/components/responsive-delete-dialog";
import { AddWorkExperienceForm } from "@/features/dashboard/work-experiences/components/add-work-experience-form";
import { deleteWorkExperience } from "@/features/dashboard/work-experiences/lib/actions";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import type { getUserWorkExperiences } from "@/shared/lib/queries";
import { IconDots } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

type Props = {
  workExperience: Awaited<ReturnType<typeof getUserWorkExperiences>>[number];
};

export function WorkExperienceActionsDropdown({ workExperience }: Props) {
  const t = useTranslations("workExperiences");

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
        itemId={workExperience.id}
        description={t("dropdown.deleteWarning")}
        itemName={workExperience.companyName}
        itemFormName="workExperienceId"
        action={deleteWorkExperience}
      />
      <ResponsiveAddDialog
        title={t("editDialog.title")}
        description={t("editDialog.description")}
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
