import type { getRepositories } from "@/features/dashboard/projects/lib/queries";
import { Badge } from "@/shared/components/ui/badge";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { IconExternalLink } from "@tabler/icons-react";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  filteredRepositories: Awaited<ReturnType<typeof getRepositories>>;
  selectedRepositories: number[];
  setSelectedRepositories: Dispatch<SetStateAction<number[]>>;
  handleAction: (_: FormData) => void;
};

type ToggleRepositoryParams = {
  repositoryId: number;
  checked: boolean;
};

export function ImportProjectsForm({
  filteredRepositories,
  selectedRepositories,
  setSelectedRepositories,
  handleAction,
}: Props) {
  function toggleRepository({ checked, repositoryId }: ToggleRepositoryParams) {
    if (checked) {
      setSelectedRepositories((prev) => [...prev, repositoryId]);
    } else {
      setSelectedRepositories((prev) =>
        prev.filter((id) => id !== repositoryId),
      );
    }
  }

  return (
    <form action={handleAction} id="import-projects">
      {filteredRepositories.map((repository) => (
        <label
          key={repository.id}
          htmlFor={String(repository.id)}
          className="py-4 border-b last:not-first:border-b-0 hover:bg-neutral-900 flex gap-4"
        >
          <Checkbox
            id={String(repository.id)}
            name="repositories"
            checked={selectedRepositories.includes(repository.id)}
            onCheckedChange={(checked) =>
              toggleRepository({
                repositoryId: repository.id,
                checked: Boolean(checked),
              })
            }
            value={String(repository.id)}
          />
          <div className="flex-1">
            <a
              className="flex items-center gap-2 mb-1 hover:underline hover:underline-offset-4"
              href={repository.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="font-bold">{repository.name}</h3>
              <IconExternalLink size={20} />
            </a>
            <p className="text-sm text-neutral-200">{repository.description}</p>
            <div className="space-x-1 space-y-1 mt-2 overflow-x-auto">
              {repository.technologies.map((technology) => (
                <Badge variant="outline" key={technology}>
                  {technology}
                </Badge>
              ))}
            </div>
          </div>
        </label>
      ))}
    </form>
  );
}
