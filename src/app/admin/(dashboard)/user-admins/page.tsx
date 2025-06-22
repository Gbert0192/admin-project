import { auth } from "@/auth";
import { createQueryParams, SearchParams } from "@/lib/utils";
import React from "react";
import UserAdminTable from "./UserAdminTable";
import serverApi from "@/lib/api/serverApi";

export interface UserAdmin {
  uuid: string;
  student_id: string;
  name: string;
  role_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface UserAdminData {
  data: UserAdmin[];
  totalPages: number;
  total: number;
}

const getUserAdmin = async ({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) => {
  const params = createQueryParams(searchParams);
  const data = await serverApi.get(`user/admin?${params}`);

  return data;
};
const AdminPage = async ({ searchParams }: SearchParams) => {
  const params = await searchParams;
  const session = await auth();
  const accessPermission = session?.user.permission ?? [];
  const { data } = await getUserAdmin({ searchParams: params });
  return (
    <>
      <UserAdminTable
        searchParams={params}
        data={data}
        accessPermission={accessPermission}
      />
    </>
  );
};
export default AdminPage;
