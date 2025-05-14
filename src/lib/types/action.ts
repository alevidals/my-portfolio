export type ActionResponse<T> = T &
  (
    | {
        success: true;
        message: string;
      }
    | {
        success: false;
        error: string;
        errors?: Partial<T>;
      }
  );
