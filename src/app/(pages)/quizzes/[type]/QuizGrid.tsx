"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  HelpCircle,
  Loader2,
} from "lucide-react";
import api from "@/lib/api";
import { toTitleCase } from "@/lib/utils";

interface Quiz {
  uuid: string;
  form_title: string;
  form_description: string;
  durations?: number;
  duration?: number;
  published_multiple_choice_count: number | string;
  published_single_choice_count: number | string;
  published_true_false_count: number | string;
  published_essay_count?: number | string;
  trial_limit: number;
}

interface ApiResponse {
  data: Quiz[];
}

export default function QuizGrid({ quizType }: { quizType: string }) {
  const router = useRouter();
  const { data: quizzes, isPending } = useQuery({
    queryKey: ["allQuizzes", quizType],
    queryFn: async () => {
      const endpoint =
        quizType === "kahoot"
          ? "/form-kahoot/published"
          : "/form-huawei/published";
      const res = await api.get<ApiResponse>(endpoint);
      return res.data;
    },
  });

  const quizList = quizzes?.data ?? [];
  const pageTitle =
    quizType === "kahoot" ? "All Kahoot Quizzes" : "All Huawei Quizzes";

  return (
    <>
      <div className="min-h-screen bg-custom-page-bg py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mb-10 flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="absolute left-0"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-blue-dark text-center">
              {pageTitle}
            </h1>
          </div>
          {isPending ? (
            <div className="flex items-center justify-center h-96">
              <Loader2 className="w-16 h-16 animate-spin text-blue-600" />
            </div>
          ) : quizList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {quizList.map((form) => {
                const formTitle = toTitleCase(form.form_title);
                const totalQuestions =
                  Number(form.published_multiple_choice_count) +
                  Number(form.published_single_choice_count) +
                  Number(form.published_true_false_count) +
                  (form.published_essay_count
                    ? Number(form.published_essay_count)
                    : 0);

                const durationText =
                  quizType === "kahoot"
                    ? `${form.duration}s / question`
                    : `${form.durations} min`;

                return (
                  <Card
                    key={form.uuid}
                    className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col transform hover:-translate-y-1 border"
                  >
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-gray-900 leading-snug">
                        {formTitle}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {form.form_description.length > 150
                          ? `${form.form_description.slice(0, 150)}...`
                          : form.form_description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex-col items-start pt-4 border-t border-gray-100 bg-gray-50/50">
                      <div className="w-full flex flex-wrap justify-between items-center text-xs sm:text-sm text-gray-500 font-medium gap-y-2">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{durationText}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <HelpCircle className="w-4 h-4" />
                          <span>{totalQuestions} questions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <HelpCircle className="w-4 h-4" />
                          <span>{form.trial_limit} Limit</span>
                        </div>
                      </div>
                      <Link
                        href={`/quiz?${
                          quizType === "kahoot" ? "type=kahoot&" : ""
                        }uuid=${form.uuid}`}
                        className="w-full mt-4"
                      >
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-200 flex items-center justify-center gap-2">
                          <span>Start Assignment</span>
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-gray-500">
                No {toTitleCase(quizType)} quizzes found.
              </p>
              <Link href="/" className="mt-4 inline-block">
                <Button>Back to Home</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
