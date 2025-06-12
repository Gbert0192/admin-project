"use client";

import { OverviewChart } from "@/components/dashboard-components/overview-chart";
import { RangkingChart } from "@/components/dashboard-components/rangking-chart";
import { RecentActivity } from "@/components/dashboard-components/recent-activity";
import { Card, CardContent } from "@/components/ui/card";
import { CreateForm } from "@/components/ui/CreateForm";
import { FileText, Target, TrendingUp, Users } from "lucide-react";
import { Session } from "next-auth";

interface DashboardPageProps {
  session: Session;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ session }) => {
  const overviewData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ];

  const rankingData = [
    { name: "Kelas A", responses: 60 },
    { name: "Kelas B", responses: 45 },
    { name: "Kelas C", responses: 30 },
    { name: "Kelas D", responses: 15 },
  ];

  const rankingUserData = [
    { name: "Kelvin", responses: 88 },
    { name: "Akbar", responses: 80 },
    { name: "Egip", responses: 90 },
    { name: "John", responses: 70 },
  ];

  return (
    <div className=" dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Hi {session.user.name}, welcome back!
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 mt-2">
              Monitor your application performance and user engagement
            </p>
          </div>
          <CreateForm />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-xs sm:text-sm font-medium">
                    Total Forms
                  </p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                    124
                  </p>
                  <p className="text-blue-100 text-xs mt-1">
                    +12% from last month
                  </p>
                </div>
                <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-blue-200" />
              </div>
              <div className="absolute -right-4 -bottom-4 w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-full"></div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-xs sm:text-sm font-medium">
                    Total Responses
                  </p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                    2,493
                  </p>
                  <p className="text-emerald-100 text-xs mt-1">
                    +8% from last month
                  </p>
                </div>
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-200" />
              </div>
              <div className="absolute -right-4 -bottom-4 w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-full"></div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-xs sm:text-sm font-medium">
                    Total Users
                  </p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                    200
                  </p>
                  <p className="text-purple-100 text-xs mt-1">
                    +15% from last month
                  </p>
                </div>
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-200" />
              </div>
              <div className="absolute -right-4 -bottom-4 w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-full"></div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-xs sm:text-sm font-medium">
                    Avg Completion
                  </p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                    78%
                  </p>
                  <p className="text-orange-100 text-xs mt-1">
                    +5% from last month
                  </p>
                </div>
                <Target className="w-6 h-6 sm:w-8 sm:h-8 text-orange-200" />
              </div>
              <div className="absolute -right-4 -bottom-4 w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-full"></div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 w-full">
          <div>
            <OverviewChart data={overviewData} />
          </div>
          <div>
            <RangkingChart data={rankingUserData} />
          </div>
          <div>
            <RangkingChart data={rankingData} />
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-6">
          {/* <Card className="flex-1 border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <span className="text-slate-800 dark:text-slate-200">
                    Top Performers
                  </span>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal">
                    Highest scoring users
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0"> */}
          {/* </CardContent>
          </Card> */}

          <div className="flex-1">
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
