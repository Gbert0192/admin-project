import { DefaultSession } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

interface ISessionMenu {
  route: string;
  permission_name: string;
}

interface ISessionPermission {
  route: string;
  permission_name: string;
  method: string[];
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role_id: string;
    role_name: string;
    student_id: string;
    token: string;
    permission: ISessionPermission[];
    menus: ISessionMenu[];
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role_id: string;
      role_name: string;
      student_id: string;
      token: string;
      permission: ISessionPermission[];
      menus: ISessionMenu[];
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role_id: string;
    role_name: string;
    student_id: string;
    token: string;
    permission: ISessionPermission[];
    menus: ISessionMenu[];
  }
}
