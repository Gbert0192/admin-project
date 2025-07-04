"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { ArrowRight, Clock, HelpCircle, Loader2 } from "lucide-react";
import { toTitleCase } from "@/lib/utils";

interface BaseQuiz {
  uuid: string;
  form_title: string;
  form_description: string;
  published_multiple_choice_count: number | string;
  published_single_choice_count: number | string;
  published_true_false_count: number | string;
  trial_limit: number;
}

interface HuaweiQuiz extends BaseQuiz {
  durations: number;
  published_essay_count: number | string;
}

interface KahootQuiz extends BaseQuiz {
  duration: number;
}

interface FormHuaweiData {
  data: HuaweiQuiz[];
}

interface FormKahootData {
  data: KahootQuiz[];
}

const themeVariants = {
  blue: {
    heading: "text-blue-500 border-blue-500",
    button: "bg-blue-600 hover:bg-blue-700",
  },
  orange: {
    heading: "text-orange-500 border-orange-500",
    button: "bg-orange-500 hover:bg-orange-600",
  },
};

interface QuizCardProps {
  quiz: HuaweiQuiz | KahootQuiz;
  type: "huawei" | "kahoot";
  themeName: keyof typeof themeVariants;
}

function QuizCard({ quiz, type, themeName }: QuizCardProps) {
  const isHuawei = type === "huawei";
  const huaweiQuiz = isHuawei ? (quiz as HuaweiQuiz) : null;
  const kahootQuiz = !isHuawei ? (quiz as KahootQuiz) : null;

  const totalQuestions =
    Number(quiz.published_multiple_choice_count) +
    Number(quiz.published_single_choice_count) +
    Number(quiz.published_true_false_count) +
    (isHuawei && huaweiQuiz ? Number(huaweiQuiz.published_essay_count) : 0);

  const durationText =
    isHuawei && huaweiQuiz
      ? `${huaweiQuiz.durations} min`
      : kahootQuiz
        ? `${kahootQuiz.duration}s / question`
        : "";

  const linkHref = isHuawei
    ? `/quiz?uuid=${quiz.uuid}`
    : `/quiz?type=kahoot&uuid=${quiz.uuid}`;

  const buttonClasses = themeVariants[themeName].button;

  return (
    <Card
      key={quiz.uuid}
      className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col transform hover:-translate-y-1 border"
    >
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900 leading-snug">
          {toTitleCase(quiz.form_title)}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600 text-sm leading-relaxed">
          {quiz.form_description.length > 150
            ? `${quiz.form_description.slice(0, 150)}...`
            : quiz.form_description}
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
            {quiz.trial_limit && <span>{quiz.trial_limit} Limit</span>}
          </div>
        </div>
        <Link href={linkHref} className="w-full mt-4">
          <Button
            className={`w-full text-white font-semibold transition-colors duration-200 flex items-center justify-center gap-2 ${buttonClasses}`}
          >
            Start Assignment <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default function FormsPage() {
  const { data: huaweiForms, isPending: huaweiFormsIsPending } = useQuery<
    HuaweiQuiz[]
  >({
    queryKey: ["huaweiFormsHomepage"],
    queryFn: async () => {
      const res = await api.get<FormHuaweiData>("/form-huawei/published");
      return res.data.data;
    },
  });

  const { data: kahootForms, isPending: kahootFormsIsPending } = useQuery<
    KahootQuiz[]
  >({
    queryKey: ["kahootFormsHomepage"],
    queryFn: async () => {
      const res = await api.get<FormKahootData>("/form-kahoot/published");
      return res.data.data;
    },
  });

  const renderQuizSection = (
    title: string,
    forms: (HuaweiQuiz | KahootQuiz)[] | undefined,
    isPending: boolean,
    type: "huawei" | "kahoot",
    seeAllLink: string,
    themeName: keyof typeof themeVariants
  ) => {
    const theme = themeVariants[themeName];

    return (
      <div className="mb-12">
        <h2
          className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-6 border-l-4 pl-4 ${theme.heading}`}
        >
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {isPending ? (
            <div className="col-span-full flex items-center justify-center h-64">
              <Loader2 className="w-16 h-16 animate-spin text-blue-600" />
            </div>
          ) : forms && forms.length > 0 ? (
            forms
              .slice(0, 3)
              .map((form) => (
                <QuizCard
                  key={form.uuid}
                  quiz={form}
                  type={type}
                  themeName={themeName}
                />
              ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-lg text-gray-500">
                No {title} available at the moment.
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-end mt-6">
          <Link href={seeAllLink}>
            <Button
              className={`text-white font-semibold py-2 px-6 rounded-md transition-colors duration-200 shadow-md ${theme.button}`}
            >
              See All {title}
            </Button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen  py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-blue-dark mb-10 text-center ">
          Quizzes For Huawei Or Kahoot List
        </h1>

        {renderQuizSection(
          "Huawei Quizzes",
          huaweiForms,
          huaweiFormsIsPending,
          "huawei",
          "/quizzes/huawei",
          "blue"
        )}

        {renderQuizSection(
          "Kahoot Quick Quiz",
          kahootForms,
          kahootFormsIsPending,
          "kahoot",
          "/quizzes/kahoot",
          "orange"
        )}
      </div>
    </div>
  );
}
