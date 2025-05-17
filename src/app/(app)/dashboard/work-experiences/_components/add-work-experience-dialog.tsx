import { AddWorkExperienceForm } from "@/app/(app)//dashboard/work-experiences/_components/add-work-experience-form";
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
import type { getUserWorkExperiences } from "@/lib/queries";
import { IconPlus, IconX } from "@tabler/icons-react";
import { type Dispatch, type SetStateAction, useState } from "react";

type Props =
  | {
      workExperience: Awaited<
        ReturnType<typeof getUserWorkExperiences>
      >[number];
      externalIsOpen: boolean;
      externalSetIsOpen: Dispatch<SetStateAction<boolean>>;
    }
  | {
      workExperience?: never;
      externalIsOpen?: never;
      externalSetIsOpen?: never;
    };

export function AddWorkExperienceDialog({
  workExperience,
  externalIsOpen,
  externalSetIsOpen,
}: Props) {
  const [isOpen, setIsOpen] = workExperience
    ? [externalIsOpen, externalSetIsOpen]
    : useState(false);

  const title = workExperience
    ? "Edit Work Experience"
    : "Add New Work Experience";
  const description = workExperience
    ? "Edit your work experience details here."
    : "Add your work experience details here.";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {!workExperience && (
        <DialogTrigger asChild>
          <Button onClick={() => setIsOpen(true)}>
            <IconPlus />
            <span className="hidden md:flex">Add New Work Experience</span>
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
          <DialogDescription className="text-left">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 py-3">
          <AddWorkExperienceForm
            workExperience={workExperience}
            setIsOpen={setIsOpen}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
