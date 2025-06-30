"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { Question } from "./page";

interface UseKahootQuizProps {
  questions: Question[];
  duration_seconds: number;
  form_uuid: string | null;
  question_duration?: number;
}

interface AttemptAnswer {
  question_uuid: string;
  user_answer: string[];
  is_correct: boolean;
  answered_at: number;
  question_started_at: number;
  duration: number;
}

interface SubmissionPayload {
  form_uuid: string;
  score: number;
  duration_seconds: number;
  submitted_at: string;
  attempt_answers: AttemptAnswer[];
}

export function useKahootQuiz({
  questions,
  duration_seconds,
  form_uuid,
  question_duration,
}: UseKahootQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [review, setReview] = useState<Record<number, boolean>>({});
  const [questionTimer, setQuestionTimer] = useState<number>(
    question_duration ?? 30
  );
  const [showAnswerReview, setShowAnswerReview] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [startTime] = useState(Date.now());
  const [remainingTime, setRemainingTime] = useState<number | null>(
    duration_seconds
  );

  const [questionTimings, setQuestionTimings] = useState<
    Record<number, { started_at: number; answered_at?: number }>
  >({});
  const [backendScore, setBackendScore] = useState<number>(0);
  const [provisionalScore, setProvisionalScore] = useState<number>(0);
  const [currentQuestionScore, setCurrentQuestionScore] = useState<number>(0);
  const [previousScore, setPreviousScore] = useState<number>(0);

  const [questionStates, setQuestionStates] = useState<
    Record<number, "answered" | "unanswered" | "correct" | "incorrect">
  >({});

  const currentQuestion = questions?.[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const answeredCount = Object.keys(questionStates).filter((k) =>
    ["correct", "incorrect", "answered"].includes(questionStates[+k])
  ).length;

  const getCurrentCorrectAnswer = useCallback(() => {
    if (!currentQuestion) return [];
    return currentQuestion.options
      .filter((opt) => opt.is_correct)
      .map((opt) => opt.option_text ?? "");
  }, [currentQuestion]);

  const isAnswerCorrect = useCallback(
    (userAnswer: string[]) => {
      if (!currentQuestion) return false;
      const correctOptions = getCurrentCorrectAnswer();

      if (currentQuestion.question_type === "multiple_choice") {
        return (
          userAnswer.length === correctOptions.length &&
          userAnswer.length > 0 &&
          [...userAnswer].sort().join(",") ===
            [...correctOptions].sort().join(",")
        );
      } else {
        return (
          userAnswer.length > 0 &&
          (userAnswer[0] ?? "").trim().toLowerCase() ===
            (correctOptions[0] ?? "").trim().toLowerCase()
        );
      }
    },
    [currentQuestion, getCurrentCorrectAnswer]
  );

  const isCurrentAnswerCorrect = useCallback(() => {
    if (!currentQuestion) return false;
    const userAnswer = answers[currentIndex] ?? [];
    return isAnswerCorrect(userAnswer);
  }, [currentQuestion, currentIndex, answers, isAnswerCorrect]);

  const calculateProvisionalScore = useCallback(
    (isCorrect: boolean, timeRemaining: number, hasAnswer: boolean) => {
      if (!hasAnswer || !isCorrect) return 0;

      const maxScore = 1000;
      const minScore = 200;
      const timeLimit = question_duration ?? 30;
      const baseScore = Math.floor(
        minScore + (maxScore - minScore) * (timeRemaining / timeLimit)
      );

      return Math.max(minScore, baseScore);
    },
    [question_duration]
  );

  const handleTimeUp = useCallback(
    (providedAnswer?: string[]) => {
      const now = Date.now();
      const userAnswer = providedAnswer ?? answers[currentIndex] ?? [];
      const hasAnswer =
        userAnswer.length > 0 && userAnswer.some((ans) => ans.trim() !== "");
      const isCorrect =
        hasAnswer &&
        (providedAnswer
          ? isAnswerCorrect(providedAnswer)
          : isCurrentAnswerCorrect());

      const questionStartTime =
        questionTimings[currentIndex]?.started_at || now;
      const timeTakenSeconds = (now - questionStartTime) / 1000;
      const timeLimit = question_duration ?? 30;
      const timeRemaining = Math.max(0, timeLimit - timeTakenSeconds);

      setQuestionTimings((prev) => ({
        ...prev,
        [currentIndex]: {
          ...prev[currentIndex],
          answered_at: now,
        },
      }));

      setPreviousScore(provisionalScore);

      const questionScore = calculateProvisionalScore(
        isCorrect,
        timeRemaining,
        hasAnswer
      );

      setCurrentQuestionScore(questionScore);

      if (hasAnswer && questionScore > 0) {
        setProvisionalScore((prev) => prev + questionScore);
      }

      setReview((prev) => ({ ...prev, [currentIndex]: isCorrect }));

      setQuestionStates((prev) => ({
        ...prev,
        [currentIndex]: !hasAnswer
          ? "unanswered"
          : isCorrect
            ? "correct"
            : "incorrect",
      }));

      setShowAnswerReview(true);
    },
    [
      currentIndex,
      isCurrentAnswerCorrect,
      isAnswerCorrect,
      answers,
      calculateProvisionalScore,
      questionTimings,
      provisionalScore,
    ]
  );

  useEffect(() => {
    if (submitted || showAnswerReview || isQuizCompleted) return;

    const timer = setInterval(() => {
      setQuestionTimer((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted, showAnswerReview, isQuizCompleted, handleTimeUp]);

  useEffect(() => {
    if (submitted || isQuizCompleted) return;

    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev === null || prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted, isQuizCompleted]);

  useEffect(() => {
    if (!showAnswerReview && !submitted) {
      const now = Date.now();
      const timeLimit = question_duration ?? 30;
      setQuestionTimer(timeLimit);

      setQuestionTimings((prev) => ({
        ...prev,
        [currentIndex]: {
          started_at: now,
        },
      }));
    }
  }, [currentIndex, showAnswerReview, submitted, question_duration]);

  const handleAnswer = useCallback(
    (option: string) => {
      if (!currentQuestion || showAnswerReview) return;

      const now = Date.now();

      if (currentQuestion.question_type === "multiple_choice") {
        const currentAnswers = answers[currentIndex] ?? [];
        const newAnswers = currentAnswers.includes(option)
          ? currentAnswers.filter((ans) => ans !== option)
          : [...currentAnswers, option];
        setAnswers((prev) => ({ ...prev, [currentIndex]: newAnswers }));

        setQuestionTimings((prev) => ({
          ...prev,
          [currentIndex]: {
            ...prev[currentIndex],
            answered_at: now,
          },
        }));

        const correctAnswerCount = getCurrentCorrectAnswer().length;
        if (
          newAnswers.length === correctAnswerCount &&
          correctAnswerCount > 1
        ) {
          setTimeout(() => {
            handleTimeUp(newAnswers);
          }, 500);
        }
      } else {
        setAnswers((prev) => ({ ...prev, [currentIndex]: [option] }));

        setQuestionTimings((prev) => ({
          ...prev,
          [currentIndex]: {
            ...prev[currentIndex],
            answered_at: now,
          },
        }));

        setTimeout(() => {
          handleTimeUp([option]);
        }, 500);
      }
    },
    [
      currentQuestion,
      currentIndex,
      answers,
      showAnswerReview,
      handleTimeUp,
      getCurrentCorrectAnswer,
    ]
  );

  const handleClearAnswer = useCallback(() => {
    setAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[currentIndex];
      return newAnswers;
    });
  }, [currentIndex]);

  const handleNextQuestion = useCallback(() => {
    setShowAnswerReview(false);
    if (isLastQuestion) {
      setIsQuizCompleted(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [isLastQuestion]);

  const { mutate: submitKahootQuiz, isPending: isSubmitting } = useMutation({
    mutationFn: (payload: SubmissionPayload) => {
      return api.post("/quiz-kahoot", payload);
    },
    onSuccess: (response) => {
      const data = response.data as { data: { score: number } };
      if (data?.data?.score !== undefined) {
        setBackendScore(data.data.score);
      }
      toast.success("Quiz submitted successfully!");
      setSubmitted(true);
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Failed to submit quiz. Please try again.");
    },
  });

  const handleSubmit = useCallback(() => {
    if (!questions || !form_uuid || isSubmitting) {
      return;
    }

    const now = Date.now();
    const totalDurationSeconds = Math.round((now - startTime) / 1000);

    const formattedAnswers: AttemptAnswer[] = questions.map((q, index) => {
      const userAnswer = answers[index] ?? [];
      const hasAnswer =
        userAnswer.length > 0 && userAnswer.some((ans) => ans.trim() !== "");

      const isCorrect = hasAnswer && review[index] === true;

      const timing = questionTimings[index];
      const answeredAt = timing?.answered_at ?? timing?.started_at ?? now;
      const startedAt = timing?.started_at || now;
      const timeLimit = question_duration ?? 30;
      const questionDuration = Math.min(
        timeLimit,
        Math.round((answeredAt - startedAt) / 1000)
      );

      return {
        question_uuid: q.uuid,
        user_answer: userAnswer,
        is_correct: isCorrect,
        answered_at: answeredAt,
        question_started_at: startedAt,
        duration: Math.max(1, questionDuration),
      };
    });

    const finalPayload: SubmissionPayload = {
      form_uuid,
      score: provisionalScore,
      duration_seconds: totalDurationSeconds,
      submitted_at: new Date().toISOString(),
      attempt_answers: formattedAnswers,
    };

    submitKahootQuiz(finalPayload);
  }, [
    questions,
    form_uuid,
    startTime,
    answers,
    questionTimings,
    submitKahootQuiz,
    isAnswerCorrect,
    isSubmitting,
  ]);

  useEffect(() => {
    if (isQuizCompleted && !submitted) {
      handleSubmit();
    }
  }, [isQuizCompleted, submitted]);

  const handleRetake = () => window.location.reload();

  const timeLimit = question_duration ?? 30;
  const timerPercentage = (questionTimer / timeLimit) * 100;

  return {
    currentIndex,
    answers,
    submitted,
    review,
    totalScore: submitted ? backendScore : provisionalScore,
    questionTimer,
    showAnswerReview,
    isQuizCompleted,
    currentQuestionScore,
    previousScore,
    isSubmitting,
    currentQuestion,
    timerPercentage,
    remainingTime,
    answeredCount,
    questionStates,
    getCurrentCorrectAnswer,
    isCurrentAnswerCorrect,
    handleAnswer,
    handleClearAnswer,
    handleNextQuestion,
    handleSubmit,
    handleRetake,
  };
}
