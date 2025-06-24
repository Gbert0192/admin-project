"use client";

import React, { useState, useEffect } from "react";
import { quizData, QuizItem } from "@/app/lib/quiz-data-huawei";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { QuizResultHuawei } from "@/components/quiz/huawei-style/quiz-result-huawei";

type AnswerState = Record<number, string[]>;
type ReviewState = Record<number, boolean>;

export default function QuizHuaweiPage() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [uncertain, setUncertain] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [review, setReview] = useState<ReviewState>({});
  const [showResultPage, setShowResultPage] = useState<boolean>(false);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [showUncertainWarning, setShowUncertainWarning] =
    useState<boolean>(false);

  const [startTime, setStartTime] = useState<number>(Date.now());
  const [duration, setDuration] = useState<number>(0);

  const currentQuestion: QuizItem = quizData[currentIndex];
  const total: number = quizData.length;
  const optionLabels: string[] = ["A", "B", "C", "D"];

  useEffect(() => {
    if (submitted) return;

    const updateDuration = () => {
      setDuration(Math.floor((Date.now() - startTime) / 1000));
    };

    updateDuration();
    const timer = setInterval(updateDuration, 1000);
    return () => clearInterval(timer);
  }, [submitted, startTime]);

  const handleAnswer = (option: string): void => {
    const currentAnswers = answers[currentIndex] || [];
    if (currentQuestion.type === "multiple") {
      const updatedAnswers = currentAnswers.includes(option)
        ? currentAnswers.filter((ans: string) => ans !== option)
        : [...currentAnswers, option];
      setAnswers((prev) => ({ ...prev, [currentIndex]: updatedAnswers }));
    } else {
      setAnswers((prev) => ({ ...prev, [currentIndex]: [option] }));
    }
  };

  const handleEssayChange = (value: string): void => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: [value] }));
  };

  const toggleUncertain = (): void => {
    setUncertain((prev) =>
      prev.includes(currentIndex)
        ? prev.filter((i: number) => i !== currentIndex)
        : [...prev, currentIndex]
    );
  };

  const handleSubmit = (): void => {
    if (uncertain.length > 0) {
      setShowUncertainWarning(true);
      setCurrentIndex(uncertain[0]);
      return;
    }

    const reviewResult: ReviewState = {};
    let score = 0;
    quizData.forEach((q: QuizItem, i: number) => {
      const userAnswer = answers[i] || [];
      let isCorrect = false;

      if (q.type === "multiple") {
        isCorrect =
          JSON.stringify([...userAnswer].sort()) ===
          JSON.stringify([...q.correctAnswer].sort());
      } else if (q.type === "essay") {
        isCorrect =
          userAnswer[0]?.trim().toLowerCase() ===
          String(q.correctAnswer).trim().toLowerCase();
      } else {
        isCorrect = userAnswer[0] === q.correctAnswer[0];
      }

      reviewResult[i] = isCorrect;
      if (isCorrect) score += q.points || 0;
    });

    setReview(reviewResult);
    setTotalScore(score);
    setShowResultPage(true);
    setSubmitted(true);
  };

  const handleRetake = (): void => {
    setAnswers({});
    setReview({});
    setTotalScore(0);
    setSubmitted(false);
    setShowResultPage(false);
    setCurrentIndex(0);
    setUncertain([]);
    setShowUncertainWarning(false);
    setDuration(0);
    setStartTime(Date.now()); // reset timer
  };

  if (showResultPage) {
    return (
      <QuizResultHuawei
        score={totalScore}
        review={review}
        answers={answers}
        quizData={quizData}
        duration={duration}
        onRetake={handleRetake}
      />
    );
  }

  return (
    <div className="flex h-screen">
      <aside className="w-1/5 bg-slate-100 dark:bg-slate-900 border-r overflow-y-auto p-4 space-y-2">
        <h2 className="font-bold text-lg mb-2">Questions</h2>
        <div className="grid grid-cols-4 gap-2">
          {quizData.map((_: QuizItem, idx: number) => (
            <button
              key={idx}
              className={cn(
                "text-sm font-medium px-2 py-1 rounded border",
                currentIndex === idx && "bg-blue-600 text-white",
                uncertain.includes(idx) && "border-yellow-500",
                review[idx] === false &&
                  submitted &&
                  "border-red-500 bg-red-100",
                review[idx] === true &&
                  submitted &&
                  "border-green-500 bg-green-100"
              )}
              onClick={() => setCurrentIndex(idx)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
        {!submitted && (
          <Button onClick={handleSubmit} className="w-full mt-4">
            Submit Quiz
          </Button>
        )}
      </aside>

      <main className="flex-1 p-6 overflow-y-auto pb-24">
        {showUncertainWarning && (
          <div className="mb-4 p-4 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded">
            You have marked some questions as uncertain. Please review them
            before submitting.
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-semibold">
            Question {currentIndex + 1} of {total}
          </div>
          <div className="text-sm text-muted-foreground">
            Duration: {Math.floor(duration / 60)}m {duration % 60}s
          </div>
        </div>

        <p className="mb-4 text-lg font-medium">{currentQuestion.question}</p>

        {currentQuestion.type === "essay" ? (
          <textarea
            rows={4}
            className="w-full border p-2 rounded"
            value={answers[currentIndex]?.[0] ?? ""}
            onChange={(e) => handleEssayChange(e.target.value)}
            disabled={submitted}
          />
        ) : (
          <div className="space-y-3">
            {currentQuestion.options.map((option: string, idx: number) => {
              const selected = !!answers[currentIndex]?.includes(option);
              const correct = currentQuestion.correctAnswer.includes(option);
              const isWrong = submitted && selected && !correct;
              const showCorrect = submitted && correct;

              return (
                <label
                  key={option}
                  className={cn(
                    "flex items-center gap-3 border p-3 rounded cursor-pointer",
                    selected && !submitted && "border-blue-500 bg-blue-100",
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
                  <span className="font-bold">{optionLabels[idx]}.</span>
                  <span>{option}</span>
                </label>
              );
            })}
          </div>
        )}

        {submitted && (
          <div className="mt-6 text-sm">
            <p className="font-medium">
              Correct Answer: {currentQuestion.correctAnswer.join(", ")}
            </p>
            <p>
              Status: {review[currentIndex] ? "✅ Correct" : "❌ Incorrect"}
            </p>
          </div>
        )}
      </main>

      <div className="fixed bottom-0 right-0 p-4 bg-white dark:bg-slate-900 border-t w-full flex justify-end items-center gap-4">
        <Button
          variant="secondary"
          onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
        >
          Previous
        </Button>
        <Button
          onClick={toggleUncertain}
          variant="outline"
          className="border-yellow-500 text-yellow-700"
        >
          {uncertain.includes(currentIndex)
            ? "Remove Uncertain"
            : "Mark Uncertain"}
        </Button>
        <Button
          variant="secondary"
          onClick={() => setCurrentIndex((i) => Math.min(i + 1, total - 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
