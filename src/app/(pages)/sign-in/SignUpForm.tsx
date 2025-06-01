"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, MouseEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

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
import { PasswordInput } from "@/components/password-input";

const signUpSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  student_id: z.string().min(5, { message: "Student ID must be valid." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

interface SignUpFormProps {
  inputClasses?: string;
  buttonClasses?: string;
  formPaddingClasses?: string;
  onSwitchToSignIn?: () => void;
}

const SignUpForm = ({
  inputClasses = "bg-gray-100 border-none p-3 my-2 w-full focus:outline-none text-sm",
  buttonClasses = "rounded-full bg-custom-blue text-white text-xs sm:text-sm font-bold py-3 px-6 uppercase",
  formPaddingClasses = "px-4 md:px-5 lg:px-8",
  onSwitchToSignIn,
}: SignUpFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [signUpMessage, setSignUpMessage] = useState<string | null>(null);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      student_id: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    setIsLoading(true);
    setSignUpMessage(null);
    console.log("Sign Up Data:", data);
    setSignUpMessage(
      "Sign-up feature is not yet implemented. Please check back later!"
    );
    setIsLoading(false);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-full ${formPaddingClasses}`}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center w-full space-y-3 text-center bg-white"
        >
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl m-0">
            Create Account
          </h1>
          <div className="social-container my-2 sm:my-3"></div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="sr-only">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name"
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
            name="student_id"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="sr-only">Student ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Student ID"
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
                <FormLabel className="sr-only">Password</FormLabel>
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
          {signUpMessage && (
            <p className="text-red-500 text-xs mt-1 mb-0 px-1">
              {signUpMessage}
            </p>
          )}
          <Button
            isLoading={isLoading}
            type="submit"
            className={`${buttonClasses} mt-2 w-auto`}
          >
            Sign Up
          </Button>
          {onSwitchToSignIn && (
            <p className="mt-4 text-xs text-gray-600 md:hidden">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onSwitchToSignIn}
                className="font-semibold text-custom-blue hover:underline focus:outline-none"
              >
                Sign In
              </button>
            </p>
          )}
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
