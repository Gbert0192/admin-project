import { SearchParams } from "@/lib/utils";
import { redirect } from "next/navigation";
import HuaweiQuizCard from "./HuaweiQuizCard";
import KahootQuizCard from "./KahootQuizCard";
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

const getFormsHuawei = async (uuid: string) => {
  const { data } = await serverApi.get<{ data: FormHuawei }>(
    `form-huawei/${uuid}`
  );
  return data.data;
};

const getFormsKahoot = async (uuid: string) => {
  const { data } = await serverApi.get<{ data: FormKahoot }>(
    `form-kahoot/${uuid}`
  );
  return data.data;
};

const QuizPage = async ({ searchParams }: SearchParams) => {
  const params = await searchParams;

  const uuid = params.uuid;
  const type = params.type ?? "huawei";

  if (!uuid) {
    redirect("/quizzes");
  }

  if (type === "kahoot") {
    const data = await getFormsKahoot(uuid);
    const totalQuestions =
      Number(data.published_single_choice_count) +
      Number(data.published_multiple_choice_count) +
      Number(data.published_true_false_count);

    return (
      <KahootQuizCard data={data} totalQuestions={totalQuestions} uuid={uuid} />
    );
  } else {
    const data = await getFormsHuawei(uuid);
    const totalQuestions =
      Number(data.published_single_choice_count) +
      Number(data.published_multiple_choice_count) +
      Number(data.published_true_false_count) +
      Number(data.published_essay_count);

    return (
      <HuaweiQuizCard data={data} totalQuestions={totalQuestions} uuid={uuid} />
    );
  }
};

export default QuizPage;
