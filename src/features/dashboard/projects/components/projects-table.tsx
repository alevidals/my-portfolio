"use client";

import { ResponsiveAddDialog } from "@/features/dashboard/components/responsive-add-dialog";
import { AddProjectForm } from "@/features/dashboard/projects/components/add-project-form";
import { ImportProjectsDialog } from "@/features/dashboard/projects/components/import-projects-dialog";
import { ProjectActionsDropdown } from "@/features/dashboard/projects/components/project-actions-dropdown";
import { Badge } from "@/shared/components/ui/badge";
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
import type { getUserProjects } from "@/shared/lib/queries";
import { IconExternalLink } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

type Props = {
  projects: Awaited<ReturnType<typeof getUserProjects>>;
};

export function ProjectsTable({ projects }: Props) {
  const t = useTranslations("projects");

  const [filter, setFilter] = useState("");

  const filteredProjects = projects.filter((project) => {
    const lowerCaseFilter = filter.toLowerCase();
    return (
      project.name.toLowerCase().includes(lowerCaseFilter) ||
      project.description?.toLowerCase().includes(lowerCaseFilter)
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
        <div className="flex items-center gap-2">
          <ImportProjectsDialog className="hidden md:flex" />
          <ResponsiveAddDialog
            title={t("addDialog.title")}
            description={t("addDialog.description")}
            type="add"
          >
            {({ setIsOpen }) => <AddProjectForm setIsOpen={setIsOpen} />}
          </ResponsiveAddDialog>
        </div>
      </div>
      <ImportProjectsDialog className="w-full mb-4 flex md:hidden" />
      <div className="border rounded-md">
        <ScrollArea className="grid grid-cols-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("table.name")}</TableHead>
                <TableHead>{t("table.description")}</TableHead>
                <TableHead>{t("table.technologies")}</TableHead>
                <TableHead>{t("table.deploymentUrl")}</TableHead>
                <TableHead>{t("table.repositoryUrl")}</TableHead>
                <TableHead>{t("table.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="whitespace-normal">
                      {project.name}
                    </TableCell>
                    <TableCell className="whitespace-pre-line min-w-[400px] w-[400px]">
                      {project.description}
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.length > 0
                          ? project.technologies.map((technology) => (
                              <Badge
                                key={`${project.name}-${technology}`}
                                variant="outline"
                              >
                                {technology}
                              </Badge>
                            ))
                          : "-"}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[350px] whitespace-normal">
                      {project.deploymentUrl ? (
                        <a
                          className="break-all hover:underline hover:underline-offset-4"
                          href={project.deploymentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.deploymentUrl}
                          <IconExternalLink size={16} className="inline ml-2" />
                        </a>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell className="max-w-[350px] whitespace-normal">
                      {project.repositoryUrl ? (
                        <a
                          className="break-all hover:underline hover:underline-offset-4"
                          href={project.repositoryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.repositoryUrl}
                          <IconExternalLink size={16} className="inline ml-2" />
                        </a>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      <ProjectActionsDropdown project={project} />
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
