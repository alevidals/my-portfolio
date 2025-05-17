import type {
  deleteWorkExperienceSchema,
  insertWorkExperienceSchema,
  updateWorkExperienceSchema,
} from "@/app/(app)//dashboard/work-experiences/_lib/schema";
import type { workExperiences } from "@/lib/db/schema";
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
