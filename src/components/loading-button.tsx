import { Button, type Props as ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconLoader2 } from "@tabler/icons-react";

type Props = ButtonProps & {
  isLoading: boolean;
};

export function LoadingButton({ isLoading, children, ...rest }: Props) {
  return (
    <Button
      {...rest}
      disabled={isLoading}
      className={cn("relative", rest.className)}
    >
      <span className={`${isLoading ? "invisible" : "visible"}`}>
        {children}
      </span>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <IconLoader2 className="h-4 w-4 animate-spin" />
        </div>
      )}
    </Button>
  );
}
