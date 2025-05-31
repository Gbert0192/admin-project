import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      student_id: string;
      permission: string[];
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    student_id: string;
    token: string;
    permission: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    student_id: string;
    permission: string[];
  }
}
