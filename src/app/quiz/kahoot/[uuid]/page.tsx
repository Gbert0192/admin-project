"use client";

import { QuizResultKahoot } from "@/app/quiz/kahoot/quiz-result-kahoot";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Timer, CheckCircle, XCircle, TrendingUp, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useKahootQuiz } from "./use-quiz";
import { QuizSkeleton } from "../QuizSkeleton";

export interface Option {
  id: number;
  option_text: string | null;
  is_correct: boolean;
}

export interface Question {
  id: number;
  uuid: string;
  question_text: string;
  question_type: "multiple_choice" | "single_choice" | "true_false";
  options: Option[];
}

const formatDuration = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

function AnswerReview({
  question,
  userAnswer,
  correctAnswer,
  isCorrect,
  currentScore,
  previousScore,
  onNext,
}: {
  question: Question;
  userAnswer: string[];
  correctAnswer: string[];
  isCorrect: boolean;
  currentScore: number;
  previousScore: number;
  onNext: () => void;
}) {
  const isUnanswered = userAnswer.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-0">
        <CardContent className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            {isUnanswered ? (
              <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">?</span>
              </div>
            ) : isCorrect ? (
              <CheckCircle className="w-20 h-20 text-green-500" />
            ) : (
              <XCircle className="w-20 h-20 text-red-500" />
            )}
          </div>

          <div>
            <h2
              className={cn(
                "text-3xl font-bold mb-2",
                isUnanswered
                  ? "text-yellow-600"
                  : isCorrect
                    ? "text-green-600"
                    : "text-red-600"
              )}
            >
              {isUnanswered
                ? "Unanswered!"
                : isCorrect
                  ? "Correct!"
                  : "Incorrect!"}
            </h2>
            <p className="text-gray-600 text-lg">{question.question_text}</p>
          </div>

          <div className="space-y-4">
            {isUnanswered ? (
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-600 font-medium mb-2">
                  Status:
                </p>
                <p className="text-yellow-800">No answer provided</p>
              </div>
            ) : (
              !isCorrect && (
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm text-red-600 font-medium mb-2">
                    Your Answer:
                  </p>
                  <p className="text-red-800">{userAnswer.join(", ")}</p>
                </div>
              )
            )}

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-600 font-medium mb-2">
                Correct Answer:
              </p>
              <p className="text-green-800">{correctAnswer.join(", ")}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 text-2xl font-bold">
            <span className="text-gray-600">{previousScore}</span>
            <span className="text-2xl">+</span>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-blue-500" />
              <span
                className={cn(
                  "text-2xl font-bold",
                  currentScore > 0 ? "text-green-600" : "text-gray-500"
                )}
              >
                {currentScore}
              </span>
            </div>
          </div>

          <Button
            onClick={onNext}
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function QuizKahootPage() {
  const params = useParams();
  const uuid = useMemo(() => params.uuid as string, [params.uuid]);

  const { data: quizData, isPending } = useQuery({
    queryKey: ["kahootQuizData", uuid],
    queryFn: async () => {
      const { data } = await api.get<{
        data: Question[];
        form_title: string;
        duration: number;
        form_uuid: string;
      }>(`form-kahoot/quiz/${uuid}`);
      return data;
    },
    refetchOnWindowFocus: false,
    enabled: !!uuid,
  });

  const quizLogic = useKahootQuiz({
    questions: quizData?.data ?? [],
    duration_seconds: quizData?.duration ?? 30,
    form_uuid: quizData?.form_uuid ?? null,
    question_duration: quizData?.duration ?? 30,
  });

  if (isPending) {
    return <QuizSkeleton />;
  }

  if (!quizData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Quiz Not Found
          </h2>
          <p className="text-gray-600">
            The quiz you&apos;re looking for could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  if (quizLogic.submitted) {
    const mappedQuizData = quizData.data.map((q) => ({
      question_text: q.question_text,
      options: q.options.map((opt) => opt.option_text ?? ""),
      correctAnswer: q.options
        .filter((opt) => opt.is_correct)
        .map((opt) => opt.option_text ?? ""),
      question_type: q.question_type,
    }));

    return (
      <div className="p-4 max-w-5xl mx-auto">
        <QuizResultKahoot
          score={quizLogic.totalScore}
          review={quizLogic.review}
          answers={quizLogic.answers}
          quizData={mappedQuizData}
          onRetake={quizLogic.handleRetake}
        />
      </div>
    );
  }

  if (quizLogic.showAnswerReview && quizLogic.currentQuestion) {
    return (
      <AnswerReview
        question={quizLogic.currentQuestion}
        userAnswer={quizLogic.answers[quizLogic.currentIndex] ?? []}
        correctAnswer={quizLogic.getCurrentCorrectAnswer()}
        isCorrect={quizLogic.isCurrentAnswerCorrect()}
        currentScore={quizLogic.currentQuestionScore}
        previousScore={quizLogic.previousScore}
        onNext={quizLogic.handleNextQuestion}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="w-full h-3 bg-gray-200">
        <div
          className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 transition-all duration-1000 ease-linear"
          style={{ width: `${quizLogic.timerPercentage}%` }}
        />
      </div>

      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {quizData.form_title}
            </h1>
            <p className="text-gray-600">
              Question {quizLogic.currentIndex + 1} of {quizData.data.length}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xl font-bold">
              <Timer className="w-6 h-6 text-blue-600" />
              <span
                className={cn(
                  "transition-colors",
                  quizLogic.questionTimer <= 5
                    ? "text-red-500"
                    : "text-blue-600"
                )}
              >
                {formatDuration(quizLogic.questionTimer)}
              </span>
            </div>
            <div className="text-right bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-lg">
              <p className="text-sm text-gray-600 font-medium">Score</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {quizLogic.totalScore}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {quizLogic.currentQuestion && (
            <div className="space-y-8">
              {/* Question */}
              <Card className="border-0 shadow-xl bg-white">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex-1">
                      {quizLogic.currentQuestion.question_text}
                    </h2>
                    <div className="flex gap-2 ml-4">
                      <Badge variant="secondary" className="text-sm">
                        {quizLogic.currentQuestion.question_type.replace(
                          "_",
                          " "
                        )}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {quizLogic.currentQuestion.options.map((option, idx) => {
                      const isSelected = quizLogic.answers[
                        quizLogic.currentIndex
                      ]?.includes(option.option_text ?? "");
                      const colors = [
                        "bg-red-500",
                        "bg-blue-500",
                        "bg-yellow-500",
                        "bg-green-500",
                      ];
                      const hoverColors = [
                        "hover:bg-red-600",
                        "hover:bg-blue-600",
                        "hover:bg-yellow-600",
                        "hover:bg-green-600",
                      ];

                      return (
                        <button
                          key={option.id}
                          onClick={() =>
                            quizLogic.handleAnswer(option.option_text ?? "")
                          }
                          disabled={quizLogic.showAnswerReview}
                          className={cn(
                            "p-6 rounded-xl text-left text-white font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg",
                            colors[idx % 4],
                            hoverColors[idx % 4],
                            isSelected && "ring-4 ring-white scale-105",
                            quizLogic.showAnswerReview &&
                              "opacity-75 cursor-not-allowed"
                          )}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                              {String.fromCharCode(65 + idx)}
                            </div>
                            <span>{option.option_text}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {quizLogic.isSubmitting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-lg font-semibold text-gray-800">
              Calculating your score...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
