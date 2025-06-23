import serverApi from "@/lib/api/serverApi";
import { createQueryParams } from "@/lib/utils";
import HuaweiFormQuestionTable from "./HuaweiFormQuestionTable";
import { auth } from "@/auth";

interface FormHuaweiQuestionPageProps {
  params: { uuid: string };
  searchParams: Record<string, string | undefined>;
}

export interface QuestionHuawei {
  uuid: string;
  form_id: number;
  type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "TRUE_FALSE" | "ESSAY";
  point: number;
  difficulty: "EASY" | "MEDIUM" | "HOT";
  question: string;
  options: Array<{
    option_text?: string;
    is_correct: boolean;
  }>;
  created_at: Date;
  updated_at: Date | null;
}

export interface QuestionHuaweiData {
  data: QuestionHuawei[];
  totalPages: number;
  total: number;
}

const getFormsQuestionHuawei = async ({
  uuid,
  searchParams,
}: {
  uuid: string;
  searchParams: Record<string, string | undefined>;
}) => {
  const params = createQueryParams(searchParams);
  const { data } = await serverApi.get<QuestionHuaweiData>(
    `form-huawei/question/${uuid}?${params}`
  );
  return data;
};

const FormHuaweiQuestionPage = async ({
  params,
  searchParams,
}: FormHuaweiQuestionPageProps) => {
  const { uuid } = await params;
  const session = await auth();
  const accessPermission = session?.user.permission ?? [];
  const sParams = await searchParams;

  const data = await getFormsQuestionHuawei({
    uuid,
    searchParams: sParams,
  });

  return (
    <>
      <HuaweiFormQuestionTable
        data={data}
        accessPermission={accessPermission}
        formUuid={uuid}
      />
    </>
  );
};

export default FormHuaweiQuestionPage;
