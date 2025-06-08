// Anda bisa menamakan file ini misal: user-sidebar.tsx

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
  User,
  // --- Impor ikon baru yang relevan untuk user ---
  FileClock,    // Untuk Riwayat
  Trophy,       // Untuk Papan Peringkat
  SquarePen,    // Untuk memulai kuis/form
  CircleHelp,   // Untuk Bantuan
} from "lucide-react";
import Link from "next/link";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

// --- Menu utama untuk pengguna ---
const mainMenu: MenuItem[] = [
  {
    title: "Dashbord",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Koleksi Kuis",
    url: "/quizzes",
    icon: SquarePen,
  },
  {
    title: "Riwayat Saya",
    url: "/history",
    icon: FileClock,
  },
  {
    title: "Papan Peringkat",
    url: "/leaderboard",
    icon: Trophy,
  },
];

// --- Menu akun untuk pengguna ---
const accountMenu: MenuItem[] = [
  {
    title: "Pengaturan",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Bantuan",
    url: "/help",
    icon: CircleHelp,
  },
];

// Ganti nama fungsi agar lebih jelas, misal: UserSidebar
export function UserSidebar() {
  return (
    <Sidebar className="border-r-0 max-w-[250px]">
      <SidebarContent className="p-0">
        <SidebarGroup className="px-0">
          <div className="p-6 pb-4 border-b">
            {/* Judul diubah menjadi nama aplikasi */}
            <SidebarGroupLabel className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-0 px-0 h-auto">
              Quiz Platform
            </SidebarGroupLabel>
            {/* Sub-judul diubah menjadi lebih ramah */}
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-normal">
              Selamat Datang!
            </p>
          </div>

          <SidebarGroupContent className="px-3 py-4 min-h-[75dvh]">
            <SidebarMenu className="gap-2">
              <h1 className="text-sm sm:text-lg font-semibold text-gray-500 mb-0 px-0 h-auto">
                Menu Utama
              </h1>
              {/* Mapping dari array mainMenu */}
              {mainMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-0 max-h-10">
                    {/* Hapus prefix /admin dari URL */}
                    <Link
                      href={item.url}
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

              <h1 className="text-sm sm:text-lg font-semibold text-gray-500 mb-0 px-0 h-auto mt-4">
                Settings
              </h1>
              {/* Mapping dari array accountMenu */}
              {accountMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-0 max-h-10">
                    {/* Hapus prefix /admin dari URL */}
                    <Link
                      href={item.url}
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

          {/* Kartu profil di bagian bawah diubah untuk user */}
          <div className="mt-auto p-4 border-t dark:border-slate-700/50">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                {/* Inisial nama user, bisa dibuat dinamis */}
                <span className="text-white text-xs font-bold">UP</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  User Profile
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  user@example.com
                </p>
              </div>
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}