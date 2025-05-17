"use client";

import { insertUserProfile } from "@/app/(app)//dashboard/profile/_lib/actions";
import type { insertUserProfile as insertUserProfileQuery } from "@/app/(app)//dashboard/profile/_lib/queries";
import { FormItem } from "@/components/form-item";
import { LoadingButton } from "@/components/loading-button";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconLink,
  IconTypography,
} from "@tabler/icons-react";
import { useActionState } from "react";
import { toast } from "sonner";

type Props = {
  userProfile?: Awaited<ReturnType<typeof insertUserProfileQuery>>;
};

export function ProfileInformationForm({ userProfile }: Props) {
  const [state, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => {
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
      <FormItem
        id="biography"
        name="biography"
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
      <LoadingButton isLoading={isPending}>Save</LoadingButton>
      {/*<Button type="submit">Save</Button>*/}
    </form>
  );
}
