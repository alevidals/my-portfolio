"use client";

import { insertUserProfile } from "@/app/(app)//dashboard/profile/_lib/actions";
import type { getUserProfile } from "@/app/(app)//dashboard/profile/_lib/queries";
import { LanguagesPicker } from "@/app/(app)/dashboard/profile/_components/languages-picker";
import { PortfolioPicker } from "@/app/(app)/dashboard/profile/_components/portfolio-picker";
import type { Language } from "@/app/(app)/dashboard/profile/_lib/types";
import { FormItem } from "@/components/form-item";
import { LoadingButton } from "@/components/loading-button";
import type { getUserLanguages } from "@/lib/queries";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconLink,
  IconTypography,
  IconUser,
} from "@tabler/icons-react";
import { useActionState, useState } from "react";
import { toast } from "sonner";

type Props = {
  userProfile?: Awaited<ReturnType<typeof getUserProfile>>;
  userLanguages?: Awaited<ReturnType<typeof getUserLanguages>>;
};

export function ProfileInformationForm({ userProfile, userLanguages }: Props) {
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
            <span>slug</span>
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
            <span>Full Name</span>
          </>
        }
        helperText="If full name is not provided, the one in your github profile will be used."
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
            <span>Biography</span>
          </>
        }
        defaultValue={state?.data?.biography ?? userProfile?.biography ?? ""}
        placeholder="Tell us about yourself"
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
            <span>LinkedIn URL</span>
          </>
        }
        defaultValue={
          state?.data?.linkedInUrl ?? userProfile?.linkedInUrl ?? ""
        }
        placeholder="https://www.linkedin.com/in/your-profile"
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
            <span>GitHub URL</span>
          </>
        }
        defaultValue={state?.data?.githubUrl ?? userProfile?.githubUrl ?? ""}
        placeholder="https://www.github.com/your-profile"
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
            <span>X URL</span>
          </>
        }
        defaultValue={state?.data?.xUrl ?? userProfile?.xUrl ?? ""}
        placeholder="https://www.x.com/your-profile"
        error={state?.errors?.xUrl ?? ""}
      />

      <LanguagesPicker languages={languages} setLanguages={setLanguages} />

      <LoadingButton isLoading={isPending} className="mt-4 md:w-fit">
        Save
      </LoadingButton>
    </form>
  );
}
