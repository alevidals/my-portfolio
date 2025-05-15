import { importProjects } from "@/app/dashboard/projects/_actions";
import { LoadingButton } from "@/components/loading-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { getRepositories } from "@/lib/queries/github";
import {
  IconBrandGithub,
  IconExternalLink,
  IconLoader2,
  IconX,
} from "@tabler/icons-react";
import { useActionState, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

type ToggleRepositoryParams = {
  repositoryId: number;
  checked: boolean;
};

export function ImportProjectsDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<string>("");
  const [selectedRepositories, setSelectedRepositories] = useState<number[]>(
    [],
  );
  const [state, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      const response = await importProjects(_, formData);

      if (response.success) {
        setIsOpen(false);
        setFilter("");
        setSelectedRepositories([]);
        toast.success("Projects imported successfully");

        return null;
      }

      toast.error(response.error);

      return response;
    },
    null,
  );

  const { data, error, isLoading } = useSWR(
    isOpen ? "/api/projects" : null,
    async () => {
      const response = await fetch("/api/projects");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      return response.json() as ReturnType<typeof getRepositories>;
    },
  );

  const filteredRepositories = data?.filter((repository) =>
    repository.name.toLowerCase().includes(filter.toLowerCase()),
  );

  function handleAction(_: FormData) {
    const repositories = data?.filter((repository) =>
      selectedRepositories.includes(repository.id),
    );

    const newFormData = new FormData();
    newFormData.append("repositories", JSON.stringify(repositories));

    formAction(newFormData);
  }

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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <IconBrandGithub />
          <span>Import from Github</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 [&>button]:hidden gap-0 h-3/4 w-fit grid-rows-[auto_1fr]">
        <DialogHeader className="border-b px-6 py-3">
          <DialogTitle className="flex items-center justify-between">
            <span>Import projects</span>
            <DialogClose asChild>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsOpen(false)}
              >
                <IconX />
              </Button>
            </DialogClose>
          </DialogTitle>
          <DialogDescription className="">
            Choose repositories to import from your Github account.
          </DialogDescription>
        </DialogHeader>
        <div className="h-full overflow-hidden flex flex-col px-6 py-3">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <IconLoader2 className="animate-spin" />
            </div>
          )}
          {filteredRepositories && !isLoading && (
            <>
              <Input
                className="h-10 mb-4 dark:bg-transparent"
                placeholder="Filter projects..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              {filteredRepositories.length === 0 ? (
                <p className="h-full">No results found.</p>
              ) : (
                <ScrollArea className="h-full overflow-hidden">
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
                          <p className="text-sm text-neutral-200">
                            {repository.description}
                          </p>
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
                </ScrollArea>
              )}

              <LoadingButton
                isLoading={isPending}
                form="import-projects"
                icon={<IconBrandGithub />}
                className="mt-4 flex items-center"
              >
                <span>Import {selectedRepositories.length} repositories</span>
              </LoadingButton>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
