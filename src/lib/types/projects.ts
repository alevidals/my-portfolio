import type { projects } from "@/lib/db/schema";
import type { insertProjectSchema } from "@/lib/schema/projects";
import type { z } from "zod";

export type InsertProject = typeof projects.$inferInsert;
export type InsertProjectSchema = z.infer<typeof insertProjectSchema>;
