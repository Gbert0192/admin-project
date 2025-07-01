import serverApi from "@/lib/api/serverApi";
import React from "react";
import QuizHistoryPage from "./historyPage";

interface PageProps {
  params: {
    uuid: string;
  };
}

interface AnswerDetail {
  is_correct: boolean;
  question_id: number;
  user_answer: string[];
  question_text: string;
  correct_answers: { id: number; text: string }[];
}

interface QuizHistory {
  uuid: string;
  score: number;
  submitted_at: string;
  source: string;
  duration: number;
  answerdetails: AnswerDetail[];
}
const getFormsHistory = async (uuid: string): Promise<QuizHistory> => {
  const { data } = await serverApi.get<{ data: QuizHistory }>(
    `dashboard-user/history/${uuid}`
  );
  return data.data;
};

const HistoryPage = async ({ params }: PageProps) => {
  const history = await getFormsHistory(params.uuid);
  return (
    <div>
      <QuizHistoryPage data={history} />
    </div>
  );
};

export default HistoryPage;
