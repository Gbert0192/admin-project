"use client";

import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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

const SignInForm = () => {
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
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        student_id,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error(res.code);
      } else {
        toast.success("Login Success");
        router.push(callbackUrl ?? "/");
      }
    } catch (error: unknown) {
      if (error instanceof AuthError) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="student_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student Id</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Student Id" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Enter Password" {...field} />
                  {/* <Input placeholder="password"></Input> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button isLoading={isLoading} className="w-full" type="submit">
            Sign In
          </Button>
        </form>
      </Form>
    </CardContent>
  );
};

export default SignInForm;
