"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { getUserProjects } from "@/lib/queries/projects";
import { IconDots } from "@tabler/icons-react";
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
      <Input
        placeholder="Filter projects..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 h-12 dark:bg-transparent w-96"
      />
      <div className="border rounded-md">
        <Table>
          <TableHeader className="mx-3">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Deployment URL</TableHead>
              <TableHead>Repository URL</TableHead>
              <TableHead className="w-14" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="px-3 max-w-40 whitespace-normal">
                    {project.name}
                  </TableCell>
                  <TableCell className="px-3 w-[400px] whitespace-normal">
                    {project.description}
                  </TableCell>
                  <TableCell className="px-3">
                    {project.deploymentUrl && (
                      <Button variant="link" className="px-0 text-sky-400">
                        <a
                          href={project.deploymentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.deploymentUrl}
                        </a>
                      </Button>
                    )}
                  </TableCell>
                  <TableCell className="px-3">
                    {project.repositoryUrl && (
                      <Button variant="link" className="px-0 text-sky-400">
                        <a
                          href={project.repositoryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.repositoryUrl}
                        </a>
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <IconDots />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableCell colSpan={5} className="h-24 text-center">
                No projects found
              </TableCell>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
