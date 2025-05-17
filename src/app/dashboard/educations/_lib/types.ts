import type { insertEducationSchema } from "@/app/dashboard/educations/_lib/schema";
import type { educations } from "@/lib/db/schema";
import type { z } from "zod";

export type InsertEducation = typeof educations.$inferInsert;

export type InsertEducationSchema = z.infer<typeof insertEducationSchema>;
