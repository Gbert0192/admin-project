import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import SignUpForm from "./form";

const SignUpPage = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-2">
      <Card className="w-[400px]">
        <CardHeader className="flex items-center justify-center">
          <CardTitle className="text-2xl">Sign Up</CardTitle>
        </CardHeader>
        <SignUpForm />
        <p className="text-sm text-center mt-2 mb-4">
  Already have an account? <a href="/sign-in" className="text-blue-500 hover:underline">Sign in</a>
</p>
      </Card>
    </section>
  );
};

export default SignUpPage;
