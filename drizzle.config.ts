import { env } from "@/shared/lib/env";
import { defineConfig } from "drizzle-kit";

if (!env.TURSO_AUTH_TOKEN || !env.TURSO_DATABASE_URL) {
  throw new Error("TURSO_AUTH_TOKEN and TURSO_DATABASE_URL must be set");
}

export default defineConfig({
  out: "./src/lib/db/migrations",
  schema: "./src/lib/db/schema.ts",
  dialect: "turso",
  dbCredentials: {
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
});
