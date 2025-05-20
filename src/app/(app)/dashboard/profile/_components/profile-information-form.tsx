"use client";

import { insertUserProfile } from "@/app/(app)//dashboard/profile/_lib/actions";
import type { getUserProfile } from "@/app/(app)//dashboard/profile/_lib/queries";
import type { Language } from "@/app/(app)/dashboard/profile/_lib/types";
import { FormItem } from "@/components/form-item";
import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { getUserLanguages } from "@/lib/queries";
import { Label } from "@radix-ui/react-label";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconLanguage,
  IconLink,
  IconPlus,
  IconTrash,
  IconTypography,
  IconUser,
} from "@tabler/icons-react";
import { useActionState, useState } from "react";
import { toast } from "sonner";
import { v7 as uuidv7 } from "uuid";

type Props = {
  userProfile?: Awaited<ReturnType<typeof getUserProfile>>;
  userLanguages?: Awaited<ReturnType<typeof getUserLanguages>>;
};

export function ProfileInformationForm({ userProfile, userLanguages }: Props) {
  const [languages, setLanguages] = useState<Language[]>(
    () =>
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

  function addLanguage() {
    setLanguages((prev) => [
      ...prev,
      { id: uuidv7(), name: "", level: "beginner" },
    ]);
  }

  function removeLanguage(index: number) {
    setLanguages((prev) => prev.filter((_, i) => i !== index));
  }

  function updateLanguage(index: number, field: keyof Language, value: string) {
    const updatedLanguages = [...languages];
    updatedLanguages[index] = { ...updatedLanguages[index], [field]: value };
    setLanguages(updatedLanguages);
  }

  return (
    <form className="grid gap-4 max-w-xl" action={formAction}>
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

      <Label className="flex items-center gap-2">
        <IconLanguage size={22} />
        <span>Languages</span>
      </Label>

      <div className="space-y-4">
        {languages.map((language, index) => (
          <div
            key={language.id}
            className="grid grid-cols-[1fr_1fr_auto] gap-4"
          >
            <div>
              <Label
                htmlFor={`language-${index}`}
                className="block  font-medium mb-1"
              >
                Language
              </Label>
              <Input
                id={`language-${index}`}
                value={language.name}
                onChange={(e) => updateLanguage(index, "name", e.target.value)}
                placeholder="Spanish, English, French..."
                required
              />
            </div>

            <div>
              <Label
                htmlFor={`level-${index}`}
                className="block  font-medium mb-1"
              >
                Level
              </Label>
              <Select
                value={language.level}
                onValueChange={(value) => updateLanguage(index, "level", value)}
              >
                <SelectTrigger id={`level-${index}`} className="w-full">
                  <SelectValue placeholder="Choose a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="native">Native</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeLanguage(index)}
              className="self-end"
            >
              <IconTrash className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addLanguage}
          className="w-full"
        >
          <IconPlus className="h-4 w-4 mr-2" /> Add Language
        </Button>
      </div>

      <LoadingButton isLoading={isPending} className="mt-4 md:w-fit">
        Save
      </LoadingButton>
    </form>
  );
}
