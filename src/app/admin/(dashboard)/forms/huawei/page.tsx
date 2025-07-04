import { auth } from "@/auth";
import serverApi from "@/lib/api/serverApi";
import { createQueryParams, SearchParams } from "@/lib/utils";
import FormHuaweiTable from "./HuaweiFormTable";

export interface FormHuawei {
  uuid: string;
  form_title: string;
  form_description: string;
  is_published: boolean;
  published_essay_count: number;
  published_multiple_choice_count: number;
  published_single_choice_count: number;
  published_true_false_count: number;
  essay_count: number;
  single_choice_count: number;
  multiple_choice_count: number;
  true_false_count: number;
  durations: number;
  created_at: string;
  updated_at?: string | null;
  deleted_at?: string | null;
}

export interface FormHuaweiData {
  data: FormHuawei[];
  totalPages: number;
  total: number;
}

export interface GetFormHuaweiResponse {
  uuid: string;
  form_title: string;
  form_description: string;
  is_published: boolean;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}
const getFormsHuawei = async ({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) => {
  const params = createQueryParams(searchParams);
  const { data } = await serverApi.get<FormHuaweiData>(`form-huawei?${params}`);
  return { data };
};

const FormHuaweiPage = async ({ searchParams }: SearchParams) => {
  const params = await searchParams;
  const session = await auth();
  const accessPermission = session?.user.permission ?? [];

  const { data } = await getFormsHuawei({
    searchParams: params,
  });

  return (
    <>
      <FormHuaweiTable
        searchParams={params}
        data={data}
        accessPermission={accessPermission}
      />
    </>
  );
};

export default FormHuaweiPage;
