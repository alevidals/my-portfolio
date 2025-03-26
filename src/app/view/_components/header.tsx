"use client";

import { Button } from "@/components/ui/button";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Props = {
  socialLinks: {
    github: string | null;
    linkedin: string | null;
    email: string | null;
  };
};

export function Header({ socialLinks }: Props) {
  const { username } = useParams();

  return (
    <header className="container mx-auto sticky max-w-4xl top-0 bg-background z-50">
      <div className="h-12 flex items-center justify-between">
        <Link href="/">
          <h1 className="text-xl font-bold">{username}</h1>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="flex">
            <Button variant="link" className="text-base">
              <Link href="#educations">Educations</Link>
            </Button>
            <Button variant="link" className="text-base">
              <Link href="#experiences">Experiences</Link>
            </Button>
          </nav>
          <div className="flex gap-4">
            {socialLinks.github && (
              <a href={socialLinks.github} target="_blank" rel="noreferrer">
                <IconBrandGithub size={28} />
              </a>
            )}
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">
                <IconBrandLinkedin size={28} />
              </a>
            )}
            {socialLinks.email && (
              <a href={`mailto:${socialLinks.email}`}>
                <IconMail size={28} />
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
