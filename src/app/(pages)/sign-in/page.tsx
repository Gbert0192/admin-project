import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import SignInForm from "./form";
const SignInPage = async () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-2">
      <Card className="w-[400px]">
        <CardHeader className="flex items-center justify-center">
          <CardTitle className="text-2xl">Sign In</CardTitle>
        </CardHeader>
        <SignInForm />
      </Card>
    </section>
  );
};

export default SignInPage;
