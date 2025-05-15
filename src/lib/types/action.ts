export type ActionResponse<T> = Partial<T> & {
  success: boolean;
  message?: string;
  error?: string;
  errors?: Partial<T>;
};
