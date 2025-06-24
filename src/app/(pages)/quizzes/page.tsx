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

interface Form {
  id: string;
  name: string;
  type: "huawei" | "flash_card";
  link: string;
}

const forms: Form[] = [
  {
    id: "1",
    name: "Huawei HCIA Routing & Switching Basics",
    type: "huawei",
    link: "/quizzes?type=huawei&quizId=hcia-r-s",
  },
  {
    id: "2",
    name: "Huawei 5G Introduction Quiz",
    type: "huawei",
    link: "/quizzes?type=huawei&quizId=5g-intro",
  },
  {
    id: "3",
    name: "Huawei Cloud Computing Fundamentals",
    type: "huawei",
    link: "/quizzes?type=huawei&quizId=cloud-fundamentals",
  },
  {
    id: "4",
    name: "Flash Card: Network Protocols",
    type: "flash_card",
    link: "/quizzes?type=flash_card&quizId=network-protocols",
  },
  {
    id: "5",
    name: "Flash Card: Cybersecurity Terms",
    type: "flash_card",
    link: "/quizzes?type=flash_card&quizId=cybersecurity-terms",
  },
  {
    id: "6",
    name: "Flash Card: Data Structures & Algorithms",
    type: "flash_card",
    link: "/quizzes?type=flash_card&quizId=data-structures",
  },
];

export default function FormsPage() {
  const huaweiForms = forms.filter((form) => form.type === "huawei");
  const flashCardForms = forms.filter((form) => form.type === "flash_card");

  return (
    <div className="min-h-screen bg-custom-page-bg py-4 md:py-8">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-blue-dark mb-10 text-center">
          Quizzes & Assignments List
        </h1>

        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-blue-dark mb-6 border-l-4 border-primary pl-4">
            Huawei Quizzes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {huaweiForms.length > 0 ? (
              huaweiForms.map((form) => (
                <Card
                  key={form.id}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between transform hover:scale-105"
                >
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-primary-blue-dark">
                      {form.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Huawei Assignment
                    </p>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Link href={form.link} passHref legacyBehavior>
                      <Button className="w-full rounded-md py-2 text-white font-semibold transition-colors duration-200 bg-primary hover:bg-primary-blue-light">
                        Start Assignment
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <p className="col-span-full text-center text-lg text-gray-500">
                No Huawei quizzes available.
              </p>
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
            Flash Card Forms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashCardForms.length > 0 ? (
              flashCardForms.map((form) => (
                <Card
                  key={form.id}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between transform hover:scale-105"
                >
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-primary-blue-dark">
                      {form.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Flash Card Collection
                    </p>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Link href={form.link} passHref legacyBehavior>
                      <Button className="w-full rounded-md py-2 text-white font-semibold transition-colors duration-200 bg-custom-orange hover:bg-custom-pink">
                        Start Assignment
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <p className="col-span-full text-center text-lg text-gray-500">
                No flash card collections available.
              </p>
            )}
          </div>
          <div className="flex justify-end mt-6">
            <Link href="/quizzes?type=flash_card" passHref legacyBehavior>
              <Button className="bg-custom-orange hover:bg-custom-pink text-white font-semibold py-2 px-6 rounded-md transition-colors duration-200 shadow-md">
                See All Flash Cards
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
