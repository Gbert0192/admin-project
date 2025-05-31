export { auth as middleware } from "@/auth";
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sign-in|forget-password|reset-password).*)",
  ],
};
