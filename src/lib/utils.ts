import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { z, ZodError } from "zod";

type ParseFormErrorsParams<T> = {
  error: ZodError<T>;
};

type ValidateActionParams<S extends z.ZodType> = {
  formData: FormData;
  schema: S;
};

type FormErrors<T> = {
  [K in keyof T]?: string;
};

export type FormResponse<T> = {
  success?: boolean;
  message?: string;
  data?: T;
  errors?: FormErrors<T>;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function parseFormErrors<T>({ error }: ParseFormErrorsParams<T>) {
  const { errors } = error;

  const result: FormErrors<T> = {};

  for (const error of errors) {
    const {
      path: [path],
      message,
    } = error;

    result[path as keyof T] = message;
  }

  return result;
}

export function validateAction<S extends z.ZodType>({
  formData,
  schema,
}: ValidateActionParams<S>) {
  const data = Object.fromEntries(formData.entries()) as z.infer<S>;
  const result = schema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: parseFormErrors<z.infer<S>>({
        error: result.error,
      }),
      data,
    };
  }

  return {
    success: true,
    data,
  };
}
