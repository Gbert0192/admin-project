import NextAuth, { NextAuthConfig, Session, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AuthenticationError } from "./error";
import { JWT } from "next-auth/jwt";

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
          `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,
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

        const data = (await res.json()) as {
          data: {
            user: {
              id: string;
              student_id: string;
              name: string;
              email: string;
              role: string;
            };
            token: string;
            permission: string[];
          };
        };

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
    jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.student_id = user.student_id;
        token.token = user.token;
        token.permission = user.permission;
      }
      return token;
    },
    session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.student_id = token.student_id;
        session.user.token = token.token;
        session.user.permission = token.permission;
      }
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
