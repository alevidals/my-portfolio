import type {
  deleteWorkExperienceSchema,
  insertWorkExperienceSchema,
  updateWorkExperienceSchema,
} from "@/features/dashboard/work-experiences/lib/schema";
import type { workExperiences } from "@/shared/lib/db/schema";
import type { z } from "zod";

export type InsertWorkExperience = typeof workExperiences.$inferInsert;

export type UpdateWorkExperience = Omit<InsertWorkExperience, "id"> & {
  id: string;
};

export type InsertWorkExperienceSchema = z.infer<
  typeof insertWorkExperienceSchema
>;

export type UpdateWorkExperienceSchema = z.infer<
  typeof updateWorkExperienceSchema
>;

export type DeleteWorkExperienceSchema = z.infer<
  typeof deleteWorkExperienceSchema
>;
