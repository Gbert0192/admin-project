"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./dropdown-menu";

import { LayoutDashboard, Users, FileText, School, LogOut } from "lucide-react";
import Link from "next/link";

const navItems = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    href: "/",
  },
  { name: "User", icon: <Users className="w-5 h-5" />, href: "/user" },
  { name: "Form", icon: <FileText className="w-5 h-5" />, href: "/form" },
  { name: "Kelas", icon: <School className="w-5 h-5" />, href: "/kelas" },
];

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-white border-r flex flex-col justify-between px-4 py-6">
      <div>
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div
                  className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold cursor-pointer"
                  title="Open menu"
                >
                  J
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuItem
                  className="flex items-center gap-2 text-red-500 cursor-pointer"
                  onClick={() => {
                    // 🚀 Tambahkan logika logout di sini
                    window.location.href = "/login";
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div>
              <p className="text-sm text-gray-600">Admin</p>
              <p className="text-md font-medium">John Alpha</p>
            </div>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700 font-medium"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
