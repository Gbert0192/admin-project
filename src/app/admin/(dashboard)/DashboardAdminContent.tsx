"use client";

import { Session } from "next-auth";
import {
  BasicStatistics,
  FormTrendData,
  FormAttemptStatsResponse,
} from "@/lib/types/dashboard";
import EnhancedStatusCards from "@/components/dashboard-components/enhanced-status-cards";
import FormTrendsChart from "@/components/dashboard-components/form-trends-chart";
import FormAttemptStats from "@/components/dashboard-components/form-attempt-stats";

interface DashboardData {
  basicStats: BasicStatistics;
  formTrends: FormTrendData[];
  formAttemptStats: FormAttemptStatsResponse;
}

interface DashboardPageProps {
  session: Session;
  data: DashboardData;
}

const DashboardAdminContent: React.FC<DashboardPageProps> = ({
  session,
  data,
}) => {
  return (
    <div className="dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 h-screen overflow-hidden">
      <div className="p-4 lg:p-6 h-full flex flex-col gap-4">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 flex-shrink-0">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Hi {session.user.name}, welcome back!
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
              Monitor your application performance and user engagement
            </p>
          </div>
        </div>

        {/* Main Dashboard Layout */}
        <div className="grid gap-4 grid-cols-1 xl:grid-cols-4 flex-1 min-h-0">
          <div className="xl:col-span-3 flex flex-col gap-4 min-h-0">
            <div className="flex-shrink-0">
              <EnhancedStatusCards data={data.basicStats} />
            </div>

            <div className="flex-1 min-h-0">
              <FormTrendsChart data={data.formTrends} />
            </div>
          </div>

          <div className="xl:col-span-1 min-h-0">
            <FormAttemptStats data={data.formAttemptStats} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminContent;
