"use client";

import { UserSidebar } from "@/components/sidebar/user/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { usePathname, useRouter } from "next/navigation";
import { mainMenu, accountMenu } from "@/app/lib/menu-data";
import { AlertWrapper } from "@/components/alert-wrapper/alert-wrapper";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { User } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const allMenuItems = [...mainMenu, ...accountMenu];
  const currentPage = allMenuItems.find((item) => item.url === pathname);

  const pageTitle = currentPage ? currentPage.title : "Dashboard";

  const router = useRouter();
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
              <div className="flex flex-row items-center gap-2">
                <div className="min-w-10">
                  <AlertWrapper
                    onAction={() => signOut()}
                    title="Are You Sure to Log Out?"
                    description="You will be logged out from the system after Click Log out Button"
                    actionText="Log Out"
                    cancelText="Cancel"
                    actionClassName="bg-red-500"
                  >
                    <Button
                      variant={"destructive"}
                      size={"icon"}
                      className="p-4 w-full"
                    >
                      Log Out
                    </Button>
                  </AlertWrapper>
                </div>
                <Button
                  className="group relative rounded-full bg-gradient-to-br from-blue-400 to-blue-600 p-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out hover:from-blue-500 hover:to-blue-700 active:scale-95"
                  onClick={() => {
                    router.push("/profile");
                  }}
                >
                  <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300"></div>
                  <div className="relative">
                    <User className="h-6 w-6 text-white drop-shadow-sm group-hover:scale-110 transition-transform duration-200" />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-white opacity-0 group-active:opacity-20 group-active:animate-ping"></div>
                </Button>
              </div>
            </div>
          </header>

          <main className="w-full h-full">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
