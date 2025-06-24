import React, { useState, useEffect, useRef, useCallback } from "react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
  Clock,
  ArrowRight,
  Info,
  ListTodo,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { Question, UserAnswers } from "../../../app/lib/quiz-data";

const optionColors = [
  "border-red-500",
  "border-blue-500",
  "border-yellow-500",
  "border-green-500",
];

interface OptionProps {
  option: string;
  index: number;
  isSelected: boolean;
  onSelect: (option: string) => void;
  isAnswered: boolean;
  isCorrectOption?: boolean;
}

const OptionButton: React.FC<OptionProps> = ({
  option,
  index,
  isSelected,
  onSelect,
  isAnswered,
  isCorrectOption,
}) => {
  const borderColorClass = optionColors[index % optionColors.length];

  const selectedClass = isSelected
    ? `ring-4 ring-offset-2 ring-offset-gray-800 ${borderColorClass.replace("border", "ring")} bg-opacity-20`
    : "";

  let feedbackClass = "";
  if (isAnswered) {
    if (isCorrectOption) {
      feedbackClass =
        "bg-green-500 text-white border-4 border-green-700 shadow-lg";
    } else if (isSelected && !isCorrectOption) {
      feedbackClass = "bg-red-500 text-white border-4 border-red-700 shadow-lg";
    } else {
      feedbackClass = "opacity-50";
    }
  }

  return (
    <Button
      className={`relative w-full h-20 sm:h-24 font-bold text-sm sm:text-lg rounded-xl shadow-lg transition-all duration-200 ease-in-out flex items-center justify-center p-2 sm:p-3 border-2 ${borderColorClass} bg-white text-gray-800 hover:bg-gray-100
      ${isSelected && !isAnswered ? "bg-gray-200" : ""}
      ${selectedClass} ${feedbackClass}`}
      onClick={() => onSelect(option)}
      disabled={isAnswered}
    >
      <span className="absolute top-1 left-1 text-gray-600 text-xs sm:text-sm font-mono opacity-75">
        {String.fromCharCode(65 + index)}
      </span>
      <span className="text-center break-words px-2">{option}</span>
    </Button>
  );
};

interface MultipleChoiceQuestionProps {
  question: string;
  options: string[];
  selectedAnswer: string | undefined;
  onAnswerChange: (answer: string) => void;
  isAnswered: boolean;
  correctAnswer: string;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  options,
  selectedAnswer,
  onAnswerChange,
  isAnswered,
  correctAnswer,
}) => {
  return (
    <CardContent className="flex flex-col items-center p-4 gap-4 py-6">
      <h3 className="text-lg sm:text-xl font-bold text-center text-gray-800 bg-white p-4 rounded-lg shadow-inner flex-shrink-0 w-full max-w-2xl">
        {question}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        {options.map((option, index) => (
          <OptionButton
            key={index}
            option={option}
            index={index}
            isSelected={selectedAnswer === option}
            onSelect={onAnswerChange}
            isAnswered={isAnswered}
            isCorrectOption={isAnswered && option === correctAnswer}
          />
        ))}
      </div>
    </CardContent>
  );
};

interface MultipleAnswersQuestionProps {
  question: string;
  options: string[];
  selectedAnswers: string[];
  onOptionToggle: (option: string, isChecked: boolean) => void;
  isAnswered: boolean;
  correctAnswers: string[];
}

const MultipleAnswersQuestion: React.FC<MultipleAnswersQuestionProps> = ({
  question,
  options,
  selectedAnswers,
  onOptionToggle,
  isAnswered,
  correctAnswers,
}) => {
  const handleSelect = (option: string) => {
    const isChecked = selectedAnswers.includes(option);
    onOptionToggle(option, !isChecked);
  };

  return (
    <CardContent className="flex flex-col items-center p-4 gap-4 py-6">
      <h3 className="text-lg sm:text-xl font-bold text-center text-gray-800 bg-white p-4 rounded-lg shadow-inner flex-shrink-0 w-full max-w-2xl">
        {question}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        {options.map((option, index) => (
          <OptionButton
            key={index}
            option={option}
            index={index}
            isSelected={selectedAnswers.includes(option)}
            onSelect={handleSelect}
            isAnswered={isAnswered}
            isCorrectOption={isAnswered && correctAnswers.includes(option)}
          />
        ))}
      </div>
    </CardContent>
  );
};

