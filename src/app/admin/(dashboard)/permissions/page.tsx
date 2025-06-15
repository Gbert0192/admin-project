import { createQueryParams } from "@/lib/utils";
import PermissionTable from "./PermissionTable";
import serverApi from "@/lib/api/serverApi";
import { Method } from "@/lib/schema/PermissionSchema";

interface PermissionPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export interface Permission {
  uuid: string;
  created_at: string;
  method: Method[];
  updated_at: string | null;
  deleted_at: string | null;
  route: string;
  permission_name: string;
}

export interface PermissionData {
  data: Permission[];
  totalPages: number;
  total: number;
}

const getPermission = async ({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) => {
  const params = createQueryParams(searchParams);

  const data = await serverApi.get(`permission?${params}`);

  return data;
};

const PermissionsPage = async ({ searchParams }: PermissionPageProps) => {
  const params = await searchParams;
  const { data } = await getPermission({ searchParams: params });
  return (
    <>
      <PermissionTable searchParams={params} data={data} />
    </>
  );
};

export default PermissionsPage;
