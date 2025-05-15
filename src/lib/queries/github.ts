import { $fetch } from "@/lib/fetch";
import { mapRepositories } from "@/lib/mapper/github";
import type { Repository } from "@/lib/schema/github";

export async function getRepositories() {
  const repositories: Repository[] = [];

  let hasMore = true;
  let page = 1;

  while (hasMore) {
    const { data, error } = await $fetch("@get/user/repos", {
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
  const { data, error } = await $fetch(
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
