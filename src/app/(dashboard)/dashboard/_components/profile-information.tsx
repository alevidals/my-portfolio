"use client";

import { editProfileInformation } from "@/app/(dashboard)/dashboard/_actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/providers/user-provider";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";
import { use, useActionState } from "react";

export function ProfileInformation() {
  const { userPromise } = useUser();
  const user = use(userPromise);

  const [state, action, pending] = useActionState(editProfileInformation, null);

  return (
    <section>
      <header className="flex justify-between items-center">
        <h2 className="text-3xl mb-4">Profile information</h2>
      </header>
      <form className="grid gap-4" action={action}>
        <div className="grid gap-1.5">
          <Label htmlFor="biography">Biography</Label>
          <Textarea
            id="biography"
            name="biography"
            className="max-h-52"
            placeholder="Tell us about yourself"
            defaultValue={state?.data?.biography || user?.biography || ""}
          />
          {state?.errors?.biography && (
            <p className="text-red-500 text-sm">{state.errors.biography}</p>
          )}
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="linkedinUrl" className="flex items-center">
            <IconBrandLinkedin size={22} />
            LinkedIn URL
          </Label>
          <Input
            type="url"
            id="linkedinUrl"
            name="linkedinUrl"
            placeholder="LinkedIn URL"
            defaultValue={state?.data?.linkedinUrl || user?.linkedinUrl || ""}
          />
          {state?.errors?.linkedinUrl && (
            <p className="text-red-500 text-sm">{state.errors.linkedinUrl}</p>
          )}
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="githubUrl" className="flex items-center">
            <IconBrandGithub size={22} />
            <span>GitHub URL</span>
          </Label>
          <Input
            type="url"
            id="githubUrl"
            name="githubUrl"
            placeholder="GitHub URL"
            defaultValue={state?.data?.githubUrl || user?.githubUrl || ""}
          />
          {state?.errors?.githubUrl && (
            <p className="text-red-500 text-sm">{state.errors.githubUrl}</p>
          )}
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="contactEmail">
            <IconMail size={22} />
            <span>Contact email</span>
          </Label>
          <Input
            type="email"
            id="contactEmail"
            name="contactEmail"
            placeholder="Contact email"
            defaultValue={state?.data?.contactEmail || user?.contactEmail || ""}
          />
          {state?.errors?.contactEmail && (
            <p className="text-red-500 text-sm">{state.errors.contactEmail}</p>
          )}
        </div>
        <Button type="submit" className="w-fit" disabled={pending}>
          Save
        </Button>
      </form>
    </section>
  );
}
