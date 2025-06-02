"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";

import { z } from "zod";

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
import api from "@/lib/api";
import { signUpSchema } from "@/lib/schema";
import { toast } from "sonner";

type SignUpFormValues = z.infer<typeof signUpSchema>;

interface SignUpFormProps {
  onSwitchToSignIn?: () => void;
}

const SignUpForm = ({ onSwitchToSignIn }: SignUpFormProps) => {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      student_id: "",
      password: "",
    },
  });

  const { mutate: handleSignUp, isPending } = useMutation({
    mutationFn: async (data: SignUpFormValues) => {
      const res = await api.post("/auth/sign-up", data);
      return res.data as SignUpFormValues;
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      form.reset();
      toast.success("Register Successfully!");
      onSwitchToSignIn?.();
    },
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = (data) => {
    handleSignUp(data);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-4 md:px-5 lg:px-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center w-full space-y-3 bg-white"
        >
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl m-0 text-center">
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
                    className="bg-gray-100 border-none p-3 my-2 w-full focus:outline-none text-sm"
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
          <FormMessage />

          <Button
            isLoading={isPending}
            type="submit"
            className="rounded-full bg-primary text-white text-xs sm:text-sm font-bold py-3 px-6 uppercase mt-2 w-auto"
          >
            Sign Up
          </Button>
          {onSwitchToSignIn && (
            <p className="mt-4 text-xs text-gray-600 md:hidden">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onSwitchToSignIn}
                className="font-semibold text-primary hover:underline focus:outline-none"
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
