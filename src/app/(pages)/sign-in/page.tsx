// page.tsx (no changes from the version accommodating font inheritance)
import AuthForm from "./AuthForm"; // Or the correct path to your AuthForm component

const SignInPage = async () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-custom-page-bg p-4 sm:p-0">
      <AuthForm />
    </main>
  );
};

export default SignInPage;