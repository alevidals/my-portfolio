import { verifyToken, signToken } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = "/dashboard";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("session");
  const isProtectedRoute = pathname.startsWith(protectedRoutes);

  if (!sessionCookie && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const response = NextResponse.next();

  // TODO: check if only needed when token is close to expiring
  if (sessionCookie && request.method === "GET") {
    try {
      const parsed = await verifyToken({
        token: sessionCookie.value,
      });
      const expiresInOneWeek = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

      const newToken = await signToken({
        payload: {
          ...parsed,
          expires: expiresInOneWeek.toISOString(),
        },
      });

      response.cookies.set({
        name: "session",
        value: newToken,
        httpOnly: true,
        expires: expiresInOneWeek,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    } catch {
      response.cookies.delete("session");
      if (isProtectedRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
