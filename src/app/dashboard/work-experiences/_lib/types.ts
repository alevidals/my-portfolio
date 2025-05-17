import type {
  deleteWorkExperienceSchema,
  insertWorkExperienceSchema,
} from "@/app/dashboard/work-experiences/_lib/schema";
import type { workExperiences } from "@/lib/db/schema";
import type { z } from "zod";

export type InsertWorkExperience = typeof workExperiences.$inferInsert;

export type InsertWorkExperienceSchema = z.infer<
  typeof insertWorkExperienceSchema
>;

export type DeleteWorkExperienceSchema = z.infer<
  typeof deleteWorkExperienceSchema
>;
