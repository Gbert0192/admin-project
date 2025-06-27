"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  ChevronRight,
  CircleHelp,
  FileClock,
  LayoutDashboard,
  Settings,
  SquarePen,
  Trophy,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { SidebarLinkItem } from "../sidebar-link-item";
import { usePathname } from "next/navigation";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

const mainMenu: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Quiz Collection",
    url: "/quizzes",
    icon: SquarePen,
  },
  {
    title: "My History",
    url: "/history",
    icon: FileClock,
  },
  {
    title: "Leaderboard",
    url: "/leaderboard",
    icon: Trophy,
  },
];

const accountMenu: MenuItem[] = [
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Help",
    url: "/help",
    icon: CircleHelp,
  },
];

export function UserSidebar() {
  const session = useSession();

  const pathname = usePathname();

  return (
    <Sidebar className="border-r-0 max-w-[250px]">
      <SidebarContent className="p-0">
        <SidebarGroup className="px-0">
          <div className="p-6 pb-4 border-b">
            <SidebarGroupLabel className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-0 px-0 h-auto">
              Quiz Platform
            </SidebarGroupLabel>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-normal">
              Welcome!
            </p>
          </div>

          <SidebarGroupContent className="px-3 py-4 min-h-[75dvh]">
            <SidebarMenu className="gap-2">
              <h1 className="text-sm sm:text-lg font-semibold text-gray-500 mb-0 px-0 h-auto">
                Main Menu
              </h1>
              {mainMenu.map((item) => (
                <SidebarLinkItem
                  key={item.title}
                  item={item}
                  isActive={pathname === `${item.url}`}
                />
              ))}

              <h1 className="text-sm sm:text-lg font-semibold text-gray-500 mb-0 px-0 h-auto mt-4">
                Account
              </h1>
              {accountMenu.map((item) => (
                <SidebarLinkItem
                  key={item.title}
                  item={item}
                  isActive={pathname === `${item.url}`}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

          <div className="mt-auto p-4 border-t dark:border-slate-700/50">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800/30">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {session.data?.user?.name?.[0]?.toUpperCase() ?? "A"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {session.data?.user?.name ?? "Admin User"}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {session.data?.user?.email ?? "user@example.com"}
                </p>
              </div>
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
