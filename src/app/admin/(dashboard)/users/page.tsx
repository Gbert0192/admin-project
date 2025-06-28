import { auth } from "@/auth";
import serverApi from "@/lib/api/serverApi";
import { createQueryParams, SearchParams } from "@/lib/utils";
import UserTable from "./UserTable";

export interface User {
  uuid: string;
  student_id: string;
  name: string;
  role_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface UserData {
  data: User[];
  totalPages: number;
  total: number;
}
const getUser = async ({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) => {
  const params = createQueryParams(searchParams);

  const data = await serverApi.get(`user?${params}`);

  return data;
};

const UsersPage = async ({ searchParams }: SearchParams) => {
  const params = await searchParams;

  const { data } = await getUser({ searchParams: params });
  const session = await auth();
  const accessPermission = session?.user.permission ?? [];

  return (
    <>
      <UserTable
        searchParams={params}
        data={data}
        accessPermission={accessPermission}
      />
    </>
  );
};

export default UsersPage;
