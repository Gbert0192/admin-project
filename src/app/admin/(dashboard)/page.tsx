import { auth } from "@/auth";
import React from "react";
import DashboardPage from "./dashboard";

const Page = async () => {
  const session = await auth();
  if (!session) {
    return null;
  }
  return (
    <>
      <DashboardPage session={session} />
    </>
  );
};
export default Page;
