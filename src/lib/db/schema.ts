import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v7 as uuidv7 } from "uuid";

export const userProfiles = sqliteTable("user_profiles", {
  userId: text("user_id").primaryKey(),
  slug: text("slug").notNull().unique(),
  fullName: text("full_name"),
  biography: text("biography"),
  linkedInUrl: text("linkedin_url"),
  githubUrl: text("github_url"),
  xUrl: text("x_url"),
  preferredPortfolio: text("preferred_portfolio", {
    enum: ["evil-rabbit", "studio-535"],
  }),
});

export const projects = sqliteTable("projects", {
  id: text("id").$defaultFn(uuidv7).primaryKey(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  deploymentUrl: text("deployment_url"),
  repositoryUrl: text("repository_url"),
  technologies: text("technologies", { mode: "json" })
    .notNull()
    .$type<string[]>()
    .default(sql`(json_array())`),
  createdAt: text("created_at").notNull().default(sql`(CURRENT_TIMESTAMP)`),
});

export const workExperiences = sqliteTable("work_experiences", {
  id: text("id").$defaultFn(uuidv7).primaryKey(),
  userId: text("user_id").notNull(),
  companyName: text("company_name").notNull(),
  position: text("position").notNull(),
  startDate: text("start_date", { mode: "json" })
    .$type<{ month: string; year: string }>()
    .notNull(),
  endDate: text("end_date", { mode: "json" }).$type<{
    month: string;
    year: string;
  }>(),
  description: text("description"),
});

export const educations = sqliteTable("educations", {
  id: text("id").$defaultFn(uuidv7).primaryKey(),
  userId: text("user_id").notNull(),
  institution: text("institution").notNull(),
  degree: text("degree").notNull(),
  startDate: text("start_date", { mode: "json" })
    .$type<{ month: string; year: string }>()
    .notNull(),
  endDate: text("end_date", { mode: "json" }).$type<{
    month: string;
    year: string;
  }>(),
  description: text("description"),
});

export const languages = sqliteTable("languages", {
  id: text("id").$defaultFn(uuidv7).primaryKey(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  level: text("level", {
    enum: ["beginner", "basic", "intermediate", "advanced", "native"],
  }).notNull(),
});
