import serverApi from "@/lib/api/serverApi";
import { createQueryParams } from "@/lib/utils";
import UserTable from "./UserTable";

interface UsersPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

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

const UsersPage = async ({ searchParams }: UsersPageProps) => {
  const params = await searchParams;
  // const limit = Number(searchParams.limit) || 10;
  // const page = Number(searchParams.page) || 1;
  const { data } = await getUser({ searchParams: params });

  return (
    <>
      <UserTable searchParams={params} data={data} />
    </>
  );
};

export default UsersPage;
