import { AddProjectForm } from "@/app/dashboard/projects/_components/add-project-form";
import type { getUserProjects } from "@/app/dashboard/projects/_lib/queries";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { IconPlus, IconX } from "@tabler/icons-react";
import { type Dispatch, type SetStateAction, useState } from "react";

type Props =
  | {
      project: Awaited<ReturnType<typeof getUserProjects>>[number];
      externalIsOpen: boolean;
      externalSetIsOpen: Dispatch<SetStateAction<boolean>>;
    }
  | {
      project?: never;
      externalIsOpen?: never;
      externalSetIsOpen?: never;
    };

export function AddProjectDialog({
  project,
  externalIsOpen,
  externalSetIsOpen,
}: Props) {
  const [isOpen, setIsOpen] = project
    ? [externalIsOpen, externalSetIsOpen]
    : useState(false);

  const title = project ? "Edit Project" : "Add New Project";
  const description = project
    ? "Edit your project details here."
    : "Add your new project details here.";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {!project && (
        <DialogTrigger asChild>
          <Button onClick={() => setIsOpen(true)}>
            <IconPlus />
            <span>Add New Project</span>
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
          <AddProjectForm setIsOpen={setIsOpen} project={project} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
