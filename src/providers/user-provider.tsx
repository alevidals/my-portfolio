"use client";

import type { getUser } from "@/lib/db/queries/users";
import { createContext, type ReactNode, useContext } from "react";

type SessionUser = Awaited<ReturnType<typeof getUser>>;

type UserContextType = {
  userPromise: Promise<SessionUser | null>;
};

const UserContext = createContext<UserContextType | null>(null);

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}

export function UserProvider({
  children,
  userPromise,
}: { children: ReactNode; userPromise: Promise<SessionUser | null> }) {
  return (
    <UserContext.Provider value={{ userPromise }}>
      {children}
    </UserContext.Provider>
  );
}
