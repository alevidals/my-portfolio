"use client";
import { PDFDocument } from "@/app/(app)/dashboard/_components/pdf-document";
import type { getUserData } from "@/app/portfolio/[username]/_lib/queries";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { pdf } from "@react-pdf/renderer";
import { IconFileCv, IconMoon, IconSun } from "@tabler/icons-react";

type OpenPdfParams = {
  isDarkTheme: boolean;
};

type Props = {
  data?: Awaited<ReturnType<typeof getUserData>>;
};

export function GenerateCVButton({ data }: Props) {
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
          Generate CV
          <IconFileCv size={22} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => openPdf({ isDarkTheme: false })}
          className="flex items-center justify-between gap-2"
        >
          Light design
          <IconSun className="h-4 w-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => openPdf({ isDarkTheme: true })}
          className="flex items-center justify-between gap-2"
        >
          Dark design
          <IconMoon className="h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
