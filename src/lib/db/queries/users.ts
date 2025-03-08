import { db } from "@/lib/db/drizzle";
import { usersSchema, type InsertUser } from "@/lib/db/schema";

type ExistsUserParams = Pick<InsertUser, "email" | "username">;

export async function existsUser({ email, username }: ExistsUserParams) {
  try {
    const user = await db.query.usersSchema.findFirst({
      columns: {
        email: true,
        username: true,
      },
      where: (usersSchema, { eq, or }) =>
        or(eq(usersSchema.email, email), eq(usersSchema.username, username)),
    });

    return user;
  } catch {
    return undefined;
  }
}

export async function addUser(user: InsertUser) {
  try {
    const [createdUser] = await db.insert(usersSchema).values(user).returning({
      id: usersSchema.id,
    });

    return createdUser;
  } catch {
    return undefined;
  }
}
