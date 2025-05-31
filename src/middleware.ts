export { auth as middleware } from "@/auth";

export const config = {
  matcher: ["/((?!sign-in|forget-password|reset-password).*)"],
};
