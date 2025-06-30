"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

interface NewQuizData {
  uuid: string;
  form_title: string;
  description: string;
  created_at: string;
  source: "huawei" | "kahoot";
}

const NewQuizItem = ({
  title,
  category,
  onStart,
}: {
  title: string;
  category: string;
  onStart: () => void;
}) => (
  <div className="flex items-center justify-between hover:bg-muted/50 p-3 rounded-md transition-colors">
    <div className="min-w-0">
      <p className="font-semibold truncate">{title}</p>
      <p className="text-sm text-muted-foreground capitalize">
        {category} Quiz
      </p>
    </div>
    <Button
      variant="outline"
      size="sm"
      className="flex-shrink-0 ml-4"
      onClick={onStart}
    >
      Start
    </Button>
  </div>
);

export const NewQuizzes = () => {
  const router = useRouter();

  const { data: newestQuizzes, isLoading: isLoadingNewestQuizzes } = useQuery<
    NewQuizData[]
  >({
    queryKey: ["newestQuiz"],

    queryFn: async () => {
      const res: any = await api.get("/dashboard-user/newest-quiz");

      return res.data.data;
    },

    refetchOnWindowFocus: false,
  });

  console.log({ newestQuizzes });
  const handleStartQuiz = (quiz: NewQuizData) => {
    let route = "";
    if (quiz.source === "kahoot") {
      route = `/quiz?type=kahoot&uuid=${quiz.uuid}`;
    } else {
      route = `/quiz?uuid=${quiz.uuid}`;
    }
    router.push(route);
  };

  const renderContent = () => {
    if (isLoadingNewestQuizzes) {
      return (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      );
    }

    if (!newestQuizzes || newestQuizzes.length === 0) {
      return (
        <p className="text-center text-muted-foreground p-8">
          No new quizzes available at the moment.
        </p>
      );
    }

    return (
      <div className="grid gap-2">
        {newestQuizzes.map((quiz) => (
          <NewQuizItem
            key={`${quiz.source}-${quiz.uuid}`}
            title={quiz.form_title}
            category={quiz.source}
            onStart={() => handleStartQuiz(quiz)}
          />
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Quizzes & Forms</CardTitle>
        <CardDescription>
          Take on the latest quizzes available for you.
        </CardDescription>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
};
