import { auth } from "@/auth";
import serverApi from "@/lib/api/serverApi";
import { createQueryParams, SearchParams } from "@/lib/utils";
import FormKahootTable from "./KahootFormTable";

export interface FormKahoot {
  uuid: string;
  form_title: string;
  form_description: string;
  is_published: boolean;
  duration: number;
  single_choice_count: number;
  multiple_choice_count: number;
  true_false_count: number;
  published_single_choice_count: number;
  published_multiple_choice_count: number;
  published_true_false_count: number;
  created_at: string;
  updated_at?: string | null;
  deleted_at?: string | null;
}

export interface FormKahootData {
  data: FormKahoot[];
  totalPages: number;
  total: number;
}

export interface GetFormKahootResponse {
  uuid: string;
  form_title: string;
  form_description: string;
  is_published: boolean;
  duration: number;
  created_at: string;
  updated_at?: string | null;
  deleted_at?: string | null;
}

const getFormsKahoot = async ({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) => {
  const params = createQueryParams(searchParams);
  const { data } = await serverApi.get<FormKahootData>(`form-kahoot?${params}`);
  return { data };
};

const FormsKahootPage = async ({ searchParams }: SearchParams) => {
  const params = await searchParams;
  const session = await auth();
  const accessPermission = session?.user.permission ?? [];

  const { data } = await getFormsKahoot({
    searchParams: params,
  });

  return (
    <FormKahootTable
      searchParams={params}
      data={data}
      accessPermission={accessPermission}
    />
  );
};

export default FormsKahootPage;
