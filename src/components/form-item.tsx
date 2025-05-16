import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { InputHTMLAttributes, ReactNode } from "react";

type Props = {
  id: string;
  name: string;
  labelChildren: ReactNode;
  placeholder?: string;
  defaultValue?: string;
  helperText?: string;
  required?: boolean;
  error?: string;
} & (
  | {
      itemType: "input";
      type: InputHTMLAttributes<HTMLInputElement>["type"];
    }
  | {
      itemType: "textarea";
      type?: never;
    }
);

export function FormItem({
  id,
  name,
  itemType,
  type,
  labelChildren,
  placeholder,
  defaultValue,
  helperText,
  required,
  error,
}: Props) {
  return (
    <div className="grid gap-3">
      <Label htmlFor={id}>
        {labelChildren}
        {required && <span className="text-red-500 align-super">*</span>}
      </Label>
      {itemType === "input" ? (
        <Input
          id={id}
          name={name}
          type={type}
          className="h-10"
          required={required}
          defaultValue={defaultValue}
          placeholder={placeholder}
        />
      ) : (
        <Textarea
          id={id}
          name={name}
          className="h-10"
          required={required}
          defaultValue={defaultValue}
          placeholder={placeholder}
        />
      )}
      {helperText && (
        <p className="text-sm text-neutral-200 font-light">{helperText}</p>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
