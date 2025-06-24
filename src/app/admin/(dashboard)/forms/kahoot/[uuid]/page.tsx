import serverApi from "@/lib/api/serverApi";
import { createQueryParams } from "@/lib/utils";
import { auth } from "@/auth";
import KahootFormQuestionTable from "./KahootFormQuestionTable";

interface FormKahootQuestionPageProps {
  params: Promise<{ uuid: string }>;
  searchParams: Record<string, string | undefined>;
}

export interface QuestionKahoot {
  uuid: string;
  form_id: number;
  question_type: "single_choice" | "multiple_choice" | "true_false";
  question_text: string;
  options: Array<{
    option_text?: string;
    is_correct: boolean;
  }>;
  created_at: Date;
  updated_at: Date | null;
}

export interface QuestionKahootData {
  data: QuestionKahoot[];
  totalPages: number;
  total: number;
}

const getFormsQuestionKahoot = async ({
  uuid,
  searchParams,
}: {
  uuid: string;
  searchParams: Record<string, string | undefined>;
}) => {
  const params = createQueryParams(searchParams);
  const { data } = await serverApi.get<QuestionKahootData>(
    `form-kahoot/question/${uuid}?${params}`
  );
  return data;
};

const FormKahootQuestionPage = async ({
  params,
  searchParams,
}: FormKahootQuestionPageProps) => {
  const { uuid } = await params;
  const session = await auth();
  const accessPermission = session?.user.permission ?? [];
  const sParams = await searchParams;

  const data = await getFormsQuestionKahoot({
    uuid,
    searchParams: sParams,
  });

  return (
    <>
      <KahootFormQuestionTable
        data={data}
        accessPermission={accessPermission}
        formUuid={uuid}
      />
    </>
  );
};

export default FormKahootQuestionPage;
