"use client";

import { User } from "@/app/admin/(dashboard)/users/page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { errorHandler } from "@/lib/handler/errorHandler";
import {
  changePasswordSchema,
  ChangePasswordSchemaType,
} from "@/lib/schema/UserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { KeyRound, Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export interface tes {
  newPassword: string;
  currentPassword: string;
  confirmPassword: string;
}

export default function ChangePasswordPage() {
  const router = useRouter();

  const form = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutate: changePassword, isPending } = useMutation<
    User,
    Error,
    ChangePasswordSchemaType
  >({
    mutationFn: async (data: ChangePasswordSchemaType) => {
      const res = await api.put("/user/change-password", data);
      return res.data as User;
    },
    onError: (err) => {
      errorHandler(err);
    },
    onSuccess: () => {
      form.reset();
      router.push("/profile");
      toast.success("Change Password Successfully!");
    },
  });

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-sm border mb-4">
            <KeyRound className="w-10 h-10 text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold text-blue-600 mb-2">
            Change Password
          </h1>
          <p className="text-gray-500 text-sm">Update your account password</p>
        </div>

        <Card className="shadow-sm border-0 bg-white">
          <CardHeader className="border-b border-gray-100 pb-4">
            <CardTitle className="text-lg font-medium text-blue-600 flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-500" />
              Password Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => changePassword(data))}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Your Current Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Permissions</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Your New Password"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Permissions</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Your Confirm Password"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="text-white">
                  {isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isPending ? "Creating..." : "Create Role"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-xs text-gray-400">
            Make sure your new password is strong and secure
          </p>
        </div>
      </div>
    </div>
  );
}
