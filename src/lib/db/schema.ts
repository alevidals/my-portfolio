import { relations, sql } from "drizzle-orm";
import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v7 as uuidv7 } from "uuid";

export const usersSchema = sqliteTable("users", {
  id: text("id").$defaultFn(uuidv7).primaryKey(),
  name: text("name").notNull(),
  surname: text("surname").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  username: text("username").notNull().unique(),
  biography: text("biography"),
  linkedinUrl: text("linkedin_url"),
  githubUrl: text("github_url"),
  contactEmail: text("contact_email"),
  created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
});

export const educationsSchema = sqliteTable("educations", {
  id: text("id").$defaultFn(uuidv7).primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => usersSchema.id),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  institution: text("institution").notNull(),
  degree: text("degree").notNull(),
});

export const projectsSchema = sqliteTable("projects", {
  id: text("id").$defaultFn(uuidv7).primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => usersSchema.id),
  name: text("name").notNull(),
  description: text("description").notNull(),
  deployedUrl: text("deployed_url"),
  repositoryUrl: text("repository_url"),
});

export const workExperiencesSchema = sqliteTable("work_experiences", {
  id: text("id").$defaultFn(uuidv7).primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => usersSchema.id),
  companyName: text("company_name").notNull(),
  position: text("position").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
});

export const languagesSchema = sqliteTable("languages", {
  id: text("id").$defaultFn(uuidv7).primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => usersSchema.id),
  language: text("language").notNull(),
  level: text("level", {
    enum: ["A1", "A2", "B1", "B2", "C1/C2"],
  }).notNull(),
});

export const technologiesSchema = sqliteTable("technologies", {
  id: text("id").$defaultFn(uuidv7).primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
});

export const projectTechnologiesSchema = sqliteTable(
  "project_technologies",
  {
    projectId: text("project_id")
      .notNull()
      .references(() => projectsSchema.id),
    technologyId: text("technology_id")
      .notNull()
      .references(() => technologiesSchema.id),
  },
  (table) => [primaryKey({ columns: [table.projectId, table.technologyId] })],
);

export const educationsRelations = relations(educationsSchema, ({ one }) => ({
  user: one(usersSchema, {
    fields: [educationsSchema.userId],
    references: [usersSchema.id],
  }),
}));

export const usersRelations = relations(usersSchema, ({ many }) => ({
  educations: many(educationsSchema),
  projects: many(projectsSchema),
  workExperiences: many(workExperiencesSchema),
  languages: many(languagesSchema),
}));

export const projectsRelations = relations(projectsSchema, ({ one, many }) => ({
  user: one(usersSchema, {
    fields: [projectsSchema.userId],
    references: [usersSchema.id],
  }),
  projectTechnologies: many(projectTechnologiesSchema),
}));

export const workExperiencesRelations = relations(
  workExperiencesSchema,
  ({ one }) => ({
    user: one(usersSchema, {
      fields: [workExperiencesSchema.userId],
      references: [usersSchema.id],
    }),
  }),
);

export const technologiesRelations = relations(
  technologiesSchema,
  ({ many }) => ({
    projectTechnologies: many(projectTechnologiesSchema),
  }),
);

export const projectTechnologiesRelations = relations(
  projectTechnologiesSchema,
  ({ one }) => ({
    project: one(projectsSchema, {
      fields: [projectTechnologiesSchema.projectId],
      references: [projectsSchema.id],
    }),
    technology: one(technologiesSchema, {
      fields: [projectTechnologiesSchema.technologyId],
      references: [technologiesSchema.id],
    }),
  }),
);

export const languagesRelations = relations(languagesSchema, ({ one }) => ({
  user: one(usersSchema, {
    fields: [languagesSchema.userId],
    references: [usersSchema.id],
  }),
}));

export type InsertUser = typeof usersSchema.$inferInsert;
export type SelectUser = typeof usersSchema.$inferSelect;

export type InsertEducation = typeof educationsSchema.$inferInsert;

export type InsertExperience = typeof workExperiencesSchema.$inferInsert;
