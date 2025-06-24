"use client"; // This directive indicates that this is a Client Component

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Define the type for a form
interface Form {
  id: string;
  name: string;
  type: "huawei" | "flash_card";
  link: string; // This link will now include the type parameter
}

// Sample data for forms
const forms: Form[] = [
  {
    id: "1",
    name: "Huawei HCIA Routing & Switching Basics",
    type: "huawei",
    link: "/quizzes?type=huawei&quizId=hcia-r-s", // Updated link with type and quizId
  },
  {
    id: "2",
    name: "Huawei 5G Introduction Quiz",
    type: "huawei",
    link: "/quizzes?type=huawei&quizId=5g-intro", // Updated link
  },
  {
    id: "3",
    name: "Huawei Cloud Computing Fundamentals",
    type: "huawei",
    link: "/quizzes?type=huawei&quizId=cloud-fundamentals", // Updated link
  },
  {
    id: "4",
    name: "Flash Card: Network Protocols",
    type: "flash_card",
    link: "/quizzes?type=flash_card&quizId=network-protocols", // Updated link
  },
  {
    id: "5",
    name: "Flash Card: Cybersecurity Terms",
    type: "flash_card",
    link: "/quizzes?type=flash_card&quizId=cybersecurity-terms", // Updated link
  },
  {
    id: "6",
    name: "Flash Card: Data Structures & Algorithms",
    type: "flash_card",
    link: "/quizzes?type=flash_card&quizId=data-structures", // Updated link
  },
];

export default function FormsPage() {
  const [activeCategory, setActiveCategory] = useState<"huawei" | "flash_card">(
    "huawei"
  );

  // Filter forms based on the active category
  const filteredForms = forms.filter((form) => form.type === activeCategory);

  return (
    <div className="min-h-screen bg-custom-page-bg py-8">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-blue-dark mb-8 text-center">
          Daftar Kuis & Assignment
        </h1>

        {/* Category selection buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10 px-4">
          {/* Added flex-col sm:flex-row and px-4 */}
          <Button
            onClick={() => setActiveCategory("huawei")}
            className={`
              w-full sm:w-auto px-6 py-3 rounded-template-md text-lg font-semibold transition-all duration-300
              ${
                activeCategory === "huawei"
                  ? "bg-primary text-white shadow-custom-form hover:bg-primary-blue-light"
                  : "bg-custom-gray-light text-custom-gray-text border border-custom-gray-border hover:bg-custom-gray-border"
              }
            `}
          >
            Huawei Forms
          </Button>
          <Button
            onClick={() => setActiveCategory("flash_card")}
            className={`
              w-full sm:w-auto px-6 py-3 rounded-template-md text-lg font-semibold transition-all duration-300
              ${
                activeCategory === "flash_card"
                  ? "bg-custom-orange text-white shadow-custom-form hover:bg-custom-pink" // Using custom-orange and custom-pink for flashcard accent
                  : "bg-custom-gray-light text-custom-gray-text border border-custom-gray-border hover:bg-custom-gray-border"
              }
            `}
          >
            Flash Card Forms
          </Button>
        </div>

        {/* Display forms in a responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredForms.length > 0 ? (
            filteredForms.map((form) => (
              <Card
                key={form.id}
                className="
                  bg-card rounded-lg shadow-md hover:shadow-custom-form transition-shadow duration-300
                  flex flex-col justify-between
                "
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-primary-blue-dark">
                    {form.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-custom-gray-text text-sm leading-relaxed">
                    {form.type === "huawei"
                      ? "Huawei Assignment"
                      : "Flash Card Collection"}
                  </p>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button
                    className={`
                        w-full rounded-md py-2 text-white font-medium transition-colors duration-200
                        ${
                          form.type === "huawei"
                            ? "bg-primary hover:bg-primary-blue-light"
                            : "bg-custom-orange hover:bg-custom-pink"
                        }
                      `}
                  >
                    Mulai {form.type === "huawei" ? "Assignment" : "Belajar"}
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-lg text-custom-gray-text">
              Tidak ada form yang tersedia untuk kategori ini.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
