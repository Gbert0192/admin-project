"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import {
  FileClock,
  FileText,
  LayoutDashboard,
  Loader2,
  Shield,
  Target,
  TrendingUp,
  UserLock,
  Users,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";
import { SidebarLinkItem } from "./sidebar-link-item";

interface Item {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

const operations: Item[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
];

const feature: Item[] = [
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },

  {
    title: "Recent Activity",
    url: "/recent-activity",
    icon: TrendingUp,
  },
];

const superAdmin: Item[] = [
  {
    title: "Roles",
    url: "/roles",
    icon: Shield,
  },
  {
    title: "Permissions",
    url: "/permissions",
    icon: Shield,
  },
  {
    title: "User Admin",
    url: "/user-admins",
    icon: UserLock,
  },
];

const form: Item[] = [
  {
    title: "Huawei Form",
    url: "/forms/huawei",
    icon: FileText,
  },
  {
    title: "Kahoot",
    url: "/forms/kahoot",
    icon: FileClock,
  },
];

export function AppSidebar() {
  const session = useSession();
  const pathname = usePathname();

  const allowedRoutes = React.useMemo(() => {
    return session?.data?.user?.menus ?? [];
  }, [session]);

  const filteredOperationMenu = operations.filter((item) =>
    allowedRoutes.includes(item.url)
  );

  const filteredFeatureMenu = feature.filter((item) =>
    allowedRoutes.includes(item.url)
  );

  const filteredSuperAdminMenu = superAdmin.filter((item) =>
    allowedRoutes.includes(item.url)
  );

  const filteredFormMenu = form.filter((item) =>
    allowedRoutes.includes(item.url)
  );

  return (
    <Sidebar className="border-r-0 max-w-[250px]">
      <SidebarContent className="p-0">
        <SidebarGroup className="px-0">
          <div className="p-6 pb-4 border-b">
            <SidebarGroupLabel className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-0 px-0 h-auto">
              Admin Project
            </SidebarGroupLabel>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-normal">
              Admin Panel
            </p>
          </div>

          <SidebarGroupContent className="px-3 py-4 min-h-[75dvh]">
            <SidebarMenu className="gap-2">
              {filteredOperationMenu.length === 0 &&
              filteredFormMenu.length === 0 &&
              filteredFeatureMenu.length === 0 &&
              filteredSuperAdminMenu.length === 0 ? (
                <div className="flex w-full justify-center py-8">
                  <Loader2 className="h-7 w-7 animate-spin text-blue-500" />
                </div>
              ) : null}
              {filteredOperationMenu.length > 0 && (
                <h1 className="text-sm sm:text-lg font-semibold text-gray-500 mb-0 px-0 h-auto">
                  Operation
                </h1>
              )}
              {filteredOperationMenu.map((item) => (
                <SidebarLinkItem
                  key={item.title}
                  item={item}
                  isActive={pathname === `/admin${item.url}`}
                  admin={true}
                />
              ))}
              {filteredFeatureMenu.length > 0 && (
                <h1 className="text-sm sm:text-lg font-semibold text-gray-500 mb-0 px-0 h-auto">
                  Feature
                </h1>
              )}
              {filteredFeatureMenu.map((item) => (
                <SidebarLinkItem
                  key={item.title}
                  item={item}
                  isActive={pathname === `/admin${item.url}`}
                  admin={true}
                />
              ))}
              {filteredSuperAdminMenu.length > 0 && (
                <h1 className="text-sm sm:text-lg font-semibold text-gray-500 mb-0 px-0 h-auto">
                  Super Admin
                </h1>
              )}
              {filteredSuperAdminMenu.map((item) => (
                <SidebarLinkItem
                  key={item.title}
                  item={item}
                  isActive={pathname === `/admin${item.url}`}
                  admin={true}
                />
              ))}
              {filteredFormMenu.length > 0 && (
                <h1 className="text-sm sm:text-lg font-semibold text-gray-500 mb-0 px-0 h-auto">
                  Form
                </h1>
              )}
              {filteredFormMenu.map((item) => (
                <SidebarLinkItem
                  key={item.title}
                  item={item}
                  isActive={pathname === `/admin${item.url}`}
                  admin={true}
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
                  {session.data?.user?.email ?? "admin@example.com"}
                </p>
              </div>
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
