import { SearchParams } from "@/lib/utils";
import { redirect } from "next/navigation";
import serverApi from "@/lib/api/serverApi";
import KahootQuizCard from "./KahootQuizCard";

export interface FormKahoot {
  uuid: string;
  form_title: string;
  form_description: string;
  is_published: boolean;
  published_multiple_choice_count: number;
  published_single_choice_count: number;
  published_true_false_count: number;
  single_choice_count: number;
  multiple_choice_count: number;
  true_false_count: number;
  duration: number;
  created_at: string;
  updated_at?: string | null;
  deleted_at?: string | null;
}

export interface FormKahootData {
  data: FormKahoot[];
  totalPages: number;
  total: number;
}

const getFormsKahoot = async ({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) => {
  const uuid = searchParams.uuid;

  if (!uuid) {
    redirect("/quizzes");
  }

  const { data } = await serverApi.get<{ data: FormKahoot }>(
    `form-kahoot/${uuid.toString()}`
  );
  return data.data;
};

const KahootFormPage = async ({ searchParams }: SearchParams) => {
  const params = await searchParams;

  const data = await getFormsKahoot({
    searchParams: params,
  });

  const totalQuestions =
    Number(data.published_single_choice_count) +
    Number(data.published_multiple_choice_count) +
    Number(data.published_true_false_count);

  return (
    <>
      <KahootQuizCard
        data={data}
        totalQuestions={totalQuestions}
        uuid={params.uuid!}
      />
    </>
  );
};

export default KahootFormPage;
