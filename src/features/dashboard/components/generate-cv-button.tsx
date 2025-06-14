"use client";
import { PDFDocument } from "@/features/dashboard/components/pdf-document";
import type { getUserData } from "@/features/portfolio/lib/queries";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { pdf } from "@react-pdf/renderer";
import { IconFileCv, IconMoon, IconSun } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

type OpenPdfParams = {
  isDarkTheme: boolean;
};

type Props = {
  data?: Awaited<ReturnType<typeof getUserData>>;
};

export function GenerateCVButton({ data }: Props) {
  const t = useTranslations("dashboard");

  async function openPdf({ isDarkTheme }: OpenPdfParams) {
    const blob = await pdf(
      <PDFDocument data={data} isDarkTheme={isDarkTheme} />,
    ).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.click();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {t("generateCV")}
          <IconFileCv size={22} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => openPdf({ isDarkTheme: false })}
          className="flex items-center justify-between gap-2"
        >
          {t("lightDesign")}
          <IconSun className="h-4 w-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => openPdf({ isDarkTheme: true })}
          className="flex items-center justify-between gap-2"
        >
          {t("darkDesign")}
          <IconMoon className="h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
