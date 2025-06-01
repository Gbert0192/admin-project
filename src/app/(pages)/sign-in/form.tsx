// form.tsx
"use client";

import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/lib/schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface SignInFormProps {
  inputClasses?: string;
  buttonClasses?: string;
  formPaddingClasses?: string; // Tambahkan prop ini
}

const TemplateCompatibleSignInForm = ({
  inputClasses = "bg-gray-100 border-none p-3 my-2 w-full focus:outline-none text-sm",
  buttonClasses = "bg-blue-500 text-white p-3 rounded text-sm",
  formPaddingClasses = "px-6 sm:px-8 md:px-12 h-full text-center" // Berikan default jika perlu, sesuaikan kelas h-full dan text-center
}: SignInFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      student_id: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<{
    student_id: string;
    password: string;
  }> = async ({ password, student_id }) => {
    console.log("Attempting to sign in with:", student_id); // Untuk debugging
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        student_id,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error(res.error || "Invalid credentials. Please try again.");
        console.error("Sign-in error response:", res); // Untuk debugging
      } else {
        toast.success("Login Success");
        router.push(callbackUrl ?? "/");
      }
    } catch (error: unknown) {
      console.error("Sign-in submission error:", error); // Untuk debugging
      if (error instanceof AuthError) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred during login.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        // Terapkan formPaddingClasses di sini. Pastikan juga ada kelas untuk flex, items-center, justify-center, h-full, text-center jika diperlukan.
        className={`bg-white flex flex-col items-center justify-center px-6 sm:px-8 md:px-12 h-auto text-center ${formPaddingClasses}`} // Hapus h-full dari default jika sudah ada di formPaddingClasses atau atur di sini.
      >
        <h1 className="font-bold text-xl sm:text-2xl md:text-3xl m-0">Sign in</h1>
        <div className="social-container my-3 sm:my-5">
          {/* Social login buttons if any */}
        </div>

        <FormField
          control={form.control}
          name="student_id"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  type="text"
                  placeholder="Student ID or Email"
                  {...field}
                  className={inputClasses}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <PasswordInput
                  placeholder="Password"
                  {...field}
                  className={inputClasses}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <a href="#" className="text-custom-gray-text text-xs sm:text-sm my-3 sm:my-[15px] no-underline hover:underline">Forgot your password?</a>
        <Button
          isLoading={isLoading}
          type="submit"
          className={`${buttonClasses} mt-2 sm:mt-3`}
        >
          Sign In
        </Button>
      </form>
    </Form>
  );
};

export default TemplateCompatibleSignInForm;