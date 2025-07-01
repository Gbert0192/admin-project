"use client";

import { QuizResultHuawei } from "@/app/quiz/huawei/quiz-result-huawei";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  Timer,
  XCircle,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Loader2,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useQuiz } from "./use-quiz";
import { QuizSkeleton } from "../QuizSkeleton";

export interface Option {
  id: number;
  option_text: string | null;
  is_correct: boolean;
}
export interface Question {
  id: number;
  uuid: string;
  question: string;
  type: "MULTIPLE_CHOICE" | "SINGLE_CHOICE" | "TRUE_FALSE" | "ESSAY";
  difficulty: "EASY" | "MEDIUM" | "HOT";
  point: number;
  options: Option[];
}

const formatDuration = (totalSeconds: number | null) => {
  if (totalSeconds === null) return "00:00";
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

export default function QuizHuaweiPage() {
  const params = useParams();
  const uuid = useMemo(() => params.uuid as string, [params.uuid]);
  const [showUncertainAlert, setShowUncertainAlert] = useState(false);

  const { data: quizData, isPending } = useQuery({
    queryKey: ["huaweiQuizData", uuid],
    queryFn: async () => {
      const { data } = await api.get<{
        data: Question[];
        form_title: string;
        durations: number;
        form_uuid: string;
      }>(`form-huawei/quiz/${uuid}`);
      return data;
    },
    refetchOnWindowFocus: false,
    enabled: !!uuid,
  });

  const quizLogic = useQuiz({
    questions: quizData?.data ?? [],
    durations: quizData?.durations ?? 0,
    form_uuid: quizData?.form_uuid ?? null,
  });

  if (isPending) {
    return <QuizSkeleton />;
  }

  if (!quizData) {
    return (
      <div className="flex h-screen items-center justify-center">
        Quiz not found or failed to load.
      </div>
    );
  }

  if (quizLogic.submitted) {
    const durationTaken =
      quizData.durations * 60 - (quizLogic.remainingTime ?? 0);
    const mappedQuizData = quizData.data.map((q) => ({
      question: q.question,
      options: q.options.map((opt) => opt.option_text ?? ""),
      correctAnswer: q.options
        .filter((opt) => opt.is_correct)
        .map((opt) => opt.option_text ?? ""),
      type: q.type,
      points: q.point,
    }));

    return (
      <div className="p-4 max-w-5xl mx-auto">
        <QuizResultHuawei
          score={quizLogic.totalScore}
          review={quizLogic.review}
          answers={quizLogic.answers}
          quizData={mappedQuizData}
          duration={durationTaken}
          onRetake={() => quizLogic.handleRetake(uuid)}
        />
      </div>
    );
  }

  const handleSubmitClick = () => {
    return quizLogic.handleSubmit(false);
  };

  const handleForceSubmit = () => {
    setShowUncertainAlert(false);
    quizLogic.handleSubmit(true);
  };

  return (
    <>
      <div className="flex h-screen bg-white text-slate-800 overflow-hidden">
        <aside className="w-1/4 border-r p-4 flex flex-col justify-between bg-gray-50">
          <div className="overflow-y-auto pr-2 space-y-2 flex-1">
            <h2 className="font-bold text-xl mb-2 text-primary-blue-dark">
              📋 Question List
            </h2>
            <div className="grid grid-cols-1 gap-2">
              {quizData.data.map((q, idx) => {
                const isAnswered = quizLogic.answers[idx]?.length > 0;
                return (
                  <button
                    key={idx}
                    onClick={() => quizLogic.handleSelectQuestion(idx)}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border text-left text-sm shadow-sm transition-all duration-200",
                      quizLogic.currentIndex === idx &&
                        "bg-blue-100 text-blue-700 border-blue-500 font-semibold",
                      quizLogic.uncertain.includes(idx) &&
                        "ring-2 ring-yellow-400"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Question {idx + 1}</span>
                      <span className="text-xs text-gray-500">
                        {q.point} pts
                      </span>
                    </div>
                    <div className="mt-2 h-1 w-full rounded-full bg-gray-200">
                      <div
                        className={cn(
                          "h-1 rounded-full",
                          isAnswered && "bg-blue-500"
                        )}
                        style={{ width: isAnswered ? "100%" : "0%" }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="pt-4 border-t text-sm text-gray-600 space-y-1">
            <p>
              ✅ {quizLogic.answeredCount} / {quizData.data.length} answered
            </p>
            <p>⚠️ {quizLogic.uncertain.length} uncertain</p>
            <Button
              onClick={handleSubmitClick}
              disabled={quizLogic.isSubmitting}
              className="w-full mt-2 bg-blue-600 text-white hover:bg-blue-500 transition"
            >
              {quizLogic.isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Submit Quiz"
              )}
            </Button>
          </div>
        </aside>

        <main className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-bold text-slate-800">
                {quizData.form_title}
              </h1>
              <div
                className={cn(
                  "flex items-center gap-2 text-sm font-semibold",
                  (quizLogic.remainingTime ?? 0) < 60
                    ? "text-red-600"
                    : "text-slate-600"
                )}
              >
                <Timer className="w-5 h-5" />
                <span>{formatDuration(quizLogic.remainingTime)}</span>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
            <div className="w-full max-w-4xl">
              <div className="text-center mb-6">
                <p className="text-sm text-slate-500">
                  Question {quizLogic.currentIndex + 1} of{" "}
                  {quizData.data.length}
                </p>
              </div>
              <div className="bg-white border rounded-xl shadow-md p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-primary-blue-dark">
                    {quizLogic.currentQuestion?.question}
                  </p>
                  <div className="flex flex-row gap-3">
                    <Badge variant="secondary">
                      {quizLogic.currentQuestion?.type.replace("_", " ")}
                    </Badge>
                    <Badge
                      variant={
                        quizLogic.currentQuestion?.difficulty === "EASY"
                          ? "success"
                          : quizLogic.currentQuestion?.difficulty === "MEDIUM"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {quizLogic.currentQuestion?.difficulty}
                    </Badge>
                  </div>
                </div>
                {quizLogic.currentQuestion?.type === "ESSAY" ? (
                  <textarea
                    rows={4}
                    className="w-full border p-3 rounded-md shadow-sm"
                    value={quizLogic.answers[quizLogic.currentIndex]?.[0] || ""}
                    onChange={(e) => quizLogic.handleAnswer(e.target.value)}
                  />
                ) : (
                  <div className="space-y-3">
                    {quizLogic.currentQuestion?.options.map((option) => (
                      <label
                        key={option.option_text}
                        className={cn(
                          "flex items-center gap-3 border p-3 rounded cursor-pointer",
                          quizLogic.answers[quizLogic.currentIndex]?.includes(
                            option.option_text ?? ""
                          ) && "border-blue-500 bg-blue-50"
                        )}
                      >
                        <input
                          type={
                            quizLogic.currentQuestion?.type ===
                            "MULTIPLE_CHOICE"
                              ? "checkbox"
                              : "radio"
                          }
                          name={`question-${quizLogic.currentIndex}`}
                          checked={
                            quizLogic.answers[quizLogic.currentIndex]?.includes(
                              option.option_text ?? ""
                            ) || false
                          }
                          onChange={() =>
                            quizLogic.handleAnswer(option.option_text ?? "")
                          }
                        />
                        <span>{option.option_text}</span>
                      </label>
                    ))}
                  </div>
                )}
                {quizLogic.answers[quizLogic.currentIndex]?.length > 0 && (
                  <div className="pt-4 mt-4 border-t border-dashed">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                      onClick={quizLogic.handleClearAnswer}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Clear My Answer
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="sticky bottom-0 bg-white/50 backdrop-blur-sm p-4 border-t">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <Button
                onClick={quizLogic.handlePrev}
                disabled={quizLogic.currentIndex === 0}
                className="text-white"
              >
                <ChevronLeft className="w-4 h-4 mr-2" /> Previous
              </Button>
              <Button
                onClick={quizLogic.toggleUncertain}
                variant="outline"
                className={cn(
                  quizLogic.uncertain.includes(quizLogic.currentIndex) &&
                    "bg-yellow-100"
                )}
              >
                <HelpCircle className="w-4 h-4 mr-2" /> Uncertain
              </Button>
              <Button
                onClick={quizLogic.handleNext}
                disabled={quizLogic.currentIndex === quizData.data.length - 1}
                className="text-white"
              >
                Next <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </main>
      </div>
      <AlertDialog
        open={showUncertainAlert}
        onOpenChange={setShowUncertainAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Uncertain Questions Remaining</AlertDialogTitle>
            <AlertDialogDescription>
              You have {quizLogic.uncertain.length} uncertain questions. Submit
              anyway?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Review First</AlertDialogCancel>
            <AlertDialogAction onClick={handleForceSubmit}>
              Submit Anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
