import type {
  GetRepositoryLanguagesResponse,
  GetRespositoriesResponse,
  Repository,
} from "@/features/dashboard/projects/lib/types";

type MapRepositoriesParams = {
  repositories: GetRespositoriesResponse;
};

export function mapRepositories({
  repositories,
}: MapRepositoriesParams): Repository[] {
  return repositories.map((repo) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description,
    repositoryUrl: repo.html_url,
    deploymentUrl: repo.homepage,
    stars: repo.stargazers_count,
    technologies: repo.languages || [],
    username: repo.owner.login,
  }));
}

type MapRepositoryLanguagesParams = {
  languages: GetRepositoryLanguagesResponse;
};

export function mapRepositoryLanguages({
  languages,
}: MapRepositoryLanguagesParams) {
  return Object.keys(languages);
}
