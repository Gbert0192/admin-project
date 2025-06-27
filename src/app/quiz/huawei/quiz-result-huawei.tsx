"use client";

import React from "react";
import { QuizItem } from "@/app/lib/quiz-data-huawei";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CheckCircle, XCircle, ListTodo, Timer } from "lucide-react";

type AnswerState = Record<number, string[]>;

type ReviewState = Record<number, boolean>;

interface QuizResultProps {
  score: number;
  review: ReviewState;
  answers: AnswerState;
  quizData: QuizItem[];
  duration: number;
  onRetake: () => void;
}

export function QuizResultHuawei({
  score,
  review,
  answers,
  quizData,
  duration,
  onRetake,
}: QuizResultProps) {
  const correctCount = Object.values(review).filter(Boolean).length;
  const incorrectCount = quizData.length - correctCount;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <Card className="shadow-xl mb-6">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-blue-600">
            Quiz Result
          </CardTitle>
          <CardDescription>Summary of your performance</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center py-4">
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
              <Timer className="w-4 h-4" /> Duration
            </p>
            <p className="text-md font-bold">
              {Math.floor(duration / 60)}m {duration % 60}s
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button onClick={onRetake}>Retake Quiz</Button>
        </CardFooter>
      </Card>

      {/* DETAILED REVIEW */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ListTodo className="w-5 h-5 text-blue-500" />
            Review Answers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {quizData.map((question, index) => {
            const userAnswer = answers[index] || [];
            const correctAnswer = question.correctAnswer;
            const isCorrect = review[index];

            return (
              <div
                key={index}
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
