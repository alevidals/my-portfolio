export type ActionResponse<T> = {
  data?: Partial<T>;
} & {
  success: boolean;
  message?: string;
  error?: string;
  errors?: Partial<T>;
};
