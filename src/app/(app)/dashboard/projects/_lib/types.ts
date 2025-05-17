import type {
  deleteProjectSchema,
  getRepositoriesResponseSchema,
  getRepositoryLanguagesResponseSchema,
  importProjectsSchema,
  insertProjectSchema,
  updateProjectSchema,
} from "@/app/(app)//dashboard/projects/_lib/schema";
import type { projects } from "@/lib/db/schema";
import type { z } from "zod";

export type Repository = {
  id: number;
  name: string;
  description: string | null;
  deploymentUrl: string | null;
  repositoryUrl: string;
  stars: number;
  username: string;
  technologies?: string[] | undefined;
};

export type InsertProject = typeof projects.$inferInsert;

export type UpdateProject = Omit<InsertProject, "id"> & {
  id: string;
};

export type InsertProjectSchema = z.infer<typeof insertProjectSchema>;

export type ImportProjectsSchema = z.infer<typeof importProjectsSchema>;

export type UpdateProjectSchema = z.infer<typeof updateProjectSchema>;

export type DeleteProjectSchema = z.infer<typeof deleteProjectSchema>;

export type GetRespositoriesResponse = z.infer<
  typeof getRepositoriesResponseSchema
>;

export type GetRepositoryLanguagesResponse = z.infer<
  typeof getRepositoryLanguagesResponseSchema
>;
