"use client";

import { quizData, TIME_LIMIT_MINUTES, UserAnswers } from "@/app/lib/quiz-data";
import { QuizGame } from "@/components/quiz/flashcard/quiz-game";
import { QuizInfo } from "@/components/quiz/flashcard/quiz-info";
import { QuizResult } from "@/components/quiz/flashcard/quiz-result";
import {
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import React, { useState } from "react";

export default function QuizzesPage() {
  const [quizState, setQuizState] = useState<"info" | "playing" | "results">(
    "info"
  );
  const [finalScore, setFinalScore] = useState(0);
  const [finalUserAnswers, setFinalUserAnswers] = useState<UserAnswers>({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescription, setAlertDescription] = useState("");

  const handleStartQuiz = () => {
    setQuizState("playing");
  };

  const handleQuizComplete = (score: number, userAnswers: UserAnswers) => {
    setFinalScore(score);
    setFinalUserAnswers(userAnswers);
    setQuizState("results");
    setAlertTitle("Quiz Selesai!");
    setAlertDescription("Anda telah menyelesaikan kuis.");
    setShowAlert(true);
  };

  const handleTimeUp = () => {
    setFinalScore(0);
    setFinalUserAnswers({});
    setQuizState("results");
    setAlertTitle("Waktu Habis!");
    setAlertDescription(
      "Waktu Anda telah habis. Kuis telah selesai secara otomatis."
    );
    setShowAlert(true);
  };

  const handleUnansweredQuestionsAttempt = (unansweredCount: number) => {
    setAlertTitle("Soal Belum Terjawab!");
    setAlertDescription(
      `Anda memiliki ${unansweredCount} soal yang belum dijawab. Harap jawab semua soal sebelum menyelesaikan kuis.`
    );
    setShowAlert(true);
  };

  const handleRetakeQuiz = () => {
    setQuizState("info");
    setFinalScore(0);
    setFinalUserAnswers({});
  };

  return (
    <main className="flex items-center justify-center w-full h-full font-inter">
      {quizState === "info" && <QuizInfo onStartQuiz={handleStartQuiz} />}

      {quizState === "playing" && (
        <QuizGame
          quizData={quizData}
          onQuizComplete={handleQuizComplete}
          onTimeUp={handleTimeUp}
          timeLimitSeconds={TIME_LIMIT_MINUTES * 60}
          onUnansweredQuestionsAttempt={handleUnansweredQuestionsAttempt}
        />
      )}

      {quizState === "results" && (
        <QuizResult
          score={finalScore}
          totalQuestions={quizData.length}
          quizData={quizData}
          userAnswers={finalUserAnswers}
          onRetakeQuiz={handleRetakeQuiz}
        />
      )}

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[var(--primary)]">
              {alertTitle}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="text-muted-foreground">
            {alertDescription}
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setShowAlert(false)}
              className="bg-[var(--primary)] text-primary-foreground hover:bg-[var(--primary-blue-light)]"
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
