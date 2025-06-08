"use client";

import { ResponsiveAddDialog } from "@/features/dashboard/components/responsive-add-dialog";
import { AddEducationForm } from "@/features/dashboard/educations/components/add-education-form";
import { EducationActionsDropdown } from "@/features/dashboard/educations/components/education-actions-dropdown";
import { Input } from "@/shared/components/ui/input";
import { ScrollArea, ScrollBar } from "@/shared/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import type { getUserEducations } from "@/shared/lib/queries";
import { formatDate } from "@/shared/lib/utils";
import { useState } from "react";

type Props = {
  educations: Awaited<ReturnType<typeof getUserEducations>>;
};

export function EducationsTable({ educations }: Props) {
  const [filter, setFilter] = useState("");

  const filteredEducations = educations.filter((educations) => {
    const lowerCaseFilter = filter.toLowerCase();
    return (
      educations.institution.toLowerCase().includes(lowerCaseFilter) ||
      educations.degree.toLowerCase().includes(lowerCaseFilter)
    );
  });

  return (
    <>
      <div className="flex items-center justify-between mb-4 gap-4">
        <Input
          placeholder="Filter educations..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-10 dark:bg-transparent w-full md:w-96"
        />
        <ResponsiveAddDialog
          title="Add Education"
          description="Add a new education"
          type="add"
        >
          {({ setIsOpen }) => <AddEducationForm setIsOpen={setIsOpen} />}
        </ResponsiveAddDialog>
      </div>
      <div className="border rounded-md">
        <ScrollArea className="grid grid-cols-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Institution</TableHead>
                <TableHead>Degree</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEducations.length > 0 ? (
                filteredEducations.map((education) => (
                  <TableRow key={education.id}>
                    <TableCell className="whitespace-normal">
                      {education.institution}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {education.degree}
                    </TableCell>
                    <TableCell className="whitespace-pre-line min-w-[400px] w-[400px]">
                      {education.description || "-"}
                    </TableCell>
                    <TableCell>
                      {formatDate({
                        month: education.startDate.month,
                        year: education.startDate.year,
                      })}
                    </TableCell>
                    <TableCell>
                      {education.endDate
                        ? formatDate({
                            month: education.endDate.month,
                            year: education.endDate.year,
                          })
                        : "Present"}
                    </TableCell>
                    <TableCell>
                      <EducationActionsDropdown education={education} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No educations found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
}
