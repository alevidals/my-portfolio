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
import type { getExperiences } from "@/lib/db/queries/experiences";
import { AddExperienceForm } from "@/app/dashboard/_components/add-experience-form";

type Props = {
  experience?: Awaited<ReturnType<typeof getExperiences>>[number];
};

export function AddExperienceModal({ experience }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {experience ? (
          <Button size="icon" variant="outline">
            <Pencil />
          </Button>
        ) : (
          <Button variant="outline" size="icon" onClick={() => setIsOpen(true)}>
            <Plus />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {experience ? "Edit experience" : "Add experience"}
          </DialogTitle>
          <DialogDescription>
            {experience
              ? "Update the details of your experience"
              : "Add a new experience to your portfolio"}
          </DialogDescription>
        </DialogHeader>
        <div>
          <AddExperienceForm
            experience={experience}
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
