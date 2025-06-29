"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Target } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export const StatusCards = () => {
  const { data: quizCompleted, isLoading: isLoadingCompleted } = useQuery({
    queryKey: ["quizCompleted"],
    queryFn: async () => {
      const res = await api.get("/dashboard-user/quiz-complete");
      return res.data.data;
    },
  });

  const { data: quizCount, isLoading: isLoadingCount } = useQuery({
    queryKey: ["quizCount"],
    queryFn: async () => {
      const res = await api.get("/dashboard-user/quiz-count");
      return res.data.data;
    },
  });

  const { data: avgScore, isLoading: isLoadingScore } = useQuery({
    queryKey: ["avgScore"],
    queryFn: async () => {
      const res = await api.get("/dashboard-user/average-score");
      return res.data.data;
    },
  });

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white transform hover:scale-105 transition-all duration-300">
        <CheckCircle2 className="absolute -right-4 -bottom-4 h-28 w-28 text-white/10" />
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-medium">
            Quizzes Completed
          </CardTitle>
          <CheckCircle2 className="h-5 w-5 text-white" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {isLoadingCompleted ? "..." : (quizCompleted ?? 0)}
          </div>
          <p className="text-xs text-white/80">
            out of {isLoadingCount ? "..." : (quizCount?.total_count ?? 0)}{" "}
            available quizzes
          </p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white transform hover:scale-105 transition-all duration-300">
        <Target className="absolute -right-4 -bottom-4 h-28 w-28 text-white/10" />
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-medium">Average Score</CardTitle>
          <Target className="h-5 w-5 text-white" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {isLoadingScore
              ? "..."
              : `${Math.round(avgScore?.average ?? avgScore ?? 0)}%`}
          </div>
          <p className="text-xs text-white/80">from all graded quizzes</p>
        </CardContent>
      </Card>
    </div>
  );
};
