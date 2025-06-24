"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
};

type Props = {
  questions: Question[];
};

export default function QuizLayout({ questions }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [uncertains, setUncertains] = useState<boolean[]>(
    Array(questions.length).fill(false)
  );
  const [submitted, setSubmitted] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleOptionSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleToggleUncertain = () => {
    const newUncertains = [...uncertains];
    newUncertains[currentIndex] = !newUncertains[currentIndex];
    setUncertains(newUncertains);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Questions Navigation */}
      <aside className="w-64 p-4 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Question List</h2>
        <div className="grid grid-cols-1 gap-2">
          {questions.map((_, index) => (
            <Button
              key={index}
              variant="outline"
              className={cn(
                "w-full",
                index === currentIndex && "bg-blue-500 text-white",
                uncertains[index] && "border-yellow-400"
              )}
              onClick={() => setCurrentIndex(index)}
            >
              Question {index + 1}
            </Button>
          ))}
        </div>
      </aside>

      {/* Question Content */}
      <main className="flex-1 p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold">
            {currentIndex + 1}. {currentQuestion.question}
          </h3>
          <ul className="space-y-2 mt-4">
            {currentQuestion.options.map((option, i) => {
              const isSelected = answers[currentIndex] === i;
              const isCorrect =
                submitted && i === currentQuestion.correctAnswerIndex;
              const isWrong =
                submitted &&
                isSelected &&
                i !== currentQuestion.correctAnswerIndex;

              return (
                <li
                  key={i}
                  className={cn(
                    "p-3 border rounded cursor-pointer",
                    isSelected && "border-blue-600 bg-blue-100",
                    isCorrect && "border-green-600 bg-green-100",
                    isWrong && "border-red-600 bg-red-100"
                  )}
                  onClick={() => handleOptionSelect(i)}
                >
                  {option}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center mt-6">
          <Button
            onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
            disabled={currentIndex === 0}
          >
            Previous
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleToggleUncertain}>
              {uncertains[currentIndex] ? "Marked Uncertain" : "Mark Uncertain"}
            </Button>

            {currentIndex === questions.length - 1 ? (
              <Button onClick={handleSubmit} disabled={submitted}>
                Submit
              </Button>
            ) : (
              <Button
                onClick={() =>
                  setCurrentIndex((prev) =>
                    Math.min(prev + 1, questions.length - 1)
                  )
                }
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
