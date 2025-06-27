import { SearchParams } from "@/lib/utils";
import { redirect } from "next/navigation";
import HuaweiQuizCard from "./HuaweiQuizCard";
import serverApi from "@/lib/api/serverApi";

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

const getFormsHuawei = async ({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) => {
  const uuid = searchParams.uuid;

  if (!uuid) {
    redirect("/quizzes");
  }

  const { data } = await serverApi.get<{ data: FormHuawei }>(
    `form-huawei/${uuid.toString()}`
  );
  return data.data;
};

const HuaweiFormPage = async ({ searchParams }: SearchParams) => {
  const params = await searchParams;

  const data = await getFormsHuawei({
    searchParams: params,
  });

  const totalQuestions =
    Number(data.published_single_choice_count) +
    Number(data.published_essay_count) +
    Number(data.published_true_false_count) +
    Number(data.published_multiple_choice_count);

  return (
    <>
      <HuaweiQuizCard
        data={data}
        totalQuestions={totalQuestions}
        uuid={params.uuid!}
      />
    </>
  );
};

export default HuaweiFormPage;
