import { db } from "@/lib/db/drizzle";

export async function getTechnologies() {
  try {
    const technologies = await db.query.technologiesSchema.findMany();

    return technologies;
  } catch {
    return [];
  }
}
