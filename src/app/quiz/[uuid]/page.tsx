"use client";

import React, { useEffect, useState } from "react";
import { quizData } from "@/app/lib/quiz-data-huawei";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { QuizResultHuawei } from "@/components/quiz/huawei-style/quiz-result-huawei";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function QuizHuaweiPage() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [uncertain, setUncertain] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [review, setReview] = useState<Record<number, boolean>>({});
  const [showResultPage, setShowResultPage] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showUncertainAlert, setShowUncertainAlert] = useState(false);
  const [forceSubmit, setForceSubmit] = useState(false);

  const currentQuestion = quizData[currentIndex];
  const total = quizData.length;

  useEffect(() => {
    if (submitted) return;
    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, submitted]);

  const formatDuration = (ms: number) => {
    const sec = Math.floor(ms / 1000);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };

  const handleAnswer = (option: string) => {
    if (currentQuestion.type === "multiple") {
      const currentAnswers = answers[currentIndex] || [];
      const updatedAnswers = currentAnswers.includes(option)
        ? currentAnswers.filter((ans) => ans !== option)
        : [...currentAnswers, option];
      setAnswers((prev) => ({ ...prev, [currentIndex]: updatedAnswers }));
    } else {
      setAnswers((prev) => ({ ...prev, [currentIndex]: [option] }));
    }
  };

  const handleEssayChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: [value] }));
  };

  const toggleUncertain = () => {
    setUncertain((prev) =>
      prev.includes(currentIndex)
        ? prev.filter((i) => i !== currentIndex)
        : [...prev, currentIndex]
    );
  };

  const handleSubmit = () => {
    if (!forceSubmit && uncertain.length > 0) {
      setShowUncertainAlert(true);
      return;
    }

    const reviewResult: Record<number, boolean> = {};
    let score = 0;

    quizData.forEach((q, i) => {
      const userAnswer = answers[i] || [];
      let isCorrect = false;
      if (q.type === "multiple") {
        isCorrect =
          JSON.stringify([...userAnswer].sort()) ===
          JSON.stringify([...q.correctAnswer].sort());
      } else if (q.type === "essay") {
        isCorrect =
          userAnswer[0]?.trim().toLowerCase() ===
          String(q.correctAnswer[0] || "")
            .trim()
            .toLowerCase();
      } else {
        isCorrect = userAnswer[0] === q.correctAnswer[0];
      }
      reviewResult[i] = isCorrect;
      if (isCorrect) score += q.points || 0;
    });

    setReview(reviewResult);
    setTotalScore(score);
    setElapsedTime(Date.now() - startTime);
    setSubmitted(true);
    setShowResultPage(true);
    setForceSubmit(false);
  };

  const handleRetake = () => {
    setAnswers({});
    setReview({});
    setTotalScore(0);
    setSubmitted(false);
    setShowResultPage(false);
    setCurrentIndex(0);
    setUncertain([]);
    setStartTime(Date.now());
  };

  const answeredCount = Object.keys(answers).filter(
    (k) => answers[+k] && answers[+k].length > 0 && answers[+k][0].trim() !== ""
  ).length;

  if (showResultPage) {
    const formattedAnswers: Record<string, string[]> = {};
    quizData.forEach((q, i) => {
      if (q.id) {
        formattedAnswers[q.id.toString()] = answers[i] || [];
      }
    });
    return (
      <div className="p-4 max-w-5xl mx-auto">
        <QuizResultHuawei
          score={totalScore}
          totalQuestions={quizData.length}
          quizData={quizData}
          userAnswers={formattedAnswers}
          duration={formatDuration(elapsedTime)}
          onRetakeQuiz={handleRetake}
        />
      </div>
    );
  }

  return (
    <>
      <div className="flex h-screen bg-white text-slate-800 overflow-hidden">
        <aside className="w-1/4 border-r p-4 flex flex-col justify-between bg-gray-50">
          <div className="overflow-y-auto pr-2 space-y-2 flex-1">
            <h2 className="font-bold text-xl mb-2 text-primary-blue-dark">
              📋 Question List
            </h2>
            <div className="grid grid-cols-1 gap-2">
              {quizData.map((q, idx) => {
                const isCurrent = currentIndex === idx;
                const isAnswered =
                  answers[idx]?.length > 0 && answers[idx][0].trim() !== "";
                const isUncertain = uncertain.includes(idx);
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border text-left text-sm shadow-sm transition-all duration-200",
                      isCurrent
                        ? "bg-blue-100 text-blue-700 border-blue-500 font-semibold"
                        : "bg-white hover:bg-gray-100 border-gray-200",
                      isUncertain && "ring-2 ring-yellow-400"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Question {idx + 1}</span>
                      <span className="text-xs text-gray-500">
                        {q.points} pts
                      </span>
                    </div>
                    <div className="mt-1 h-1 w-full rounded-sm bg-gray-200">
                      <div
                        className={cn(
                          "h-1 rounded-sm",
                          isAnswered && "bg-blue-500"
                        )}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t text-sm text-gray-600 space-y-1">
            <p>
              ✅ {answeredCount} / {total} answered
            </p>
            <p>⚠️ {uncertain.length} uncertain</p>
            {!submitted && (
              <Button
                onClick={handleSubmit}
                className="w-full mt-2 bg-green-600 text-white hover:bg-green-700 transition"
              >
                Submit Quiz
              </Button>
            )}
          </div>
        </aside>

        <main className="flex-1 p-6 overflow-y-auto pb-40 animate-fade-in duration-700">
          <div className="flex justify-between items-center mb-4">
            <div className="text-xl font-semibold">
              Question {currentIndex + 1} of {total}
            </div>
            <div className="text-sm text-gray-600">
              ⏱️ Elapsed Time: {formatDuration(elapsedTime)}
            </div>
          </div>

          <div className="bg-white border rounded-xl shadow-md p-6 space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-primary-blue-dark">
                {currentQuestion.question}
              </p>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 border">
                {currentQuestion.type === "essay"
                  ? "Essay"
                  : currentQuestion.type === "multiple"
                    ? "Multiple Choice"
                    : currentQuestion.type === "truefalse"
                      ? "True/False"
                      : "Single Choice"}
              </span>
            </div>

            {currentQuestion.type === "essay" ? (
              <textarea
                rows={4}
                className="w-full border p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-blue-dark transition"
                value={answers[currentIndex]?.[0] || ""}
                onChange={(e) => handleEssayChange(e.target.value)}
                disabled={submitted}
              />
            ) : (
              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => {
                  const selected =
                    answers[currentIndex]?.includes(option) || false;
                  const correct =
                    currentQuestion.correctAnswer.includes(option);
                  const isWrong = submitted && selected && !correct;
                  const showCorrect = submitted && correct;
                  return (
                    <label
                      key={option}
                      className={cn(
                        "flex items-center gap-3 border p-3 rounded cursor-pointer transition-all duration-300 group hover:shadow-sm",
                        selected && !submitted && "border-blue-500 bg-blue-50",
                        isWrong && "border-red-500 bg-red-100",
                        showCorrect && "border-green-500 bg-green-100"
                      )}
                    >
                      {currentQuestion.type === "multiple" ? (
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => handleAnswer(option)}
                          disabled={submitted}
                        />
                      ) : (
                        <input
                          type="radio"
                          name={`question-${currentIndex}`}
                          checked={selected}
                          onChange={() => handleAnswer(option)}
                          disabled={submitted}
                        />
                      )}
                      <span className="font-bold text-gray-700 group-hover:text-blue-600 transition">
                        {"ABCD"[idx]}.
                      </span>
                      <span>{option}</span>
                    </label>
                  );
                })}
              </div>
            )}

            {submitted && (
              <div className="pt-4 border-t text-sm">
                <p className="font-medium text-primary-blue-dark">
                  ✅ Correct Answer: {currentQuestion.correctAnswer.join(", ")}
                </p>
                <p className="text-gray-600">
                  Status:{" "}
                  {review[currentIndex] ? (
                    <span className="text-green-600 font-semibold">
                      Correct
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      Incorrect
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>

          <div className="fixed bottom-4 right-4 md:right-[26%] z-20 flex flex-col md:flex-row gap-2 md:gap-3">
            <Button
              variant="secondary"
              onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
              disabled={currentIndex === 0}
              className="shadow-lg"
            >
              ◀ Previous
            </Button>
            <Button
              onClick={toggleUncertain}
              variant="outline"
              className={cn(
                "shadow-lg transition duration-300",
                uncertain.includes(currentIndex)
                  ? "bg-yellow-500 text-white hover:bg-yellow-600"
                  : "border-yellow-500 text-yellow-600 hover:bg-yellow-100"
              )}
            >
              Uncertain
            </Button>
            <Button
              variant="secondary"
              onClick={() => setCurrentIndex((i) => Math.min(i + 1, total - 1))}
              disabled={currentIndex === total - 1}
              className="shadow-lg"
            >
              Next ▶
            </Button>
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
              You&apos;ve marked <strong>{uncertain.length}</strong> uncertain
              question
              {uncertain.length > 1 ? "s" : ""}. Submit anyway?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Review First</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowUncertainAlert(false);
                setForceSubmit(true);
                setTimeout(handleSubmit, 0);
              }}
            >
              Submit Anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
