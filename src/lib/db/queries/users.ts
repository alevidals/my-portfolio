import { verifyToken } from "@/lib/auth";
import { db } from "@/lib/db/drizzle";
import { usersSchema, type InsertUser } from "@/lib/db/schema";
import { cookies } from "next/headers";

type ExistsUserParams = Pick<InsertUser, "email" | "username">;

type ExistsUserWithPasswordParams = Pick<InsertUser, "email">;

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

export async function existsUserWithPassword({
  email,
}: ExistsUserWithPasswordParams) {
  try {
    const user = await db.query.usersSchema.findFirst({
      columns: {
        id: true,
        email: true,
        password: true,
      },
      where: (usersSchema, { eq }) => eq(usersSchema.email, email),
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

export async function getUser() {
  const sessionCookie = (await cookies()).get("session");

  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }

  const sessionData = await verifyToken({ token: sessionCookie.value });

  if (!sessionData || !sessionData.user || !sessionData.user.id) {
    return null;
  }

  if (new Date(sessionData.expires) < new Date()) {
    return null;
  }

  const user = await db.query.usersSchema.findFirst({
    columns: {
      id: true,
      name: true,
      surname: true,
      username: true,
      email: true,
    },
    where: (usersSchema, { eq }) => eq(usersSchema.id, sessionData.user.id),
  });

  if (!user) {
    return null;
  }

  return user;
}
