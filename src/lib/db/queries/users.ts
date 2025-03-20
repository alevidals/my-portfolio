import { verifyToken } from "@/lib/auth";
import { db } from "@/lib/db/drizzle";
import {
  educationsSchema,
  usersSchema,
  type InsertUser,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

type ExistsUserParams = Pick<InsertUser, "email" | "username">;

type ExistsUserWithPasswordParams = Pick<InsertUser, "email">;

type UpdateUser = Pick<
  InsertUser,
  "biography" | "githubUrl" | "linkedinUrl" | "contactEmail"
>;

type UpdateUserParams = {
  userId: string;
  user: UpdateUser;
};

type GetPortfolioInfoParams = {
  username: string;
};

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
      biography: true,
      githubUrl: true,
      linkedinUrl: true,
      contactEmail: true,
    },
    where: (usersSchema, { eq }) => eq(usersSchema.id, sessionData.user.id),
  });

  if (!user) {
    return null;
  }

  return user;
}

export async function updateUser({ userId, user }: UpdateUserParams) {
  try {
    const updatedUser = await db
      .update(usersSchema)
      .set(user)
      .where(eq(usersSchema.id, userId))
      .returning({
        id: usersSchema.id,
      });

    return updatedUser;
  } catch {
    return undefined;
  }
}

export async function getPortfolioInfo({ username }: GetPortfolioInfoParams) {
  try {
    const portfolioInformation = await db.query.usersSchema
      .findFirst({
        columns: {
          name: true,
          surname: true,
          username: true,
          biography: true,
          githubUrl: true,
          linkedinUrl: true,
          contactEmail: true,
        },
        with: {
          educations: {
            columns: {
              id: true,
              institution: true,
              degree: true,
              startDate: true,
              endDate: true,
            },
          },
          workExperiences: {
            columns: {
              id: true,
              companyName: true,
              position: true,
              startDate: true,
              endDate: true,
            },
          },
        },
        where: (usersSchema, { eq }) => eq(usersSchema.username, username),
      })
      .catch((er) => {
        console.log("AQUI");
        console.log(er);
      });

    return portfolioInformation;
  } catch {
    return undefined;
  }
}
