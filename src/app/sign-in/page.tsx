import { auth } from "@/auth";
import AuthForm from "./AuthForm";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await auth();

  if (session?.user) {
    if (session.user.role_name === "User") {
      redirect("/");
    } else {
      redirect("/admin");
    }
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-primary p-4 sm:p-0">
      <AuthForm />
    </main>
  );
};

export default SignInPage;
