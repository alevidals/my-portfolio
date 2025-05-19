"use client";

import { Button } from "@/components/ui/button";
import { IconCopy } from "@tabler/icons-react";
import { toast } from "sonner";

type Props = {
  slug: string;
};

export function CopySlugToClipboard({ slug }: Props) {
  function handleOnClick() {
    try {
      const url = new URL(window.location.href);
      const urlToCopy = `/portfolio/${url.origin}/${slug}`;

      navigator.clipboard.writeText(urlToCopy);
      toast.success("Slug copied to clipboard");
    } catch {
      toast.error("Failed to copy slug");
    }
  }

  return (
    <Button variant="outline" onClick={handleOnClick}>
      Copy Slug
      <IconCopy size={22} className="ml-2" />
    </Button>
  );
}
