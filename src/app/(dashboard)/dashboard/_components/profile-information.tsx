"use client";

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
import { use } from "react";

export function ProfileInformation() {
  const { userPromise } = useUser();
  const user = use(userPromise);

  return (
    <section>
      <header className="flex justify-between items-center">
        <h2 className="text-3xl mb-4">Profile information</h2>
      </header>
      <form
        className="grid gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Profile information saved");
        }}
      >
        <div className="grid gap-1.5">
          <Label htmlFor="biography">Biography</Label>
          <Textarea
            id="biography"
            name="biography"
            className="max-h-52"
            placeholder="Tell us about yourself"
            defaultValue={user?.biography || ""}
          />
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
            defaultValue={user?.linkedinUrl || ""}
          />
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
            defaultValue={user?.githubUrl || ""}
          />
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
            defaultValue={user?.contactEmail || ""}
          />
        </div>
        <Button type="submit" className="w-fit">
          Save
        </Button>
      </form>
    </section>
  );
}
