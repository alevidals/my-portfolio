import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v7 as uuidv7 } from "uuid";

export const userProfiles = sqliteTable("user_profiles", {
  userId: text("user_id").primaryKey(),
  biography: text("biography"),
  linkedInUrl: text("linkedin_url"),
  githubUrl: text("github_url"),
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
