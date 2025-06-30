"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  CheckCircle,
  XCircle,
  ListTodo,
  Timer,
  ArrowLeft,
  Trophy,
  Target,
} from "lucide-react";

type AnswerState = Record<number, string[]>;
type ReviewState = Record<number, boolean>;

interface QuizItem {
  question_text: string;
  options: string[];
  correctAnswer: string[];
  question_type: "single_choice" | "multiple_choice" | "true_false";
}

interface QuizResultProps {
  score: number;
  review: ReviewState;
  answers: AnswerState;
  quizData: QuizItem[];
  onRetake: () => void;
}

export function QuizResultKahoot({
  score,
  review,
  answers,
  quizData,
  onRetake,
}: QuizResultProps) {
  const router = useRouter();
  const correctCount = Object.values(review).filter(Boolean).length;
  const incorrectCount = Object.values(review).filter(
    (val) => val === false
  ).length;
  const unansweredCount = quizData.length - Object.keys(review).length;
  const percentage = Math.round((correctCount / quizData.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Main Result Card */}
        <Card className="shadow-2xl mb-6 border-0 bg-white/95 backdrop-blur">
          <CardHeader className="text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
            <div className="flex justify-center mb-4">
              <Trophy className="w-16 h-16 text-yellow-300" />
            </div>
            <CardTitle className="text-4xl font-bold mb-2">
              Quiz Completed!
            </CardTitle>
            <CardDescription className="text-white/90 text-lg">
              Here&apos;s how you performed
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8">
            {/* Score Display */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">{percentage}%</div>
                  <div className="text-sm">Score</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {score} Points
              </h3>
              <p className="text-gray-600">
                {percentage >= 80
                  ? "Excellent work!"
                  : percentage >= 60
                    ? "Good job!"
                    : percentage >= 40
                      ? "Keep practicing!"
                      : "Don&apos;t give up, try again!"}
              </p>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-green-600 font-medium">Correct</p>
                <p className="text-2xl font-bold text-green-700">
                  {correctCount}
                </p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-sm text-red-600 font-medium">Incorrect</p>
                <p className="text-2xl font-bold text-red-700">
                  {incorrectCount}
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Target className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600 font-medium">Unanswered</p>
                <p className="text-2xl font-bold text-gray-700">
                  {unansweredCount}
                </p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Timer className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-blue-600 font-medium">Questions</p>
                <p className="text-lg font-bold text-blue-700">
                  {quizData.length}
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center gap-4 p-6 bg-gray-50 rounded-b-lg">
            <Button
              variant="outline"
              onClick={() => router.push("/quizzes/kahoot")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Quizzes
            </Button>
            <Button
              onClick={onRetake}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              Retake Quiz
            </Button>
          </CardFooter>
        </Card>

        {/* Question Review */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
          <CardHeader className="bg-gray-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
              <ListTodo className="w-6 h-6 text-blue-500" />
              Question Review
            </CardTitle>
            <CardDescription>
              Review your answers and see the correct solutions
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-6 max-h-96 overflow-y-auto">
            {quizData.map((question, index) => {
              const userAnswer = answers[index] || [];
              const correctAnswer = question.correctAnswer;
              const isCorrect = review[index];
              const wasAnswered = userAnswer.length > 0;

              return (
                <div
                  key={index}
                  className="p-6 border rounded-lg shadow-sm bg-white"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 mt-1">
                      {!wasAnswered ? (
                        <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center">
                          <span className="text-xs text-white font-bold">
                            ?
                          </span>
                        </div>
                      ) : isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800 mb-3">
                        {index + 1}. {question.question_text}
                      </h3>

                      <div className="space-y-3">
                        {!wasAnswered ? (
                          <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <p className="text-sm text-yellow-600 font-medium mb-1">
                              Status:
                            </p>
                            <p className="text-yellow-800 font-semibold">
                              Unanswered
                            </p>
                          </div>
                        ) : (
                          <div
                            className={`p-3 rounded-lg border ${
                              isCorrect
                                ? "bg-green-50 border-green-200"
                                : "bg-red-50 border-red-200"
                            }`}
                          >
                            <p
                              className={`text-sm font-medium mb-1 ${
                                isCorrect ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              Your Answer:
                            </p>
                            <p
                              className={
                                isCorrect ? "text-green-800" : "text-red-800"
                              }
                            >
                              {userAnswer.join(", ")}
                            </p>
                          </div>
                        )}

                        {(!wasAnswered || !isCorrect) && (
                          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-sm text-blue-600 font-medium mb-1">
                              Correct Answer:
                            </p>
                            <p className="text-blue-800 font-semibold">
                              {correctAnswer.join(", ")}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
