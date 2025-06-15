import { createQueryParams, SearchParams } from "@/lib/utils";
import RoleTable from "./RoleTable";
import serverApi from "@/lib/api/serverApi";

export interface Permission {
  uuid: string;
  route: string;
  permission_name: string;
  is_menu: boolean;
}

export interface Role {
  uuid: string;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  permissions: Permission[];
  role_name: string;
}

export interface RoleData {
  data: Role[];
  totalPages: number;
  total: number;
}

export interface GetPermissionsResponse {
  uuid: string;
  route: string;
  permission_name: string;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

const getRoles = async ({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) => {
  const params = createQueryParams(searchParams);
  const { data } = await serverApi.get<RoleData>(`role?${params}`);
  return { data };
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
