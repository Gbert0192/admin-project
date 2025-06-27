"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { Question } from "./page";

interface UseQuizProps {
  questions: Question[];
  durations: number;
  form_uuid: string | null;
}

interface AttemptAnswer {
  question_uuid: string;
  user_answer: string[];
  is_correct: boolean;
}

interface SubmissionPayload {
  form_uuid: string;
  score: number;
  duration: number;
  attempt_answers: AttemptAnswer[];
}

export function useQuiz({ questions, durations, form_uuid }: UseQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [uncertain, setUncertain] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [review, setReview] = useState<Record<number, boolean>>({});
  const [totalScore, setTotalScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  const currentQuestion = questions?.[currentIndex];
  const answeredCount = Object.keys(answers).filter((k) =>
    answers[+k]?.some((ans) => ans.trim() !== "")
  ).length;

  useEffect(() => {
    if (durations && remainingTime === null) {
      setRemainingTime(durations * 60);
    }
  }, [durations, remainingTime]);

  const { mutate: createFormHuawei, isPending: isSubmitting } = useMutation({
    mutationFn: (payload: SubmissionPayload) => {
      const filterdPayload = {
        ...payload,
        duration_seconds: Number(durations),
      };
      return api.post("/quiz-huawei", filterdPayload);
    },
    onSuccess: () => {
      toast.success("Quiz submitted successfully!");
      setSubmitted(true);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit quiz. Please try again.");
    },
  });

  const handleSubmit = (isAutoSubmit = false) => {
    if (!questions || !form_uuid) return;
    if (!isAutoSubmit && answeredCount < questions.length) {
      toast.error("Please answer all questions before submitting.");
      return;
    }
    if (!isAutoSubmit && uncertain.length > 0) {
      return "show_uncertain_alert";
    }

    let score = 0;
    const reviewResult: Record<number, boolean> = {};
    const formattedAnswers: AttemptAnswer[] = questions.map((q, index) => {
      const userAnswer = answers[index] || [];
      const correctOptions = q.options
        .filter((opt) => opt.is_correct)
        .map((opt) => opt.option_text?.trim() ?? "");
      let isCorrect = false;
      if (q.type === "MULTIPLE_CHOICE") {
        isCorrect =
          userAnswer.length === correctOptions.length &&
          [...userAnswer].sort().join(",") ===
            [...correctOptions].sort().join(",");
      } else {
        isCorrect =
          (userAnswer[0] || "").trim().toLowerCase() ===
          (correctOptions[0] || "").trim().toLowerCase();
      }
      if (isCorrect) score += q.point || 0;
      reviewResult[index] = isCorrect;
      return {
        question_uuid: q.uuid,
        user_answer: userAnswer,
        is_correct: isCorrect,
      };
    });

    setReview(reviewResult);
    setTotalScore(score);
    const durationTaken = durations * 60 - (remainingTime ?? 0);
    const finalPayload: SubmissionPayload = {
      form_uuid,
      score,
      duration: durationTaken,
      attempt_answers: formattedAnswers,
    };

    createFormHuawei(finalPayload);
  };

  useEffect(() => {
    if (remainingTime === null || remainingTime <= 0 || submitted) return;
    const timer = setInterval(() => {
      setRemainingTime((prev) => (prev ? prev - 1 : 0));
    }, 1000);
    if (remainingTime === 1) {
      setTimeout(() => {
        toast.info("Time's up! Your quiz will be submitted automatically.");
        handleSubmit(true);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [remainingTime, submitted]);

  const handleAnswer = (option: string) => {
    if (!currentQuestion) return;
    if (currentQuestion.type === "MULTIPLE_CHOICE") {
      const currentAnswers = answers[currentIndex] || [];
      const newAnswers = currentAnswers.includes(option)
        ? currentAnswers.filter((ans) => ans !== option)
        : [...currentAnswers, option];
      setAnswers((prev) => ({ ...prev, [currentIndex]: newAnswers }));
    } else {
      setAnswers((prev) => ({ ...prev, [currentIndex]: [option] }));
    }
  };

  const handleClearAnswer = () => {
    setAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[currentIndex];
      return newAnswers;
    });
  };

  const handleNext = () =>
    setCurrentIndex((p) => Math.min(p + 1, questions.length - 1));
  const handlePrev = () => setCurrentIndex((p) => Math.max(p - 1, 0));
  const handleSelectQuestion = (index: number) => setCurrentIndex(index);
  const toggleUncertain = () =>
    setUncertain((p) =>
      p.includes(currentIndex)
        ? p.filter((i) => i !== currentIndex)
        : [...p, currentIndex]
    );
  const handleRetake = () => window.location.reload();

  return {
    currentIndex,
    answers,
    uncertain,
    submitted,
    review,
    totalScore,
    remainingTime,
    isSubmitting,
    currentQuestion,
    answeredCount,
    handleAnswer,
    handleClearAnswer,
    handleSubmit,
    handleNext,
    handlePrev,
    handleSelectQuestion,
    handleRetake,
    toggleUncertain,
  };
}
