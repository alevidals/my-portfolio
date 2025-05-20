import type { InsertUserProfile } from "@/app/(app)/dashboard/profile/_lib/types";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconBrush } from "@tabler/icons-react";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";

type PreferredPortfolio = NonNullable<InsertUserProfile["preferredPortfolio"]>;

type Props = {
  preferredPortfolio: PreferredPortfolio;
  setPreferredPortfolio: Dispatch<SetStateAction<PreferredPortfolio>>;
};

export function PortfolioPicker({
  preferredPortfolio,
  setPreferredPortfolio,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <Label
        htmlFor="preferredPortfolio"
        className="flex items-center gap-2 text-sm "
      >
        <IconBrush size={22} />
        <span>Preferred Portfolio</span>
      </Label>
      <Select
        value={preferredPortfolio}
        onValueChange={(value) => {
          if (value) {
            setPreferredPortfolio(value as PreferredPortfolio);
          }
        }}
      >
        <SelectTrigger className="w-full !h-10">
          <SelectValue
            placeholder="Choose a portfolio"
            id="preferredPortfolio"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="evil-rabbit">Evil Rabbit</SelectItem>
          <SelectItem value="studio-535">Studio 535</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-sm text-muted-foreground">
        See theme preview with an example at{" "}
        <Link
          href={`/portfolio/alevidals?preview=${preferredPortfolio}`}
          className="hover:underline hover:underline-offset-4"
          target="_blank"
        >
          {`${process.env.NEXT_PUBLIC_SITE_URL}/portfolio/alevidals?preview=${preferredPortfolio}`}
        </Link>
      </p>
    </div>
  );
}
