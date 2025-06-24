"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, ListTodo, Clock } from "lucide-react";
import type { QuizItem } from "@/app/lib/quiz-data-huawei";

interface QuizResultHuaweiProps {
  score: number;
  totalQuestions: number;
  quizData: QuizItem[];
  userAnswers: Record<string, string[]>; // ✅ fix
  duration: string;
  onRetakeQuiz: () => void;
}

export function QuizResultHuawei({
  score,
  totalQuestions,
  quizData,
  userAnswers,
  duration,
  onRetakeQuiz,
}: QuizResultHuaweiProps) {
  const correctCount = quizData.filter((q) => {
    const userAnswer = userAnswers[q.id.toString()] || []; // ✅ force string key

    if (q.type === "multiple") {
      return (
        JSON.stringify([...userAnswer].sort()) ===
        JSON.stringify([...q.correctAnswer].sort())
      );
    } else if (q.type === "essay") {
      return (
        userAnswer[0]?.trim().toLowerCase() ===
        String(q.correctAnswer).trim().toLowerCase()
      );
    } else {
      return userAnswer[0] === q.correctAnswer[0];
    }
  }).length;

  const incorrectCount = totalQuestions - correctCount;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Card className="shadow-xl mb-6">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary-blue-dark">
            Quiz Result
          </CardTitle>
          <CardDescription className="text-md mt-1">
            Summary of your performance
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row justify-around text-center gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Score</p>
            <p className="text-2xl font-bold text-green-600">{score}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Correct</p>
            <p className="text-2xl font-bold text-green-500">{correctCount}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Incorrect</p>
            <p className="text-2xl font-bold text-red-500">{incorrectCount}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <Clock className="w-4 h-4" /> Duration
            </p>
            <p className="text-lg font-medium">{duration}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={onRetakeQuiz}>Retake Quiz</Button>
        </CardFooter>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ListTodo className="w-5 h-5 text-primary-blue-dark" />
            Review Answers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {quizData.map((question, index) => {
            const userAnswer = userAnswers[question.id.toString()] || [];
            const correctAnswer = question.correctAnswer;
            const isCorrect =
              question.type === "multiple"
                ? JSON.stringify([...userAnswer].sort()) ===
                  JSON.stringify([...correctAnswer].sort())
                : question.type === "essay"
                  ? userAnswer[0]?.trim().toLowerCase() ===
                    String(correctAnswer).trim().toLowerCase()
                  : userAnswer[0] === correctAnswer[0];

            return (
              <div
                key={question.id}
                className="p-4 border rounded-lg shadow-sm bg-white dark:bg-slate-800"
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
                    Your Answer:{" "}
                    {userAnswer.length > 0
                      ? userAnswer.join(", ")
                      : "No answer"}
                  </p>
                  {!isCorrect && (
                    <p className="text-blue-600 font-semibold">
                      Correct Answer: {correctAnswer.join(", ")}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
