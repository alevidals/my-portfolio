import { ImportProjectsForm } from "@/app/(app)//dashboard/projects/_components/import-projects-form";
import { importProjects } from "@/app/(app)//dashboard/projects/_lib/actions";
import type { getRepositories } from "@/app/(app)//dashboard/projects/_lib/queries";
import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
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
import { IconBrandGithub, IconLoader2, IconX } from "@tabler/icons-react";
import { useActionState, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

// TODO: use better-fetch
async function fetchRepositories() {
  const response = await fetch("/api/projects");

  if (!response.ok) {
    throw new Error("Failed to fetch projects. Please try again later.");
  }

  return response.json() as ReturnType<typeof getRepositories>;
}

export function ImportProjectsDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<string>("");
  const [selectedRepositories, setSelectedRepositories] = useState<number[]>(
    [],
  );
  const [_, formAction, isPending] = useActionState(
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

  const {
    data,
    error,
    isLoading: isLoadingFetch,
    isValidating: isValidatingFetch,
  } = useSWR(isOpen ? "/api/projects" : null, fetchRepositories, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  const filteredRepositories = data?.filter((repository) =>
    repository.name.toLowerCase().includes(filter.toLowerCase()),
  );

  const isLoading = isLoadingFetch || isValidatingFetch;
  const shouldShowError = error && !isLoading;
  const shouldShowData = filteredRepositories && !isLoading && !shouldShowError;

  function handleAction(_: FormData) {
    const repositories = data?.filter((repository) =>
      selectedRepositories.includes(repository.id),
    );

    const newFormData = new FormData();
    newFormData.append("repositories", JSON.stringify(repositories));

    formAction(newFormData);
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

          {shouldShowError && (
            <p className="h-full text-red-500">
              {error.message ?? "Failed to fetch projects"}
            </p>
          )}

          {shouldShowData && (
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
                  <ImportProjectsForm
                    filteredRepositories={filteredRepositories}
                    selectedRepositories={selectedRepositories}
                    setSelectedRepositories={setSelectedRepositories}
                    handleAction={handleAction}
                  />
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
