import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v7 as uuidv7 } from "uuid";

export const usersSchema = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const sessionsSchema = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => usersSchema.id, { onDelete: "cascade" }),
});

export const accountsSchema = sqliteTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => usersSchema.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verificationsSchema = sqliteTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
});

export const userProfiles = sqliteTable("user_profiles", {
  id: text("id").$defaultFn(uuidv7).primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => usersSchema.id, {
      onDelete: "cascade",
    }),
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
  userId: text("user_id")
    .notNull()
    .references(() => usersSchema.id, {
      onDelete: "cascade",
    }),
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
  userId: text("user_id")
    .notNull()
    .references(() => usersSchema.id, {
      onDelete: "cascade",
    }),
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
  userId: text("user_id")
    .notNull()
    .references(() => usersSchema.id, {
      onDelete: "cascade",
    }),
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
  userId: text("user_id")
    .notNull()
    .references(() => usersSchema.id, {
      onDelete: "cascade",
    }),
  name: text("name").notNull(),
  level: text("level", {
    enum: ["beginner", "basic", "intermediate", "advanced", "native"],
  }).notNull(),
});
