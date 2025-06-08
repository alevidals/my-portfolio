import type {
  deleteEducationSchema,
  insertEducationSchema,
  updateEducationSchema,
} from "@/features/dashboard/educations/lib/schema";
import type { educations } from "@/shared/lib/db/schema";
import type { z } from "zod";

export type InsertEducation = typeof educations.$inferInsert;

export type UpdateEducation = Omit<InsertEducation, "id"> & {
  id: string;
};

export type InsertEducationSchema = z.infer<typeof insertEducationSchema>;

export type UpdateEducationSchema = z.infer<typeof updateEducationSchema>;

export type DeleteEducationSchema = z.infer<typeof deleteEducationSchema>;
