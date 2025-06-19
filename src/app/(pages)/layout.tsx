"use client";

import { UserSidebar } from "@/components/sidebar/user/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";
import { mainMenu, accountMenu } from "@/app/lib/menu-data";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const allMenuItems = [...mainMenu, ...accountMenu];
  const currentPage = allMenuItems.find((item) => item.url === pathname);

  const pageTitle = currentPage ? currentPage.title : "Dashboard";

  return (
    <div className="flex ">
      <SidebarProvider className="border-r-0 ">
        <div className="hidden lg:block">
          <UserSidebar />
        </div>

        <SidebarInset>
          <header className="group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 transition-[width,height] ease-linear md:px-6">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <Separator orientation="vertical" className="mr-2 h-6" />
                <h1 className="text-xl font-semibold">{pageTitle}</h1>
              </div>
              <div className="flex items-center gap-4"></div>
            </div>
          </header>

          <main className="w-full h-full">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
