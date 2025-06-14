import { githubFetch } from "@/features/dashboard/projects/lib/github-fetch";
import { mapRepositories } from "@/features/dashboard/projects/lib/mapper";
import type {
  InsertProject,
  Repository,
  UpdateProject,
} from "@/features/dashboard/projects/lib/types";
import { getSession } from "@/shared/lib/auth";
import { db } from "@/shared/lib/db/drizzle";
import { projects } from "@/shared/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function getRepositories() {
  const repositories: Repository[] = [];

  let hasMore = true;
  let page = 1;

  while (hasMore) {
    const { data, error } = await githubFetch("@get/user/repos", {
      query: {
        type: "public",
        page: 1,
      },
    });

    if (error) {
      console.error("Error fetching repositories:", error.message);
      throw error;
    }

    if (data.length < 100 || data.length === 0) {
      hasMore = false;
    }

    const mappedRepositories = mapRepositories({ repositories: data });

    repositories.push(...mappedRepositories);

    page++;
  }

  const repositoriesWithLanguagesPromises = repositories.map(
    async (repository) => {
      const languages = await getRepositoryLanguages({
        user: repository.username,
        repository: repository.name,
      });

      return {
        ...repository,
        technologies: Object.keys(languages),
      };
    },
  );

  const repositoriesWithLanguages = await Promise.all(
    repositoriesWithLanguagesPromises,
  );

  return repositoriesWithLanguages;
}

type GetRepositoryLanguagesParams = {
  user: string;
  repository: string;
};

export async function getRepositoryLanguages({
  user,
  repository,
}: GetRepositoryLanguagesParams) {
  const { data, error } = await githubFetch(
    "@get/repos/:user/:repository/languages",
    {
      params: {
        user,
        repository,
      },
    },
  );

  if (error) {
    console.error("Error fetching repository languages:", error.message);
    throw error;
  }

  return data;
}

type InsertProjectParams = {
  project: InsertProject;
};

export async function insertProject({ project }: InsertProjectParams) {
  const insertedProject = await db
    .insert(projects)
    .values(project)
    .returning()
    .get();

  return insertedProject;
}

type BelongsProjectToUserParams = {
  projectId: string;
  userId: string;
};

export async function belongsProjectToUser({
  projectId,
  userId,
}: BelongsProjectToUserParams) {
  const project = await db.query.projects.findFirst({
    where: (projects, { eq, and }) =>
      and(eq(projects.id, projectId), eq(projects.userId, userId)),
  });

  return !!project;
}

type DeleteProjectParams = {
  projectId: string;
};

export async function deleteProject({ projectId }: DeleteProjectParams) {
  const session = await getSession();
  if (!session) return redirect("/");

  const belongsToUser = await belongsProjectToUser({
    projectId,
    userId: session.user.id,
  });

  if (!belongsToUser) {
    return;
  }

  const deletedProject = await db
    .delete(projects)
    .where(eq(projects.id, projectId))
    .returning()
    .get();

  return deletedProject;
}

type UpdateProjectParams = {
  project: UpdateProject;
};

export async function updateProject({ project }: UpdateProjectParams) {
  const session = await getSession();
  if (!session) return redirect("/");

  const belongsToUser = await belongsProjectToUser({
    projectId: project.id,
    userId: session.user.id,
  });

  if (!belongsToUser) {
    return;
  }

  const updatedProject = await db
    .update(projects)
    .set(project)
    .where(eq(projects.id, project.id))
    .returning()
    .get();

  return updatedProject;
}

async function getUserGithubData() {
  const { data, error } = await githubFetch("@get/user");

  if (error) {
    console.error("Error fetching user data:", error.message);
    throw error;
  }

  return data;
}
