"use client";
import React from "react";
import { StatusCards } from "@/components/dashboard-components/status-cards";
import { QuizHistory } from "@/components/dashboard-components/quiz-history";
import { NewQuizzes } from "@/components/dashboard-components/new-quizzes";

export default function QuizDashboardPage() {
  return (
    <div className="grid flex-1 items-start gap-4 p-4 md:p-8 lg:grid-cols-[1fr_400px]">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8">
        <StatusCards />
        <QuizHistory />
      </div>

      <div className="grid auto-rows-max items-start gap-4 md:gap-8">
        <NewQuizzes />
      </div>
    </div>
  );
}
