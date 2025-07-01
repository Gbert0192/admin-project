"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import { FormHuawei } from "./page";

interface Props {
  data: FormHuawei;
  totalQuestions: number;
  uuid: string;
  trial_limit: number;
}

const HuaweiQuizCard = ({ data, totalQuestions, uuid }: Props) => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(false);

  const { refetch: checkIsAllowed } = useQuery({
    queryKey: ["isAllowed", uuid],
    queryFn: async () => {
      const res = await api.get<{ data: boolean }>(
        `/quiz-huawei/${uuid}/allowed`
      );
      return res.data.data;
    },
    enabled: false,
  });

  const handleClick = async () => {
    setIsChecking(true);
    try {
      const { data: isAllowed, isSuccess } = await checkIsAllowed();

      if (isSuccess && isAllowed) {
        router.push(`/quiz/huawei/${uuid}`);
      } else {
        toast.error("You have already taken this quiz or are not allowed.");
        router.replace(`/quizzes`);
      }
    } catch {
      toast.error("Failed to check quiz eligibility. Please try again.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-2xl shadow-lg rounded-xl">
        <CardHeader>
          <div className="flex justify-between items-center w-full">
            <CardTitle className="text-2xl font-bold">
              {data.form_title} Quiz
            </CardTitle>
            <Badge variant="default" className="whitespace-nowrap">
              Form Quiz
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground border-t pt-6">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 flex-shrink-0 text-primary" />
              <span className="font-medium">{totalQuestions} Questions</span>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 flex-shrink-0 text-primary" />
              <span className="font-medium">{data.durations} Minutes</span>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 flex-shrink-0 text-primary" />
              <span className="font-medium">{data.trial_limit} Limits</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3">Instructions</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-2">
              <li>This quiz consists of {totalQuestions} questions.</li>
              <li>Ensure a stable internet connection.</li>
              <li>Complete the quiz in one session once started.</li>
              <li>Do not refresh or close the page.</li>
              <li>Your final score will be shown after submission.</li>
              <li>Essay questions will be reviewed manually.</li>
              <li>Do not seek outside help.</li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center bg-slate-50 p-6 rounded-b-xl border-t">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleClick}
            size="lg"
            disabled={isChecking}
            className="shadow-md text-white"
          >
            {isChecking ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <ArrowRight className="w-4 h-4 mr-2" />
            )}
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default HuaweiQuizCard;
