import { cn } from "@/shared/lib/utils";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
} from "@tabler/icons-react";

type Props = {
  email?: string;
  githubUrl?: string | null;
  linkedInUrl?: string | null;
  xUrl?: string | null;
  className?: string;
};

export function SocialLinks({
  email,
  githubUrl,
  linkedInUrl,
  xUrl,
  className,
}: Props) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {email && (
        <a
          href={`mailto:${email}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-neutral-300 transition-colors"
        >
          <IconMail size={26} />
        </a>
      )}
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-neutral-300 transition-colors"
        >
          <IconBrandGithub size={26} />
        </a>
      )}
      {linkedInUrl && (
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-neutral-300 transition-colors"
        >
          <IconBrandLinkedin size={26} />
        </a>
      )}
      {xUrl && (
        <a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-neutral-300 transition-colors"
        >
          <IconBrandX size={26} />
        </a>
      )}
    </div>
  );
}
