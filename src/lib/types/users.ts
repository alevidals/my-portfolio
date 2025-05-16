import type { userProfiles } from "@/lib/db/schema";
import type { insertUserProfileSchema } from "@/lib/schema/user";
import type { z } from "zod";

export type InsertUserProfile = typeof userProfiles.$inferInsert;
export type InsertUserProfileSchema = z.infer<typeof insertUserProfileSchema>;
