"use client";

import { AddWorkExperienceDialog } from "@/app/(app)//dashboard/work-experiences/_components/add-work-experience-dialog";
import { WorkExperienceActionsDropdown } from "@/app/(app)//dashboard/work-experiences/_components/work-experience-actions-dropdown";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { getUserWorkExperiences } from "@/lib/queries";
import { formatDate } from "@/lib/utils";
import { useState } from "react";

type Props = {
  workExperiences: Awaited<ReturnType<typeof getUserWorkExperiences>>;
};

export function WorkExperiencesTable({ workExperiences }: Props) {
  const [filter, setFilter] = useState("");

  const filteredWorkExperiences = workExperiences.filter((workExperience) => {
    const lowerCaseFilter = filter.toLowerCase();
    return (
      workExperience.companyName.toLowerCase().includes(lowerCaseFilter) ||
      workExperience.position.toLowerCase().includes(lowerCaseFilter)
    );
  });

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Input
          placeholder="Filter work experiences..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-10 dark:bg-transparent w-96"
        />
        <AddWorkExperienceDialog />
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader className="mx-3">
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead className="w-14" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWorkExperiences.length > 0 ? (
              filteredWorkExperiences.map((workExperience) => (
                <TableRow key={workExperience.id}>
                  <TableCell className="px-3 max-w-40 whitespace-normal">
                    {workExperience.companyName}
                  </TableCell>
                  <TableCell className="px-3 max-w-40 whitespace-normal">
                    {workExperience.position}
                  </TableCell>
                  <TableCell className="px-3 w-[400px] whitespace-normal">
                    {workExperience.description || "-"}
                  </TableCell>
                  <TableCell className="px-3 max-w-40 whitespace-normal">
                    {formatDate({
                      month: workExperience.startDate.month,
                      year: workExperience.startDate.year,
                    })}
                  </TableCell>
                  <TableCell className="px-3 max-w-40 whitespace-normal">
                    {workExperience.endDate
                      ? formatDate({
                          month: workExperience.endDate.month,
                          year: workExperience.endDate.year,
                        })
                      : "Present"}
                  </TableCell>
                  <TableCell>
                    <WorkExperienceActionsDropdown
                      workExperience={workExperience}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No work experiences found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
