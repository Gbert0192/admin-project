// middleware.ts

import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  if (!session) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  const userRole = Number(session.user?.role_id);

  if (userRole !== 1 && !pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (userRole === 1 && !pathname.startsWith("/")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Config matcher Anda sudah benar.
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sign-in|sign-out|reset-password|forget-password|unauthorized).*)",
  ],
};
