import { AddEducationForm } from "@/app/(app)//dashboard/educations/_components/add-education-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { getUserEducations } from "@/lib/queries";
import { IconPlus, IconX } from "@tabler/icons-react";
import { type Dispatch, type SetStateAction, useState } from "react";

type Props =
  | {
      education: Awaited<ReturnType<typeof getUserEducations>>[number];
      externalIsOpen: boolean;
      externalSetIsOpen: Dispatch<SetStateAction<boolean>>;
    }
  | {
      education?: never;
      externalIsOpen?: never;
      externalSetIsOpen?: never;
    };

export function AddEducationDialog({
  education,
  externalIsOpen,
  externalSetIsOpen,
}: Props) {
  const [isOpen, setIsOpen] = education
    ? [externalIsOpen, externalSetIsOpen]
    : useState(false);

  const title = education ? "Edit Education" : "Add New Education";
  const description = education
    ? "Edit your education details here."
    : "Add your education details here.";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {!education && (
        <DialogTrigger asChild>
          <Button onClick={() => setIsOpen(true)}>
            <IconPlus />
            <span className="hidden md:flex">Add New Education</span>
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="p-0 [&>button]:hidden gap-0">
        <DialogHeader className="border-b px-6 py-3">
          <DialogTitle className="flex items-center justify-between">
            <span>{title}</span>
            <DialogClose asChild>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsOpen(false)}
              >
                <IconX />
              </Button>
            </DialogClose>
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="px-6 py-3">
          <AddEducationForm education={education} setIsOpen={setIsOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
