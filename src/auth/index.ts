import NextAuth, { NextAuthConfig, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { InvalidCredentialsError, InvalidUserError } from "./error";
import { ISessionMenu, ISessionPermission } from "@/app/types/next.auth";

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

        if (res.status === 401) {
          throw new InvalidCredentialsError();
        }
        if (res.status === 404) {
          throw new InvalidUserError();
        }
        if (!res.ok) {
          throw new Error("An error occurred while signing in");
        }

        const data = (await res.json()) as {
          data: {
            user: {
              id: string;
              student_id: string;
              name: string;
              role_name: string;
              role_id: string;
            };
            token: string;
            permission: ISessionPermission[];
            menus: ISessionMenu[];
          };
        };

        if (!data) {
          throw new Error("Invalid credentials");
        }

        return {
          id: data.data.user.id,
          student_id: data.data.user.student_id,
          name: data.data.user.name,
          token: data.data.token,
          permission: data.data.permission,
          role_id: data.data.user.role_id,
          role_name: data.data.user.role_name,
          menus: data.data.menus,
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
        token.role_id = user.role_id;
        token.role_name = user.role_name;
        token.student_id = user.student_id;
        token.token = user.token;
        token.permission = user.permission;
        token.menus = user.menus;
      }
      return token;
    },
    session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id;
        session.user.role_id = token.role_id;
        session.user.role_name = token.role_name;
        session.user.student_id = token.student_id;
        session.user.token = token.token;
        session.user.permission = token.permission;
        session.user.menus = token.menus;
      }
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
