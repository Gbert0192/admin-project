import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  if (!token?.token) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  const isExpired = Date.now() / 1000 > token.exp!;
  if (isExpired) {
    const unauthorizedUrl = new URL("/unauthorized", request.url);
    unauthorizedUrl.searchParams.set("callbackUrl", pathname);
    unauthorizedUrl.searchParams.set("error", "SessionExpired");
    return NextResponse.redirect(unauthorizedUrl);
  }

  const session = await auth();
  if (!session?.user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const isAdmin = session?.user?.role_name === "User";
  const isAccessingAdminPages = pathname.startsWith("/admin");

  if (!isAdmin && !isAccessingAdminPages) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (isAdmin && isAccessingAdminPages) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sign-in|sign-out|reset-password|forget-password|unauthorized).*)",
  ],
};
