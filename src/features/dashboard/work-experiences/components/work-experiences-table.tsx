"use client";

import { ResponsiveAddDialog } from "@/features/dashboard/components/responsive-add-dialog";
import { AddWorkExperienceForm } from "@/features/dashboard/work-experiences/components/add-work-experience-form";
import { WorkExperienceActionsDropdown } from "@/features/dashboard/work-experiences/components/work-experience-actions-dropdown";
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
import type { getUserWorkExperiences } from "@/shared/lib/queries";
import { formatDate } from "@/shared/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";

type Props = {
  workExperiences: Awaited<ReturnType<typeof getUserWorkExperiences>>;
};

export function WorkExperiencesTable({ workExperiences }: Props) {
  const t = useTranslations("workExperiences");

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
      <div className="flex items-center justify-between mb-4 gap-4">
        <Input
          placeholder={t("filterPlaceholder")}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-10 dark:bg-transparent w-full md:w-96"
        />
        <ResponsiveAddDialog
          title={t("addDialog.title")}
          description={t("addDialog.description")}
          type="add"
        >
          {({ setIsOpen }) => <AddWorkExperienceForm setIsOpen={setIsOpen} />}
        </ResponsiveAddDialog>
      </div>
      <div className="border rounded-md">
        <ScrollArea className="grid grid-cols-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("table.companyName")}</TableHead>
                <TableHead>{t("table.position")}</TableHead>
                <TableHead>{t("table.description")}</TableHead>
                <TableHead>{t("table.startDate")}</TableHead>
                <TableHead>{t("table.endDate")}</TableHead>
                <TableHead>{t("table.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorkExperiences.length > 0 ? (
                filteredWorkExperiences.map((workExperience) => (
                  <TableRow key={workExperience.id}>
                    <TableCell className="whitespace-normal">
                      {workExperience.companyName}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {workExperience.position}
                    </TableCell>
                    <TableCell className="min-w-[400px] w-[400px] whitespace-pre-line">
                      {workExperience.description || "-"}
                    </TableCell>
                    <TableCell>
                      {formatDate({
                        month: workExperience.startDate.month,
                        year: workExperience.startDate.year,
                      })}
                    </TableCell>
                    <TableCell>
                      {workExperience.endDate
                        ? formatDate({
                            month: workExperience.endDate.month,
                            year: workExperience.endDate.year,
                          })
                        : t("table.present")}
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
                    {t("table.noneFound")}
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
