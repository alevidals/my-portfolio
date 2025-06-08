import { env } from "@/shared/lib/env";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "./schema";

if (!env.TURSO_AUTH_TOKEN || !env.TURSO_DATABASE_URL) {
  throw new Error("TURSO_AUTH_TOKEN and TURSO_DATABASE_URL must be set");
}

const client = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
});

export const db = drizzle({ client, schema });
