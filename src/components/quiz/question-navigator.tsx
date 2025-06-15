import React from "react";
import { cn } from "@/lib/utils";
import { UserAnswers, Question } from "../../app/lib/quiz-data";

interface QuestionNavigatorProps {
  quizData: Question[];
  currentQuestionIndex: number;
  userAnswers: UserAnswers;
  onNavigate: (index: number) => void;
}

export const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({
  quizData,
  currentQuestionIndex,
  userAnswers,
  onNavigate,
}) => {
  const isQuestionAnswered = (question: Question): boolean => {
    const userAnswer = userAnswers[question.id];

    if (question.type === "multiple-choice") {
      return typeof userAnswer === "string" && userAnswer.length > 0;
    }
    if (question.type === "multiple-answers") {
      return Array.isArray(userAnswer) && userAnswer.length > 0;
    }
    if (question.type === "essay") {
      return typeof userAnswer === "string" && userAnswer.trim().length > 0;
    }
    return false;
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
      <h4 className="font-semibold text-lg mb-3 text-center">
        Question Progress
      </h4>
      <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-15 lg:grid-cols-12 gap-2">
        {quizData.map((question, index) => (
          <button
            key={question.id}
            onClick={() => onNavigate(index)}
            className={cn(
              "flex items-center justify-center w-9 h-9 rounded-full text-sm font-medium transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2",
              currentQuestionIndex === index
                ? "bg-[var(--primary)] text-white shadow-md"
                : isQuestionAnswered(question)
                  ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200 hover:bg-green-200"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200"
            )}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
