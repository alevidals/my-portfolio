import { hash } from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const SALT_ROUNDS = 10;
const KEY = new TextEncoder().encode(process.env.AUTH_SECRET);

type HashPasswordParams = {
  password: string;
};

type SetSessionParams = {
  userId: string;
};

type SignTokenParams = {
  payload: SessionData;
};

type SessionData = {
  user: {
    id: string;
  };
  expires: string;
};

export async function hashPassword({ password }: HashPasswordParams) {
  return hash(password, SALT_ROUNDS);
}

async function signToken({ payload }: SignTokenParams) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 week from now")
    .sign(KEY);
}

export async function setSession({ userId }: SetSessionParams) {
  const expiresInOneWeek = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

  const session: SessionData = {
    user: {
      id: userId,
    },
    expires: expiresInOneWeek.toISOString(),
  };

  const encryptedSession = await signToken({ payload: session });

  const cookieStore = await cookies();

  cookieStore.set("session", encryptedSession, {
    expires: expiresInOneWeek,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}
