import type { insertUserProfileSchema } from "@/app/(app)//dashboard/profile/_lib/schema";
import type { userProfiles } from "@/lib/db/schema";
import type { z } from "zod";

export type InsertUserProfile = typeof userProfiles.$inferInsert;
export type InsertUserProfileSchema = z.infer<typeof insertUserProfileSchema>;
