"use client";

import { AddProjectDialog } from "@/app/(app)//dashboard/projects/_components/add-project-dialog";
import { ImportProjectsDialog } from "@/app/(app)//dashboard/projects/_components/import-projects-dialog";
import { ProjectActionsDropdown } from "@/app/(app)//dashboard/projects/_components/project-actions-dropdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { getUserProjects } from "@/lib/queries";
import { IconExternalLink } from "@tabler/icons-react";
import { useState } from "react";

type Props = {
  projects: Awaited<ReturnType<typeof getUserProjects>>;
};

export function ProjectsTable({ projects }: Props) {
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
          placeholder="Filter projects..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-10 dark:bg-transparent w-full md:w-96"
        />
        <div className="flex items-center gap-2">
          <ImportProjectsDialog className="hidden md:flex" />
          <AddProjectDialog />
        </div>
      </div>
      <ImportProjectsDialog className="flex md:hidden w-full mb-4" />
      <ScrollArea className="grid grid-cols-1">
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Technologies</TableHead>
                <TableHead>Deployment URL</TableHead>
                <TableHead>Repository URL</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="whitespace-normal">
                      {project.name}
                    </TableCell>
                    <TableCell className="whitespace-normal min-w-[400px] w-[400px]">
                      {project.description}
                    </TableCell>
                    <TableCell className="max-w-[200px] overflow-x-auto grid-cols-1 space-x-1">
                      <ScrollArea className="w-full py-4">
                        {project.technologies.map((technology) => (
                          <Badge
                            key={`${project.name}-${technology}`}
                            variant="outline"
                          >
                            {technology}
                          </Badge>
                        ))}
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {project.deploymentUrl && (
                        <Button variant="link" className="px-0">
                          <a
                            className="flex items-center gap-2"
                            href={project.deploymentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {project.deploymentUrl}
                            <IconExternalLink size={16} />
                          </a>
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {project.repositoryUrl && (
                        <Button variant="link" className="px-0">
                          <a
                            className="flex items-center gap-2"
                            href={project.repositoryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {project.repositoryUrl}
                            <IconExternalLink size={16} />
                          </a>
                        </Button>
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
                    No projects found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
}
