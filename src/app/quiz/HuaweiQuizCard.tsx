"use client";

import React from "react";
import { ArrowRight, BookOpen, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormHuawei } from "./page";
import { useRouter } from "next/navigation";

interface Props {
  data: FormHuawei;
  totalQuestions: number;
  uuid: string;
}

const HuaweiQuizCard = ({ data, totalQuestions, uuid }: Props) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-2xl shadow-lg rounded-xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <CardTitle className="text-2xl font-bold mb-1">
                {data.form_title} Quiz
              </CardTitle>
            </div>
            <Badge
              variant="outline"
              className="mt-1 sm:mt-0 text-md py-1 px-3 whitespace-nowrap bg-blue-500"
            >
              Form Quiz
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground border-t pt-6">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 flex-shrink-0 text-[var(--primary)]" />
              <span className="font-medium">{totalQuestions} Questions</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[var(--secondary)]" />
              Instructions
            </h3>
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

        <CardFooter className="flex justify-end bg-muted/50 p-6 rounded-b-xl">
          <Button
            onClick={() => {
              router.push(`/quiz/huawei/${uuid}`);
            }}
            size="lg"
            className="w-full sm:w-auto shadow-md bg-[var(--primary)] hover:bg-[var(--primary-blue-light)] text-white"
          >
            Start Quiz
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default HuaweiQuizCard;
