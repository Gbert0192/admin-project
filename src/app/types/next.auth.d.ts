// types/next-auth.d.ts
import { DefaultSession } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role_id: number;
      student_id: string;
      token: string;
      permission: string[];
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role_id: number;
    student_id: string;
    token: string;
    permission: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role_id: number;
    student_id: string;
    token: string;
    permission: string[];
  }
}
