import { CredentialsSignin } from "next-auth";

export class AuthenticationError extends CredentialsSignin {
  code = "Invalid Username or Password";
}
