"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/lib/schema/AuthSchema";

interface SignInFormProps {
  onSwitchToSignUp?: () => void;
}

const SignInForm = ({ onSwitchToSignUp }: SignInFormProps) => {
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
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        student_id,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error(res.code ?? "Invalid credentials. Please try again.");
      } else {
        toast.success("Login Success");
        router.push(callbackUrl ?? "/");
      }
    } catch (error: unknown) {
      if (error instanceof AuthError) {
        toast.error(error.name);
      } else {
        toast.error("An unexpected error occurred during login.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col justify-center w-full h-full px-4 md:px-5 lg:px-8`}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full space-y-3 bg-white"
        >
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl m-0 text-center">
            Sign in
          </h1>
          <div className="social-container my-2 sm:my-3"></div>

          <FormField
            control={form.control}
            name="student_id"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="sr-only">Student ID or Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Student ID or Email"
                    {...field}
                    className="bg-gray-100 border-none p-3 my-2 w-full focus:outline-none text-sm"
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
                <FormLabel className="sr-only">Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Password"
                    {...field}
                    className="bg-gray-100 border-none p-3 my-2 w-full focus:outline-none text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <a
            href="#"
            className="text-custom-gray-text text-xs sm:text-sm my-2 no-underline hover:underline"
          >
            Forgot your password?
          </a>
          <Button
            isLoading={isLoading}
            type="submit"
            className={`rounded-full bg-primary text-white text-xs sm:text-sm font-bold py-3 px-6 uppercase mt-2 w-auto`}
          >
            Sign In
          </Button>

          {onSwitchToSignUp && (
            <p className="mt-4 text-xs text-gray-600 md:hidden">
              Don&apos;t have an account?
              <button
                type="button"
                onClick={onSwitchToSignUp}
                className="font-semibold text-primary hover:underline focus:outline-none"
              >
                Sign Up
              </button>
            </p>
          )}
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
