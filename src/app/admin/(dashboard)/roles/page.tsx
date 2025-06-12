import { createQueryParams, SearchParams } from "@/lib/utils";
import RoleTable from "./RoleTable";
import serverApi from "@/lib/api/serverApi";

export interface Role {
  uuid: string;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  permission_id: number[];
  role_name: string;
}

export interface RoleData {
  data: Role[];
  totalPages: number;
  total: number;
}

const getRoles = async ({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) => {
  const params = createQueryParams(searchParams);
  const data = await serverApi.get(`role?${params}`);
  return data;
};

const RolesPage = async ({ searchParams }: SearchParams) => {
  const params = await searchParams;

  const { data } = await getRoles({ searchParams: params });
  return (
    <>
      <RoleTable searchParams={params} data={data} />
    </>
  );
};

export default RolesPage;
