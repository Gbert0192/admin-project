import React from "react";
import UserTable from "./UserTable";

interface UsersPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

const UsersPage = async ({ searchParams }: UsersPageProps) => {
  const params = await searchParams;

  return (
    <>
      {params}
      <UserTable />
    </>
  );
};

export default UsersPage;
