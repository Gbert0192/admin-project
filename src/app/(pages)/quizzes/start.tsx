"use client";

import { useEffect, useState } from "react";

const quizData = [
  {
    question: "When did Indonesia proclaim its independence?",
    options: ["1945", "1949", "1950", "1965"],
    correctAnswer: 0, // index dari options
  },
  // ...tambahkan soal lain nanti
];

export default function QuizStartPage() {
  const [timeLeft, setTimeLeft] = useState(900); // 15 menit
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) clearInterval(timer);
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (index: number) => {
    setSelectedOption(index);
    const isCorrect = index === quizData[currentQuestion].correctAnswer;
    const newScore = isCorrect ? score + 100 : score;

    setScore(newScore);

    setTimeout(() => {
      setSelectedOption(null);
      if (currentQuestion + 1 < quizData.length) {
        setCurrentQuestion((q) => q + 1);
      } else {
        alert(`Quiz finished! Your score: ${newScore}`);
        // Optionally redirect to result page
      }
    }, 1000);
  };
  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const q = quizData[currentQuestion];

  return (
    <main className="min-h-screen p-6 bg-white flex flex-col items-center">
      <div className="text-xl font-semibold mb-4">
        Time Left: {formatTime(timeLeft)}
      </div>

      <div className="w-full max-w-xl border p-6 rounded-lg shadow space-y-4">
        <h2 className="text-2xl font-bold">{q.question}</h2>
        <div className="space-y-2">
          {q.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className={`block w-full text-left px-4 py-2 border rounded transition ${
                selectedOption === idx
                  ? idx === q.correctAnswer
                    ? "bg-green-100 border-green-500"
                    : "bg-red-100 border-red-500"
                  : "hover:bg-gray-50"
              }`}
              disabled={selectedOption !== null}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
