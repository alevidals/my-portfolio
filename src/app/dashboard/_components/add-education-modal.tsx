"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import type { getEducations } from "@/lib/db/queries/educations";
import { AddEducationForm } from "@/app/dashboard/_components/add-education-form";

type Props = {
  education?: Awaited<ReturnType<typeof getEducations>>[number];
};

export function AddEducationModal({ education }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {education ? (
          <Button size="icon" variant="outline">
            <Pencil className="text-sky-500" />
          </Button>
        ) : (
          <Button className="rounded-full" onClick={() => setIsOpen(true)}>
            <Plus />
            <span>Add education</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {education ? "Edit education" : "Add education"}
          </DialogTitle>
          <DialogDescription>
            {education
              ? "Update the details of your education"
              : "Add a new education to your portfolio"}
          </DialogDescription>
        </DialogHeader>
        <div>
          <AddEducationForm
            education={education}
            setIsPending={setIsPending}
            setIsOpen={setIsOpen}
          />
        </div>
        <DialogFooter>
          <Button type="submit" form="addEducationForm" disabled={isPending}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
