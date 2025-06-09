import {
  LayoutDashboard,
  Settings,
  FileClock,
  Trophy,
  SquarePen,
  CircleHelp,
} from "lucide-react";

export interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const mainMenu: MenuItem[] = [
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

export const accountMenu: MenuItem[] = [
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