interface QuizGameProps {
  quizData: Question[];
  onQuizComplete: (score: number, userAnswers: UserAnswers) => void;
  onTimeUp: () => void;
  timeLimitSeconds: number;
  onUnansweredQuestionsAttempt: (unansweredCount: number) => void;
}

const PER_QUESTION_TIME_SECONDS = 20;

const MAX_QUESTION_POINTS = 1000;

export const QuizGame: React.FC<QuizGameProps> = ({
  quizData,
  onQuizComplete,
  onTimeUp,
  timeLimitSeconds: overallTimeLimitSeconds,
  onUnansweredQuestionsAttempt,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [overallTimeLeft, setOverallTimeLeft] = useState(
    overallTimeLimitSeconds
  );
  const [questionTimeLeft, setQuestionTimeLeft] = useState(
    PER_QUESTION_TIME_SECONDS
  );
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCurrentAnswerCorrect, setIsCurrentAnswerCorrect] = useState(false);
  const [pointsGained, setPointsGained] = useState(0);
  const [currentTotalScore, setCurrentTotalScore] = useState(0);

  const userAnswersRef = useRef<UserAnswers>({});
  const overallTimerRef = useRef<NodeJS.Timeout | null>(null);
  const questionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const questionStartTimestampRef = useRef<number>(Date.now());

  const currentQuestion = quizData[currentQuestionIndex];
  const totalQuestions = quizData.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  useEffect(() => {
    userAnswersRef.current = userAnswers;
  }, [userAnswers]);

  const calculatePoints = useCallback((timeTaken: number): number => {
    if (timeTaken <= 0.5) return MAX_QUESTION_POINTS;

    const points = Math.max(
      0,
      MAX_QUESTION_POINTS * (1 - timeTaken / PER_QUESTION_TIME_SECONDS)
    );
    return Math.floor(points);
  }, []);

  const submitCurrentAnswer = useCallback(
    (answer: string | string[]) => {
      if (showFeedback) return;

      if (questionTimerRef.current) {
        clearInterval(questionTimerRef.current);
        questionTimerRef.current = null;
      }

      const timeTaken = (Date.now() - questionStartTimestampRef.current) / 1000;

      setUserAnswers((prevAnswers: any) => ({
        ...prevAnswers,
        [currentQuestion.id]: answer,
      }));

      let correct = false;
      let calculatedPoints = 0;

      if (
        currentQuestion.type === "multiple-choice" &&
        typeof answer === "string"
      ) {
        if (answer === currentQuestion.correctAnswer) {
          correct = true;
          calculatedPoints = calculatePoints(timeTaken);
        }
      } else if (
        currentQuestion.type === "multiple-answers" &&
        Array.isArray(answer) &&
        Array.isArray(currentQuestion.correctAnswer)
      ) {
        const sortedUserAnswers = [...answer].sort();
        const sortedCorrectAnswers = [...currentQuestion.correctAnswer].sort();
        if (
          sortedUserAnswers.length === sortedCorrectAnswers.length &&
          sortedUserAnswers.every(
            (val, index) => val === sortedCorrectAnswers[index]
          )
        ) {
          correct = true;
          calculatedPoints = calculatePoints(timeTaken);
        }
      }

      setIsCurrentAnswerCorrect(correct);
      setPointsGained(calculatedPoints);
      setCurrentTotalScore((prevScore) => prevScore + calculatedPoints);
      setShowFeedback(true);
    },

    [currentQuestion, calculatePoints, showFeedback]
  );

  const handleMultipleAnswerToggle = useCallback(
    (option: string, isChecked: boolean) => {
      setUserAnswers((prevAnswers: any) => {
        const currentAnswers =
          (prevAnswers[currentQuestion.id] as string[]) || [];
        let newAnswers;
        if (isChecked) {
          newAnswers = [...currentAnswers, option];
        } else {
          newAnswers = currentAnswers.filter((a: string) => a !== option);
        }
        return {
          ...prevAnswers,
          [currentQuestion.id]: newAnswers,
        };
      });
    },
    [currentQuestion]
  );

  const isQuestionAnswered = useCallback(
    (question: Question): boolean => {
      const userAnswer = userAnswers[question.id];
      if (question.type === "multiple-choice") {
        return typeof userAnswer === "string" && userAnswer.length > 0;
      }
      if (question.type === "multiple-answers") {
        return Array.isArray(userAnswer) && userAnswer.length > 0;
      }
      return false;
    },
    [userAnswers]
  );

  const getUnansweredQuestionsCount = useCallback((): number => {
    return quizData.filter((q) => !isQuestionAnswered(q)).length;
  }, [quizData, isQuestionAnswered]);

  const handleSubmitQuiz = useCallback(() => {
    if (overallTimerRef.current) {
      clearInterval(overallTimerRef.current);
    }
    if (questionTimerRef.current) {
      clearInterval(questionTimerRef.current);
    }
    onQuizComplete(currentTotalScore, userAnswers);
  }, [onQuizComplete, currentTotalScore, userAnswers]);

  const handleAdvanceQuestion = useCallback(() => {
    setShowFeedback(false);
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setQuestionTimeLeft(PER_QUESTION_TIME_SECONDS);
      questionStartTimestampRef.current = Date.now();
    } else {
      handleSubmitQuiz();
    }
  }, [currentQuestionIndex, totalQuestions, handleSubmitQuiz]);

  useEffect(() => {
    overallTimerRef.current = setInterval(() => {
      setOverallTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(overallTimerRef.current!);
          clearInterval(questionTimerRef.current!);
          onTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      if (overallTimerRef.current) {
        clearInterval(overallTimerRef.current);
      }
    };
  }, [overallTimeLimitSeconds, onTimeUp]);

  useEffect(() => {
    if (questionTimerRef.current) {
      clearInterval(questionTimerRef.current);
      questionTimerRef.current = null;
    }

    if (showFeedback) {
      return;
    }

    setQuestionTimeLeft(PER_QUESTION_TIME_SECONDS);
    questionStartTimestampRef.current = Date.now();

    questionTimerRef.current = setInterval(() => {
      setQuestionTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(questionTimerRef.current!);

          if (currentQuestion && currentQuestion.type === "multiple-answers") {
            const latestSelectedAnswers =
              (userAnswersRef.current[currentQuestion.id] as string[]) || [];
            submitCurrentAnswer(latestSelectedAnswers);
          } else {
            submitCurrentAnswer("");
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      if (questionTimerRef.current) {
        clearInterval(questionTimerRef.current);
      }
    };
  }, [
    currentQuestionIndex,
    showFeedback,
    submitCurrentAnswer,
    currentQuestion,
  ]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getQuestionTypeIcon = (type: Question["type"]) => {
    switch (type) {
      case "multiple-choice":
        return <Info className="w-4 h-4 text-[var(--custom-link-blue)]" />;
      case "multiple-answers":
        return <ListTodo className="w-4 h-4 text-[var(--custom-orange)]" />;
      default:
        return null;
    }
  };

  if (!currentQuestion) {
    return (
      <div className="text-white text-center text-lg">Loading question...</div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-2 p-2 sm:p-3 rounded-lg min-h-[calc(55vh-30px)] flex flex-col justify-between font-inter relative">
      <Card className="w-full shadow-2xl rounded-2xl overflow-hidden flex-grow flex flex-col">
        <CardHeader className="bg-white/10 p-3 sm:p-4 flex flex-col items-center justify-center border-b border-white/20">
          <div className="flex justify-between items-center w-full px-2 mb-3">
            <div className="text-black text-base font-semibold">
              Total Score: {currentTotalScore}
            </div>
            <Badge
              variant="outline"
              className="flex items-center justify-center gap-1 text-base sm:text-lg font-extrabold py-1 px-3 bg-[var(--primary)] text-primary-foreground rounded-full shadow-lg border-2 border-[var(--primary-blue-light)] animate-pulse-slight"
            >
              <Clock className="w-5 h-5 text-primary-foreground" />
              {formatTime(questionTimeLeft)}
            </Badge>
          </div>
        </CardHeader>

        <div className="flex-grow flex flex-col items-center justify-center p-4">
          {currentQuestion && (
            <>
              {currentQuestion.type === "multiple-choice" && (
                <MultipleChoiceQuestion
                  question={currentQuestion.question}
                  options={currentQuestion.options!}
                  selectedAnswer={
                    userAnswers[currentQuestion.id] as string | undefined
                  }
                  onAnswerChange={(answer) => submitCurrentAnswer(answer)}
                  isAnswered={showFeedback}
                  correctAnswer={currentQuestion.correctAnswer as string}
                />
              )}
              {currentQuestion.type === "multiple-answers" && (
                <MultipleAnswersQuestion
                  question={currentQuestion.question}
                  options={currentQuestion.options!}
                  selectedAnswers={
                    (userAnswers[currentQuestion.id] as string[]) || []
                  }
                  onOptionToggle={handleMultipleAnswerToggle}
                  isAnswered={showFeedback}
                  correctAnswers={currentQuestion.correctAnswer as string[]}
                />
              )}
            </>
          )}
        </div>

        <CardFooter className="mt-auto flex justify-center items-center bg-gradient-to-br from-blue-400 to-blue-600 p-3 sm:p-4 rounded-b-2xl border-t border-[var(--custom-gray-border)]">
          {currentQuestion.type === "multiple-answers" && !showFeedback && (
            <Button
              size="lg"
              onClick={() =>
                submitCurrentAnswer(
                  (userAnswers[currentQuestion.id] as string[]) || []
                )
              }
              className="bg-white text-gray-800 hover:bg-gray-100 shadow-lg transition-colors duration-200 flex items-center gap-2 px-5 py-2 rounded-lg text-xs sm:text-sm"
              disabled={showFeedback}
            >
              Confirm Answer
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          )}

          {currentQuestionIndex === totalQuestions - 1 &&
            !showFeedback &&
            currentQuestion.type === "multiple-choice" && (
              <Button
                size="lg"
                onClick={handleSubmitQuiz}
                className="bg-[var(--primary)] text-primary-foreground hover:bg-[var(--primary-blue-light)] shadow-lg transition-colors duration-200 flex items-center gap-2 px-5 py-2 rounded-lg text-xs sm:text-sm"
              >
                Finish Quiz
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}
        </CardFooter>
      </Card>

      {showFeedback && (
        <div className="absolute inset-0 flex items-center justify-center z-50 p-3">
          <Card
            className={`w-full max-w-sm text-center p-6 rounded-xl shadow-xl border-4 ${isCurrentAnswerCorrect ? "border-green-500 bg-green-900 text-white" : "border-red-500 bg-red-900 text-white"}`}
          >
            <CardHeader className="flex flex-col items-center justify-center space-y-3">
              {isCurrentAnswerCorrect ? (
                <CheckCircle2 className="w-16 h-16 text-green-400 drop-shadow-lg" />
              ) : (
                <XCircle className="w-16 h-16 text-red-400 drop-shadow-lg" />
              )}
              <CardTitle className="text-2xl font-extrabold">
                {isCurrentAnswerCorrect ? "CORRECT!" : "INCORRECT!"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-lg font-semibold">
                You earned: 
                <span className="text-yellow-300"> {pointsGained}</span> Points
              </p>
              <p className="text-base font-medium">
                Your Total Score: 
                <span className="text-yellow-300"> {currentTotalScore} </span>
                Points
              </p>
            </CardContent>
            <CardFooter className="flex justify-center pt-4">
              <Button
                size="lg"
                onClick={handleAdvanceQuestion}
                className="bg-white text-gray-900 hover:bg-gray-200 font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm"
              >
                {currentQuestionIndex === totalQuestions - 1
                  ? "View Final Result"
                  : "Next"}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};
