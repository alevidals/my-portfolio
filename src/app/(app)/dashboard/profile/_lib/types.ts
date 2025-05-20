import type { insertUserProfileSchema } from "@/app/(app)//dashboard/profile/_lib/schema";
import type { languages, userProfiles } from "@/lib/db/schema";
import type { z } from "zod";

export type InsertUserProfile = typeof userProfiles.$inferInsert;
export type InsertUserProfileSchema = z.infer<typeof insertUserProfileSchema>;

export type InsertLanguages = typeof languages.$inferInsert;
type SelectLanguage = typeof languages.$inferSelect;

export type Language = Pick<SelectLanguage, "id" | "name" | "level">;
