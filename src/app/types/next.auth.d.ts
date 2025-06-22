import { DefaultSession } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

interface ISessionPermission {
  route: string;
  method: string[];
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    uuid: string;
    role_id: string;
    role_name: string;
    student_id: string;
    token: string;
    permission: ISessionPermission[];
    menus: string[];
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      uuid: string;
      role_id: string;
      role_name: string;
      student_id: string;
      token: string;
      permission: ISessionPermission[];
      menus: string[];
    } & DefaultSession["user"];
  }

  interface User {
    uuid: string;
    role_id: string;
    role_name: string;
    student_id: string;
    token: string;
    permission: ISessionPermission[];
    menus: string[];
  }
}
