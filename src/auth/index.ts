import NextAuth, { CredentialsSignin, NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { toast } from "sonner";
import { AuthenticationError } from "./error";

export const BASE_PATH = "/api/auth";

const authOptions: NextAuthConfig = {
  trustHost: true,
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  session: {
    maxAge: 60 * 60 * 24 * 30,
  },
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        student_id: {
          type: "number",
          label: "Student ID",
          placeholder: "231110111",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },

      async authorize(credentials): Promise<User | null> {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              student_id: credentials?.student_id,
              password: credentials?.password,
            }),
          }
        );

        if (res.status !== 200) {
          throw new AuthenticationError();
        }

        if (!res.ok) return null;

        const data = await res.json();
        if (!data) {
          throw new Error("Invalid credentials");
        }

        return {
          id: data.data.user.id,
          student_id: data.data.user.student_id,
          name: data.data.user.name,
          email: data.data.user.email,
          role: data.data.user.role,
          token: data.data.token,
          permission: data.data.permission,
        };
      },
    }),
  ],

  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.student_id = user.student_id;
        token.token = user.token;
        token.permission = user.permission;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.student_id = token.student_id as string;
        session.user.token = token.token as string;
        session.user.permission = token.permission as Array<string>;
      }
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
