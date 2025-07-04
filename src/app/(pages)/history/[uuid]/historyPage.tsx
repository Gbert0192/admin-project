"use client";

import {
  Clock,
  CheckCircle,
  XCircle,
  Award,
  BookOpen,
  Target,
} from "lucide-react";
import { useRouter } from "next/navigation";

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

interface QuizHistoryPageProps {
  data: QuizHistory;
}

const QuizHistoryPage = ({ data }: QuizHistoryPageProps) => {
  const router = useRouter();
  const correctAnswers = data.answerdetails.filter((q) => q.is_correct).length;
  const totalQuestions = data.answerdetails.length;
  const percentage =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-grey-50 to-grey-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">
            Quiz History
          </h1>
          <p className="text-blue-600">
            Review your quiz performance and learn from your answers
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Award className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900">{data.score}</h3>
              <p className="text-blue-600">Final Score</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Target className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-green-700">
                {percentage}%
              </h3>
              <p className="text-blue-600">Accuracy</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Clock className="text-purple-600 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-purple-700">
                {formatDuration(data.duration)}
              </h3>
              <p className="text-blue-600">Duration</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <BookOpen className="text-orange-600 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-orange-700">
                {correctAnswers}/{totalQuestions}
              </h3>
              <p className="text-blue-600">Correct</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-blue-100">
            <div className="flex justify-between items-center text-sm text-blue-600">
              <span>
                Source:{" "}
                <span className="font-semibold text-blue-800">
                  {data.source.toUpperCase()}
                </span>
              </span>
              <span>
                Completed:{" "}
                <span className="font-semibold text-blue-800">
                  {formatDate(data.submitted_at)}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-blue-100">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-blue-900">
              Overall Performance
            </h3>
            <span className="text-sm text-blue-600">
              {correctAnswers} of {totalQuestions} correct
            </span>
          </div>
          <div className="w-full bg-blue-100 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            Question Review
          </h2>

          {data.answerdetails.map((question, index) => (
            <div
              key={question.question_id}
              className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden"
            >
              <div
                className={`p-6 ${question.is_correct ? "bg-green-50 border-l-4 border-green-500" : "bg-red-50 border-l-4 border-red-500"}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Q{index + 1}
                    </span>
                    {question.is_correct ? (
                      <CheckCircle className="text-green-500 w-6 h-6" />
                    ) : (
                      <XCircle className="text-red-500 w-6 h-6" />
                    )}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      question.is_correct
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {question.is_correct ? "Correct" : "Incorrect"}
                  </span>
                </div>

                <p className="text-blue-900 font-medium mb-4 leading-relaxed">
                  {question.question_text}
                </p>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-blue-700 mb-2">
                      Your Answer:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {question.user_answer.map((answer, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-lg text-sm font-medium ${
                            question.is_correct
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : "bg-red-100 text-red-800 border border-red-200"
                          }`}
                        >
                          {answer}
                        </span>
                      ))}
                    </div>
                  </div>

                  {!question.is_correct && (
                    <div>
                      <p className="text-sm font-semibold text-green-700 mb-2">
                        Correct Answer:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {question.correct_answers.map((answer, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-lg text-sm font-medium bg-green-100 text-green-800 border border-green-200"
                          >
                            {answer.text}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Ready for Another Challenge?
            </h3>
            <p className="text-blue-600 mb-6">
              Keep practicing to improve your skills!
            </p>
            <div className="space-x-4">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
                onClick={() => router.push("/quizzes")}
              >
                Take New Quiz
              </button>
              <button
                className="bg-white hover:bg-blue-50 text-blue-600 border-2 border-blue-200 px-8 py-3 rounded-full font-semibold transition-colors duration-200"
                onClick={() => router.push("/")}
              >
                View All History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizHistoryPage;
