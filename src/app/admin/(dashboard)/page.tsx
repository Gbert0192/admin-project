import { auth } from "@/auth";
import React from "react";
import DashboardAdminContent from "./DashboardAdminContent";
import serverApi from "@/lib/api/serverApi";

export interface Dashboard {
  total_huawei_forms: number;
  total_kahoot_forms: number;
  total_users: number;
}

const DashboardAdminPage = async () => {
  const session = await auth();
  if (!session) {
    return null;
  }

  const response = await serverApi.get<{ data: Dashboard }>("dashboard");
  const data = response.data.data;
  return (
    <>
      <DashboardAdminContent session={session} data={data} />
    </>
  );
};
export default DashboardAdminPage;
