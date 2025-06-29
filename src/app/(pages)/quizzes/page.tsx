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
import { FormHuaweiData } from "@/app/admin/(dashboard)/forms/huawei/page";
import api from "@/lib/api";
import { ArrowRight, Clock, HelpCircle, Loader2 } from "lucide-react";
import { FormKahootData } from "@/app/admin/(dashboard)/forms/kahoot/page";

export default function FormsPage() {
  const { data: huaweiForms, isPending: HuaweiFormsIsPending } = useQuery({
    queryKey: ["huaweiForms"],
    queryFn: async () => {
      const res = await api.get<FormHuaweiData>("/form-huawei/published");
      return res.data.data;
    },
  });

  const { data: kahootForms, isPending: kahootFormsIsPending } = useQuery({
    queryKey: ["kahootForms"],
    queryFn: async () => {
      const res = await api.get<FormKahootData>("/form-kahoot/published");
      return res.data.data;
    },
  });
  return (
    <div className="min-h-screen bg-custom-page-bg py-4 md:py-8">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-blue-dark mb-10 text-center">
          Quizzes For Huawei Or Kahoot List
        </h1>

        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-blue-dark mb-6 border-l-4 border-primary pl-4">
            Huawei Quizzes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {HuaweiFormsIsPending ? (
              <div className="col-span-full flex items-center justify-center h-64">
                <Loader2 className="w-16 h-16 animate-spin text-blue-600" />
              </div>
            ) : huaweiForms && huaweiForms.length > 0 ? (
              huaweiForms.map((form) => {
                const totalQuestions =
                  Number(form.published_multiple_choice_count) +
                  Number(form.published_single_choice_count) +
                  Number(form.published_true_false_count) +
                  Number(form.published_essay_count);

                return (
                  <Card
                    key={form.uuid}
                    className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col transform hover:-translate-y-1 border"
                  >
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-gray-900 leading-snug">
                        {form.form_title}
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
                      <div className="w-full flex justify-between items-center text-sm text-gray-500 font-medium">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{form.durations} min</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <HelpCircle className="w-4 h-4" />
                          <span>{totalQuestions} questions</span>
                        </div>
                      </div>
                      <Link
                        href={`/quiz?uuid=${form.uuid}`}
                        className="w-full mt-4"
                      >
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-200 flex items-center gap-2">
                          Start Assignment
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-lg text-gray-500">
                  No Huawei quizzes available at the moment.
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-end mt-6">
            <Link href="/quizzes?type=huawei" passHref legacyBehavior>
              <Button className="bg-primary hover:bg-primary-blue-light text-white font-semibold py-2 px-6 rounded-md transition-colors duration-200 shadow-md">
                See All Huawei Quizzes
              </Button>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-custom-orange mb-6 border-l-4 border-custom-orange pl-4">
            Kahoot Quick Quiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {kahootFormsIsPending ? (
              <div className="col-span-full flex items-center justify-center h-64">
                <Loader2 className="w-16 h-16 animate-spin text-blue-600" />
              </div>
            ) : kahootForms && kahootForms.length > 0 ? (
              kahootForms.map((form) => {
                const totalQuestions =
                  Number(form.published_multiple_choice_count) +
                  Number(form.published_single_choice_count) +
                  Number(form.published_true_false_count);

                return (
                  <Card
                    key={form.uuid}
                    className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col transform hover:-translate-y-1 border"
                  >
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-gray-900 leading-snug">
                        {form.form_title}
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
                      <div className="w-full flex justify-between items-center text-sm text-gray-500 font-medium">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{form.duration}s / question</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <HelpCircle className="w-4 h-4" />
                          <span>{totalQuestions} questions</span>
                        </div>
                      </div>
                      <Link
                        href={`/quiz?type=kahoot&uuid=${form.uuid}`}
                        className="w-full mt-4"
                      >
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-200 flex items-center gap-2">
                          Start Assignment
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-lg text-gray-500">
                  No Kahoot quizzes available at the moment.
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-end mt-6">
            <Link href="/quizzes?type=kahoot" passHref legacyBehavior>
              <Button className="bg-custom-orange hover:bg-custom-pink text-white font-semibold py-2 px-6 rounded-md transition-colors duration-200 shadow-md">
                See All Kahoot Cards
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
