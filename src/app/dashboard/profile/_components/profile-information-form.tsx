"use client";

import { insertUserProfile } from "@/app/dashboard/profile/_actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { insertUserProfile as insertUserProfileQuery } from "@/lib/queries/user";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconTypography,
} from "@tabler/icons-react";
import { useActionState } from "react";

type Props = {
  userProfile?: Awaited<ReturnType<typeof insertUserProfileQuery>>;
};

export function ProfileInformationForm({ userProfile }: Props) {
  const [state, formAction, isPending] = useActionState(
    insertUserProfile,
    null,
  );

  return (
    <form className="grid gap-4" action={formAction}>
      <div className="grid gap-3">
        <Label htmlFor="biography">
          <IconTypography size={22} />
          <span>Biography</span>
        </Label>
        <Textarea
          id="biography"
          name="biography"
          defaultValue={state?.biography ?? userProfile?.biography ?? ""}
        />
        {!state?.success && state?.errors?.biography && (
          <p className="text-red-500 text-sm">{state.errors.biography}</p>
        )}
      </div>

      <div className="grid gap-3">
        <Label htmlFor="linkedInUrl">
          <IconBrandLinkedin size={22} />
          <span>LinkedIn URL</span>
        </Label>
        <Input
          id="linkedInUrl"
          name="linkedInUrl"
          type="url"
          defaultValue={userProfile?.linkedInUrl ?? ""}
          placeholder="https://www.linkedin.com/in/your-profile"
        />
        {!state?.success && state?.errors?.linkedInUrl && (
          <p className="text-red-500 text-sm">{state.errors.linkedInUrl}</p>
        )}
      </div>

      <div className="grid gap-3">
        <Label htmlFor="githubUrl">
          <IconBrandGithub size={22} />
          <span>GitHub URL</span>
        </Label>
        <Input
          id="githubUrl"
          name="githubUrl"
          type="url"
          defaultValue={userProfile?.githubUrl ?? ""}
          placeholder="https://www.github.com/your-profile"
        />
        {!state?.success && state?.errors?.githubUrl && (
          <p className="text-red-500 text-sm">{state.errors.githubUrl}</p>
        )}
      </div>

      <Button type="submit">Save</Button>
    </form>
  );
}
