import type {
  deleteEducationSchema,
  insertEducationSchema,
  updateEducationSchema,
} from "@/app/dashboard/educations/_lib/schema";
import type { educations } from "@/lib/db/schema";
import type { z } from "zod";

export type InsertEducation = typeof educations.$inferInsert;

export type UpdateEducation = Omit<InsertEducation, "id"> & {
  id: string;
};

export type InsertEducationSchema = z.infer<typeof insertEducationSchema>;

export type UpdateEducationSchema = z.infer<typeof updateEducationSchema>;

export type DeleteEducationSchema = z.infer<typeof deleteEducationSchema>;
