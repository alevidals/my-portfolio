"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { IconChevronDown } from "@tabler/icons-react";
import { type Locale, useLocale, useTranslations } from "next-intl";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("header.language");

  function handleLanguageChange(language: Locale) {
    router.push(pathname, {
      locale: language,
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <img
          src={`/${locale}.svg`}
          alt={t(locale)}
          className="h-5 mr-2 inline"
        />
        <IconChevronDown className="inline h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleLanguageChange("es")}>
          <img src="/es.svg" alt={t("es")} className="h-5 mr-2 inline" />
          <span>{t("es")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
          <img src="/en.svg" alt={t("en")} className="h-5 mr-2 inline" />
          <span>{t("en")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("fr")}>
          <img src="/fr.svg" alt={t("fr")} className="h-5 mr-2 inline" />
          <span>{t("fr")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("de")}>
          <img src="/de.svg" alt={t("de")} className="h-5 mr-2 inline" />
          <span>{t("de")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
