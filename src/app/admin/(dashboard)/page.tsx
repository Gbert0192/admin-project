import { auth } from "@/auth";
import React from "react";
import DashboardAdminContent from "./DashboardAdminContent";
import { dashboardServerApi } from "@/lib/api/dashboard";

const DashboardAdminPage = async () => {
  const session = await auth();
  if (!session) {
    return null;
  }

  const [basicStats, formTrends, formAttemptStats] = await Promise.all([
    dashboardServerApi.getBasicStatistics(),
    dashboardServerApi.getFormCreationTrends(12),
    dashboardServerApi.getFormAttemptStats(),
  ]);

  const data = {
    basicStats,
    formTrends,
    formAttemptStats,
  };

  return (
    <>
      <DashboardAdminContent session={session} data={data} />
    </>
  );
};
export default DashboardAdminPage;
