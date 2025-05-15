import type { projects } from "@/lib/db/schema";
import type {
  importProjectsSchema,
  insertProjectSchema,
} from "@/lib/schema/projects";
import type { z } from "zod";

export type InsertProject = typeof projects.$inferInsert;

export type InsertProjectSchema = z.infer<typeof insertProjectSchema>;
export type ImportProjectsSchema = z.infer<typeof importProjectsSchema>;
