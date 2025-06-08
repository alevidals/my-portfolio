import {
  Button,
  type Props as ButtonProps,
} from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { IconLoader2 } from "@tabler/icons-react";
import type { ReactNode } from "react";

type Props = ButtonProps & {
  isLoading?: boolean;
  icon?: ReactNode;
};

export function LoadingButton({ isLoading, icon, children, ...rest }: Props) {
  return (
    <Button
      {...rest}
      disabled={isLoading}
      className={cn("relative", rest.className)}
    >
      <span
        className={cn("flex items-center gap-2", {
          invisible: isLoading,
          visible: !isLoading,
        })}
      >
        <span>{children}</span>
        {icon && icon}
      </span>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <IconLoader2 className="h-4 w-4 animate-spin" />
        </div>
      )}
    </Button>
  );
}
