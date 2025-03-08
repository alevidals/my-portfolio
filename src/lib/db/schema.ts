import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
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

export type InsertUser = typeof usersSchema.$inferInsert;
export type SelectUser = typeof usersSchema.$inferSelect;
