"use client";

import { Button } from "@/shared/components/ui/button";
import { IconCopy } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

type Props = {
  slug: string;
};

export function CopySlugToClipboard({ slug }: Props) {
  const t = useTranslations("dashboard");

  function handleOnClick() {
    try {
      const url = new URL(window.location.href);
      const urlToCopy = `/portfolio/${url.origin}/${slug}`;

      navigator.clipboard.writeText(urlToCopy);
      toast.success(t("slugCopied"));
    } catch {
      toast.error(t("slugCopyFailed"));
    }
  }

  return (
    <Button variant="outline" onClick={handleOnClick}>
      {t("copySlug")}
      <IconCopy size={22} className="ml-2" />
    </Button>
  );
}
