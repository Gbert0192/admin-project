import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, CheckCircle, XCircle, ListTodo } from "lucide-react";
import { Question, UserAnswers } from "../../../app/lib/quiz-data";

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  quizData: Question[];
  userAnswers: UserAnswers;
  onRetakeQuiz: () => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({
  score,
  totalQuestions,
  quizData,
  userAnswers,
  onRetakeQuiz,
}) => {
  return (
    <Card className="w-full shadow-lg rounded-xl m-3">
      <CardHeader className="text-center">
        <CardTitle className="text-4xl font-bold text-[var(--primary)]">
          Quiz Completed!
        </CardTitle>
        <CardDescription className="text-lg">
          See your results below.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center gap-2">
          <Badge
            variant="secondary"
            className="text-2xl px-6 py-2 bg-[var(--custom-gray-light)] text-[var(--custom-gray-text)]"
          >
            Your Score: {score}
          </Badge>
        </div>

        <h3 className="font-semibold text-xl mb-4 flex items-center gap-2 border-t pt-6 text-[var(--secondary)]">
          <ListTodo className="w-6 h-6" />
          Review Answers
        </h3>
        <div className="space-y-6">
          {quizData.map((question, index) => {
            const userAnswer = userAnswers[question.id];
            let isCorrect = false;
            let displayUserAnswer = "";
            let displayCorrectAnswer = "";

            if (question.type === "multiple-choice") {
              isCorrect =
                typeof userAnswer === "string" &&
                userAnswer === question.correctAnswer;
              displayUserAnswer = `Your Answer: ${userAnswer || "No answer"}`;
              displayCorrectAnswer = `Correct Answer: ${question.correctAnswer}`;
            } else if (question.type === "multiple-answers") {
              const sortedUserAnswers = Array.isArray(userAnswer)
                ? [...userAnswer].sort()
                : [];
              const sortedCorrectAnswers = Array.isArray(question.correctAnswer)
                ? [...question.correctAnswer].sort()
                : [];
              isCorrect =
                sortedUserAnswers.length === sortedCorrectAnswers.length &&
                sortedUserAnswers.every(
                  (val, idx) => val === sortedCorrectAnswers[idx]
                );
              displayUserAnswer = `Your Answers: ${sortedUserAnswers.length > 0 ? sortedUserAnswers.join(", ") : "No answer"}`;
              displayCorrectAnswer = `Correct Answers: ${sortedCorrectAnswers.join(", ")}`;
            } else if (question.type === "essay") {
              isCorrect =
                typeof userAnswer === "string" &&
                userAnswer.trim().toLowerCase() ===
                  String(question.correctAnswer).trim().toLowerCase();
              displayUserAnswer = `Your Answer: "${userAnswer || "No answer"}"`;
              displayCorrectAnswer = `Correct Answer: "${question.correctAnswer}"`;
            }

            return (
              <div
                key={question.id}
                className="p-4 border rounded-lg shadow-sm"
              >
                <div className="flex items-start gap-3 mb-2">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                  )}
                  <p className="font-medium text-lg">
                    {index + 1}. {question.question}
                  </p>
                </div>
                <div className="ml-8 text-sm space-y-1">
                  <p
                    className={
                      isCorrect
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                  >
                    {displayUserAnswer}
                  </p>
                  {!isCorrect && (
                    <p className="text-[var(--custom-link-blue)] font-semibold">
                      {displayCorrectAnswer}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center bg-muted/50 p-6 rounded-b-xl">
        <Button
          size="lg"
          onClick={onRetakeQuiz}
          className="bg-[var(--primary)] text-primary-foreground hover:bg-[var(--primary-blue-light)] shadow-md"
        >
          Retake Quiz
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};
