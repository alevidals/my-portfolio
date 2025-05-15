import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { getRepositories } from "@/lib/queries/github";
import { IconLoader2, IconX } from "@tabler/icons-react";
import type { Dispatch, SetStateAction } from "react";
import useSWR from "swr";

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function ImportProjectsDialog({ setIsOpen }: Props) {
  const { data, error, isLoading } = useSWR("/api/projects", async () => {
    const response = await fetch("/api/projects");
    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }
    return response.json() as ReturnType<typeof getRepositories>;
  });

  return (
    <Dialog open={true}>
      <DialogContent className="p-0 [&>button]:hidden gap-0 h-3/4 grid-rows-[auto_1fr]">
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
          {data && !isLoading && (
            <>
              <ScrollArea className="h-full overflow-hidden">
                <ul>
                  {data?.map((repo) => (
                    <li key={repo.id}>{repo.name}</li>
                  ))}
                </ul>
              </ScrollArea>
              <Button className="w-fit mt-4">Import</Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
