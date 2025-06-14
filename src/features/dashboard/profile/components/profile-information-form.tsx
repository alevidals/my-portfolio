"use client";

import { LanguagesPicker } from "@/features/dashboard/profile/components/languages-picker";
import { PortfolioPicker } from "@/features/dashboard/profile/components/portfolio-picker";
import { insertUserProfile } from "@/features/dashboard/profile/lib/actions";
import type { getUserProfile } from "@/features/dashboard/profile/lib/queries";
import type { Language } from "@/features/dashboard/profile/lib/types";
import { FormItem } from "@/shared/components/form-item";
import { LoadingButton } from "@/shared/components/loading-button";
import type { getUserLanguages } from "@/shared/lib/queries";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconLink,
  IconTypography,
  IconUser,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useActionState, useState } from "react";
import { toast } from "sonner";

type Props = {
  userProfile?: Awaited<ReturnType<typeof getUserProfile>>;
  userLanguages?: Awaited<ReturnType<typeof getUserLanguages>>;
};

export function ProfileInformationForm({ userProfile, userLanguages }: Props) {
  const t = useTranslations("profile");

  const [languages, setLanguages] = useState<Language[]>(
    userLanguages?.map(
      (language): Language => ({
        name: language.name,
        level: language.level,
        id: language.id,
      }),
    ) ?? [],
  );

  const [state, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      formData.append("languages", JSON.stringify(languages));
      formData.append("preferredPortfolio", preferredPortfolio);

      const response = await insertUserProfile(_, formData);

      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.error);
      }

      return response;
    },
    null,
  );

  const [preferredPortfolio, setPreferredPortfolio] = useState(
    state?.data?.preferredPortfolio ??
      userProfile?.preferredPortfolio ??
      "evil-rabbit",
  );

  return (
    <form className="grid gap-4" action={formAction}>
      <FormItem
        id="slug"
        name="slug"
        itemType="input"
        required
        labelChildren={
          <>
            <IconLink size={22} />
            <span>{t("slug")}</span>
          </>
        }
        type="text"
        defaultValue={state?.data?.slug ?? userProfile?.slug ?? ""}
        placeholder="your-slug"
        error={state?.errors?.slug ?? ""}
      />
      <PortfolioPicker
        setPreferredPortfolio={setPreferredPortfolio}
        preferredPortfolio={preferredPortfolio}
      />
      <FormItem
        id="fullName"
        name="fullName"
        itemType="input"
        labelChildren={
          <>
            <IconUser size={22} />
            <span>{t("fullName")}</span>
          </>
        }
        helperText={t("fullNameHelper")}
        type="text"
        defaultValue={state?.data?.fullName ?? userProfile?.fullName ?? ""}
        placeholder="Full Name"
        error={state?.errors?.fullName ?? ""}
      />
      <FormItem
        id="biography"
        name="biography"
        inputClassName="h-32"
        itemType="textarea"
        labelChildren={
          <>
            <IconTypography size={22} />
            <span>{t("biography")}</span>
          </>
        }
        defaultValue={state?.data?.biography ?? userProfile?.biography ?? ""}
        placeholder={t("biographyPlaceholder")}
        error={state?.errors?.biography ?? ""}
      />
      <FormItem
        id="linkedInUrl"
        name="linkedInUrl"
        itemType="input"
        type="url"
        labelChildren={
          <>
            <IconBrandLinkedin size={22} />
            <span>{t("linkedInUrl")}</span>
          </>
        }
        defaultValue={
          state?.data?.linkedInUrl ?? userProfile?.linkedInUrl ?? ""
        }
        placeholder={t("linkedInPlaceholder")}
        error={state?.errors?.linkedInUrl ?? ""}
      />
      <FormItem
        id="githubUrl"
        name="githubUrl"
        itemType="input"
        type="url"
        labelChildren={
          <>
            <IconBrandGithub size={22} />
            <span>{t("githubUrl")}</span>
          </>
        }
        defaultValue={state?.data?.githubUrl ?? userProfile?.githubUrl ?? ""}
        placeholder={t("githubPlaceholder")}
        error={state?.errors?.githubUrl ?? ""}
      />
      <FormItem
        id="xUrl"
        name="xUrl"
        itemType="input"
        type="url"
        labelChildren={
          <>
            <IconBrandX size={22} />
            <span>{t("xUrl")}</span>
          </>
        }
        defaultValue={state?.data?.xUrl ?? userProfile?.xUrl ?? ""}
        placeholder={t("xPlaceholder")}
        error={state?.errors?.xUrl ?? ""}
      />

      <LanguagesPicker languages={languages} setLanguages={setLanguages} />

      <LoadingButton isLoading={isPending} className="mt-4 md:w-fit">
        {t("save")}
      </LoadingButton>
    </form>
  );
}
