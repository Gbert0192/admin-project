import { CredentialsSignin } from "next-auth";

export class AuthenticationError extends CredentialsSignin {
  code = "Invalid Username or Password";
}

export class AuthorizationError extends CredentialsSignin {
  code = "Unauthorized";
}

export class InvalidUserError extends CredentialsSignin {
  code = "User Not Found";
}
