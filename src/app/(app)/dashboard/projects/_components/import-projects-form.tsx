import type { getRepositories } from "@/app/(app)//dashboard/projects/_lib/queries";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
            <h3 className="font-bold mb-1">{repository.name}</h3>
            <p className="text-sm text-neutral-200">{repository.description}</p>
            <div className="space-x-1 space-y-1 mt-2 overflow-x-auto">
              {repository.technologies.map((technology) => (
                <Badge variant="outline" key={technology}>
                  {technology}
                </Badge>
              ))}
            </div>
          </div>
          <a
            href={repository.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start"
          >
            <IconExternalLink className="text-sky-400 hover:text-gray-200" />
          </a>
        </label>
      ))}
    </form>
  );
}
