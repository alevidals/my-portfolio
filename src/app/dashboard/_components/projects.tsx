import { AddExperienceModal } from "@/app/dashboard/_components/add-experience-modal";
import { DeleteExperienceDialog } from "@/app/dashboard/_components/delete-experience-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { getProjects } from "@/lib/db/queries/projects";
import { formatDate } from "@/lib/utils";

type Props = {
  projects: Awaited<ReturnType<typeof getProjects>>;
};

export function Projects({ projects }: Props) {
  return (
    <section>
      <header className="flex justify-between items-center">
        <h2 className="text-3xl mb-4">Projects</h2>
        <AddExperienceModal />
      </header>
      {projects.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Deployed url</TableHead>
              <TableHead>Repository url</TableHead>
              <TableHead>Technologies</TableHead>
              <TableHead className="text-end">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{project.deployedUrl}</TableCell>
                <TableCell>{project.repositoryUrl}</TableCell>
                <TableCell className="max-w-60 overflow-x-auto">
                  <div className="flex gap-2">
                    {project.technologies.map((technology) => (
                      <Badge variant="outline" key={technology.id}>
                        {technology.name}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  Actions
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-sm">No projects added yet.</p>
      )}
    </section>
  );
}
