import AuthForm from "./AuthForm";

const SignInPage = async () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-custom-page-bg p-4 sm:p-0">
      <AuthForm />
    </main>
  );
};

export default SignInPage;
