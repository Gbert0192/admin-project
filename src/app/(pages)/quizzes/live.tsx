"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const questions = [
  {
    id: 1,
    question: "When did Indonesia declare independence?",
    choices: ["1942", "1945", "1950", "1965"],
    correct: 1,
  },
  {
    id: 2,
    question: "Who read the Proclamation of Independence?",
    choices: ["Soekarno", "Hatta", "Soeharto", "Tan Malaka"],
    correct: 0,
  },
];

export default function LiveQuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10); // 10 detik per soal
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (timeLeft === 0 && !answered) {
      handleNext(); // otomatis lanjut jika waktu habis
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, answered]);

  const handleAnswer = (index: number) => {
    if (answered) return;

    const isCorrect = index === currentQuestion.correct;
    const scoreBonus = isCorrect ? timeLeft * 10 : 0; // semakin cepat, semakin besar
    setScore((prev) => prev + scoreBonus);
    setAnswered(true);
    setTimeout(() => handleNext(), 800); // jeda sebelum pindah soal
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setTimeLeft(10);
      setAnswered(false);
    } else {
      alert(`Quiz selesai! Skor akhir: ${score}`);
      // TODO: simpan skor ke database di sini
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-blue-600 p-4">
      <Card className="w-full max-w-xl text-white bg-white/10 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">
            Soal {currentIndex + 1}/{questions.length}
          </CardTitle>
          <p className="text-sm mt-1">Sisa waktu: {timeLeft}s</p>
          <p className="text-sm">Skor: {score}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg sm:text-xl font-semibold">
            {currentQuestion.question}
          </p>
          <div className="grid gap-3">
            {currentQuestion.choices.map((choice, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                variant="secondary"
                className="w-full text-left"
                disabled={answered}
              >
                {choice}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
