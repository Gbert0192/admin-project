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
  LayoutDashboard,
  Settings,
  Shield,
  Target,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";

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
    title: "Ranking",
    url: "/ranking",
    icon: Target,
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
];
export function AppSidebar() {
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
              <h1 className="text-sm sm:text-lg font-semibold text-gray-500 mb-0 px-0 h-auto">
                Operation
              </h1>
              {operations.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-0 max-h-10">
                    <Link
                      href={`/admin${item.url}`}
                      className="relative group/item flex items-center gap-3 px-4 py-3 hover:bg-slate-200 dark:hover:bg-slate-800/50 border border-transparent h-full rounded-xl"
                    >
                      <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-indigo-500/10 group-hover/item:from-blue-500/20 group-hover/item:to-indigo-500/20">
                        <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                      </div>

                      <div className="flex-1 min-w-0 flex items-center justify-between">
                        <span className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors duration-300">
                          {item.title}
                        </span>

                        <ChevronRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4 text-slate-400 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200" />
                      </div>

                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <h1 className="text-sm sm:text-lg font-semibold text-gray-500 mb-0 px-0 h-auto">
                Feature
              </h1>
              {feature.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-0 max-h-10">
                    <Link
                      href={`/admin${item.url}`}
                      className="relative group/item flex items-center gap-3 px-4 py-3 hover:bg-slate-200 dark:hover:bg-slate-800/50 border border-transparent h-full rounded-xl"
                    >
                      <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-indigo-500/10 group-hover/item:from-blue-500/20 group-hover/item:to-indigo-500/20">
                        <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                      </div>

                      <div className="flex-1 min-w-0 flex items-center justify-between">
                        <span className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors duration-300">
                          {item.title}
                        </span>

                        <ChevronRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4 text-slate-400 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200" />
                      </div>

                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <h1 className="text-sm sm:text-lg font-semibold text-gray-500 mb-0 px-0 h-auto">
                Super Admin
              </h1>
              {superAdmin.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-0 max-h-10">
                    <Link
                      href={`/admin${item.url}`}
                      className="relative group/item flex items-center gap-3 px-4 py-3 hover:bg-slate-200 dark:hover:bg-slate-800/50 border border-transparent h-full rounded-xl"
                    >
                      <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-indigo-500/10 group-hover/item:from-blue-500/20 group-hover/item:to-indigo-500/20">
                        <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                      </div>

                      <div className="flex-1 min-w-0 flex items-center justify-between">
                        <span className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors duration-300">
                          {item.title}
                        </span>

                        <ChevronRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4 text-slate-400 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200" />
                      </div>

                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

          <div className="mt-auto p-4 border-t dark:border-slate-700/50">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue dark:border-blue-800/30">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Admin User
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  admin@example.com
                </p>
              </div>
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
