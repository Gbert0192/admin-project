import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";
export async function middleware(request: NextRequest) {
  const session = await auth();

  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  if (new Date(session.expires) < new Date()) {
    const url = request.nextUrl.clone();
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sign-in|sign-out|reset-password|forget-password|unauthorized).*)",
  ],
};
