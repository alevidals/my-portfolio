import { HeaderLink } from "@/shared/components/header-link";

type Props = {
  slug?: string;
};

export async function DesktopNav({ slug }: Props) {
  return (
    <div className="hidden md:flex">
      <nav className="flex gap-4 font-bold">
        <HeaderLink href="/dashboard" label="/dashboard" />
        {slug && (
          <HeaderLink
            href={`/portfolio/${slug}`}
            label="/portfolio"
            target="_blank"
          />
        )}
      </nav>
    </div>
  );
}
