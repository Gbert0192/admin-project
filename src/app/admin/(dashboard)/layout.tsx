"use client";

import { AlertWrapper } from "@/components/alert-wrapper/alert-wrapper";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { signOut } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex ">
      <SidebarProvider className="border-r-0 ">
        <div className="hidden lg:block">
          <AppSidebar />
        </div>

        <SidebarInset>
          <header className="group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 z-30 flex h-16 shrink-0 items-center gap-2 space-y-4 border-b  px-4 transition-[width,height] ease-linear">
            <div className="flex w-full items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <SidebarTrigger />
                <Separator orientation="vertical" className="mr-2 h-4" />
              </div>
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
            </div>
          </header>
          <main className="max-w-full w-full h-full max-h-full">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
