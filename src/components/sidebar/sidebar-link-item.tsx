import Link from "next/link";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";

interface Item {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

export function SidebarLinkItem({
  item,
  isActive,
  admin,
}: {
  item: Item;
  isActive: boolean;
  admin?: boolean;
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild className="p-0 max-h-10">
        <Link
          href={admin ? `/admin${item.url}` : `${item.url}`}
          className={clsx(
            "relative group/item flex items-center gap-3 px-4 py-3 hover:bg-slate-200 dark:hover:bg-slate-800/50 border border-transparent h-full rounded-xl",
            { "bg-slate-200 dark:bg-slate-800/50": isActive }
          )}
        >
          <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-indigo-500/10 group-hover/item:from-blue-500/20 group-hover/item:to-indigo-500/20">
            <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
          </div>

          <div className="flex-1 min-w-0 flex items-center justify-between">
            <span
              className={clsx(
                "text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors duration-300",
                { "text-blue-600 dark:text-blue-400": isActive }
              )}
            >
              {item.title}
            </span>

            <ChevronRight
              className={clsx(
                "ml-2 w-3 h-3 sm:w-4 sm:h-4 text-slate-400 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200",
                { "opacity-100": isActive }
              )}
            />
          </div>

          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 -z-10"></div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
