"use client";

import { useSession } from "next-auth/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { data: session } = useSession();


  const user = {
  name: session?.user?.name ?? "Guest",
  nim: session?.user?.student_id ?? "N/A",
  role: session?.user?.role_name ?? "N/A",
};


  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center text-indigo-600">
        Profil Pengguna
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Informasi Akun</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input id="name" value={user.name} disabled />
          </div>
          <div>
            <Label htmlFor="nim">NIM</Label>
            <Input id="nim" value={String(user.nim)} disabled />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Input id="role" value={String(user.role)} disabled />
          </div>
          <div className="pt-4">
            <Button variant="default" onClick={() => alert("Coming soon!")}>
              Ubah Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
