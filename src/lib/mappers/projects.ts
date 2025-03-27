import type { _getProjects } from "@/lib/db/queries/projects";

type MapProjectsParams = {
  projects: Awaited<ReturnType<typeof _getProjects>>;
};

export function mapProjects({ projects }: MapProjectsParams) {
  return projects.map((project) => ({
    id: project.id,
    name: project.name,
    description: project.description,
    deployedUrl: project.deployedUrl,
    repositoryUrl: project.repositoryUrl,
    technologies: project.projectTechnologies.map((projectTechnology) => ({
      name: projectTechnology.technology.name,
      id: projectTechnology.technology.id,
    })),
  }));
}
