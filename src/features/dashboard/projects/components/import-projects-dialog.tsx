import { ImportProjectsForm } from "@/features/dashboard/projects/components/import-projects-form";
import { importProjects } from "@/features/dashboard/projects/lib/actions";
import type { getRepositories } from "@/features/dashboard/projects/lib/queries";
import { LoadingButton } from "@/shared/components/loading-button";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { Input } from "@/shared/components/ui/input";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { useMediaQuery } from "@/shared/hooks/use-media-query";
import { IconBrandGithub, IconLoader2, IconX } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useActionState, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

type Props = {
  className?: string;
};

async function fetchRepositories() {
  const response = await fetch("/api/projects");

  if (!response.ok) {
    throw new Error("Failed to fetch projects. Please try again later.");
  }

  return response.json() as ReturnType<typeof getRepositories>;
}

export function ImportProjectsDialog({ className }: Props) {
  const t = useTranslations("projects");

  const isDesktop = useMediaQuery("(min-width: 768px)");
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
        toast.success(response.message);

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

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setIsOpen(true)} className={className}>
            <IconBrandGithub />
            <span>{t("importDialog.title")}</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 [&>button]:hidden gap-0 h-3/4 w-fit grid-rows-[auto_1fr]">
          <DialogHeader className="border-b px-6 py-3">
            <DialogTitle className="flex items-center justify-between">
              <span>{t("importDialog.title")}</span>
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
            <DialogDescription>
              {t("importDialog.description")}
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
                {error.message ?? t("importDialog.errors.fetchFailed")}
              </p>
            )}

            {shouldShowData && (
              <>
                <Input
                  className="h-10 mb-4 dark:bg-transparent"
                  placeholder={t("importDialog.filterPlaceholder")}
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
                {filteredRepositories.length === 0 ? (
                  <p className="h-full">{t("importDialog.emptyResults")}</p>
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
                  <span>
                    {t("importDialog.buttons.import", {
                      count: selectedRepositories.length,
                    })}
                  </span>
                </LoadingButton>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button onClick={() => setIsOpen(true)} className={className}>
          <IconBrandGithub />
          <span>{t("importDialog.title")}</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <ScrollArea className="overflow-y-auto">
          <DrawerHeader className="text-left">
            <DrawerTitle>{t("importDialog.title")}</DrawerTitle>
            <DrawerDescription>
              {t("importDialog.description")}
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <div className="h-full overflow-hidden flex flex-col py-3">
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
                    <p className="h-full">{t("importDialog.emptyResults")}</p>
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
                    <span>
                      {t("importDialog.buttons.import", {
                        count: selectedRepositories.length,
                      })}
                    </span>
                  </LoadingButton>
                </>
              )}
            </div>
          </div>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">
                {t("importDialog.buttons.cancel")}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
