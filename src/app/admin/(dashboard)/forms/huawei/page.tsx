import { auth } from "@/auth";
import serverApi from "@/lib/api/serverApi";
import { createQueryParams } from "@/lib/utils";
import FormHuaweiTable from "./HuaweiFormTable";

interface PermissionPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export interface FormHuawei {
  uuid: string;
  form_title: string;
  form_description: string;
  is_published: boolean;
  created_at: string;
  updated_at?: string | null;
  deleted_at?: string | null;
}

export interface FormHuaweiData {
  data: FormHuawei[];
  totalPages: number;
  total: number;
}

const getFormsHuawei = async ({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) => {
  const params = createQueryParams(searchParams);
  const { data } = await serverApi.get<FormHuaweiData>(`role?${params}`);
  return { data };
};

const PermissionsPage = async ({ searchParams }: PermissionPageProps) => {
  const params = await searchParams;
  const data = await getFormsHuawei({ searchParams: params });
  const session = await auth();
  const accessPermission = session?.user.permission ?? [];

  return (
    <>
      <FormHuaweiTable data={data} accessPermission={accessPermission} />
    </>
  );
};

export default PermissionsPage;
