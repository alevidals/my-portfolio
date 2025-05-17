"use client";

import { AddEducationDialog } from "@/app/dashboard/educations/_components/add-education-dialog";
import type { getUserEducations } from "@/app/dashboard/educations/_lib/queries";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
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
      <div className="flex items-center justify-between mb-4">
        <Input
          placeholder="Filter educations..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-10 dark:bg-transparent w-96"
        />
        <AddEducationDialog />
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader className="mx-3">
            <TableRow>
              <TableHead>Institution</TableHead>
              <TableHead>Degree</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead className="w-14" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEducations.length > 0 ? (
              filteredEducations.map((education) => (
                <TableRow key={education.id}>
                  <TableCell className="px-3 max-w-40 whitespace-normal">
                    {education.institution}
                  </TableCell>
                  <TableCell className="px-3 max-w-40 whitespace-normal">
                    {education.degree}
                  </TableCell>
                  <TableCell className="px-3 w-[400px] whitespace-normal">
                    {education.description || "-"}
                  </TableCell>
                  <TableCell className="px-3 max-w-40 whitespace-normal">
                    {formatDate({
                      month: education.startDate.month,
                      year: education.startDate.year,
                    })}
                  </TableCell>
                  <TableCell className="px-3 max-w-40 whitespace-normal">
                    {education.endDate
                      ? formatDate({
                          month: education.endDate.month,
                          year: education.endDate.year,
                        })
                      : "Present"}
                  </TableCell>
                  <TableCell>actions</TableCell>
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
      </div>
    </>
  );
}
