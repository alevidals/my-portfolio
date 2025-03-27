import { db } from "@/lib/db/drizzle";
import { projectsSchema } from "@/lib/db/schema";
import { mapProjects } from "@/lib/mappers/projects";
import { eq } from "drizzle-orm";

type GetProjectsParams = {
  userId: string;
};

export async function _getProjects({ userId }: GetProjectsParams) {
  const projects = db.query.projectsSchema.findMany({
    columns: {
      id: true,
      name: true,
      description: true,
      deployedUrl: true,
      repositoryUrl: true,
    },
    with: {
      projectTechnologies: {
        with: {
          technology: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    where: eq(projectsSchema.userId, userId),
  });

  return projects;
}

export async function getProjects({ userId }: GetProjectsParams) {
  const projects = await _getProjects({ userId });

  return mapProjects({ projects });
}
