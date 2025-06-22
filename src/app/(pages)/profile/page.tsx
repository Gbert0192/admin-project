"use client";

import { useSession } from "next-auth/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, IdCard, Shield, KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const user = {
    name: session?.user?.name ?? "Guest",
    nim: session?.user?.student_id ?? "N/A",
    role: session?.user?.role_name ?? "N/A",
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-sm border mb-4">
            <User className="w-10 h-10 text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold text-blue-600 mb-2">
            User Profile
          </h1>
          <p className="text-gray-500 text-sm">Manage Your Information</p>
        </div>

        <Card className="shadow-sm border-0 bg-white">
          <CardHeader className="border-b border-gray-100 pb-4">
            <CardTitle className="text-lg font-semibold text-blue-600 flex items-center gap-2">
              <IdCard className="w-5 h-5 text-blue-500" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <div className="text-sm font-medium text-blue-600 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-500" />
                Full Name
              </div>
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {user.name}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-blue-600 flex items-center gap-2">
                <IdCard className="w-4 h-4 text-blue-500" />
                Student ID
              </div>
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {String(user.nim)}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-blue-600 flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-500" />
                Role
              </div>
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {String(user.role)}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <Button
                variant="default"
                onClick={() => {
                  router.push("/profile/change-password");
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors duration-200"
              >
                <KeyRound className="w-4 h-4 mr-2" />
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-xs text-gray-400">
            To change personal information, contact administrator
          </p>
        </div>
      </div>
    </div>
  );
}
