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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Clock, ArrowRight, Info, ListTodo, FileText } from "lucide-react";
import { Question, UserAnswers } from "../../app/lib/quiz-data";
import { QuestionNavigator } from "./question-navigator";

interface MultipleChoiceQuestionProps {
  question: string;
  options: string[];
  selectedAnswer: string | undefined;
  onAnswerChange: (answer: string) => void;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  options,
  selectedAnswer,
  onAnswerChange,
}) => {
  return (
    <CardContent className="space-y-4">
      <h3 className="text-xl font-semibold">{question}</h3>
      <RadioGroup value={selectedAnswer} onValueChange={onAnswerChange}>
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={`mc-option-${index}`} />
            <Label htmlFor={`mc-option-${index}`}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
    </CardContent>
  );
};

interface MultipleAnswersQuestionProps {
  question: string;
  options: string[];
  selectedAnswers: string[];
  onAnswerChange: (answer: string[]) => void;
}

const MultipleAnswersQuestion: React.FC<MultipleAnswersQuestionProps> = ({
  question,
  options,
  selectedAnswers,
  onAnswerChange,
}) => {
  const handleCheckedChange = (option: string, checked: boolean) => {
    if (checked) {
      onAnswerChange([...selectedAnswers, option]);
    } else {
      onAnswerChange(selectedAnswers.filter((a) => a !== option));
    }
  };

  return (
    <CardContent className="space-y-4">
      <h3 className="text-xl font-semibold">{question}</h3>
      <div className="grid gap-2">
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              id={`ma-option-${index}`}
              checked={selectedAnswers.includes(option)}
              onCheckedChange={(checked) =>
                handleCheckedChange(option, checked === true)
              }
            />
            <Label htmlFor={`ma-option-${index}`}>{option}</Label>
          </div>
        ))}
      </div>
    </CardContent>
  );
};

interface EssayQuestionProps {
  question: string;
  userAnswer: string;
  onAnswerChange: (answer: string) => void;
}

const EssayQuestion: React.FC<EssayQuestionProps> = ({
  question,
  userAnswer,
  onAnswerChange,
}) => {
  return (
    <CardContent className="space-y-4">
      <h3 className="text-xl font-semibold">{question}</h3>
      <Textarea
        placeholder="Ketik jawaban Anda di sini..."
        value={userAnswer}
        onChange={(e) => onAnswerChange(e.target.value)}
        className="min-h-[100px]"
      />
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

export const QuizGame: React.FC<QuizGameProps> = ({
  quizData,
  onQuizComplete,
  onTimeUp,
  timeLimitSeconds,
  onUnansweredQuestionsAttempt,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [timeLeft, setTimeLeft] = useState(timeLimitSeconds);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = quizData[currentQuestionIndex];
  const totalQuestions = quizData.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleAnswerChange = useCallback(
    (questionId: string, answer: string | string[]) => {
      setUserAnswers((prevAnswers: any) => ({
        ...prevAnswers,
        [questionId]: answer,
      }));
    },
    []
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
      if (question.type === "essay") {
        return typeof userAnswer === "string" && userAnswer.trim().length > 0;
      }
      return false;
    },
    [userAnswers]
  );

  const getUnansweredQuestionsCount = useCallback((): number => {
    return quizData.filter((q) => !isQuestionAnswered(q)).length;
  }, [quizData, isQuestionAnswered]);

  const calculateScore = useCallback(() => {
    let score = 0;
    quizData.forEach((q) => {
      const userAnswer = userAnswers[q.id];
      if (q.type === "multiple-choice" && typeof userAnswer === "string") {
        if (userAnswer === q.correctAnswer) {
          score++;
        }
      } else if (
        q.type === "multiple-answers" &&
        Array.isArray(userAnswer) &&
        Array.isArray(q.correctAnswer)
      ) {
        const sortedUserAnswers = [...userAnswer].sort();
        const sortedCorrectAnswers = [...q.correctAnswer].sort();
        if (
          sortedUserAnswers.length === sortedCorrectAnswers.length &&
          sortedUserAnswers.every(
            (val, index) => val === sortedCorrectAnswers[index]
          )
        ) {
          score++;
        }
      } else if (q.type === "essay" && typeof userAnswer === "string") {
        if (
          userAnswer.trim().toLowerCase() ===
          String(q.correctAnswer).trim().toLowerCase()
        ) {
          score++;
        }
      }
    });
    return score;
  }, [quizData, userAnswers]);

  const handleSubmitQuiz = useCallback(() => {
    const unansweredCount = getUnansweredQuestionsCount();
    if (unansweredCount > 0) {
      onUnansweredQuestionsAttempt(unansweredCount);
      return;
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    const finalScore = calculateScore();
    onQuizComplete(finalScore, userAnswers);
  }, [
    calculateScore,
    onQuizComplete,
    userAnswers,
    getUnansweredQuestionsCount,
    onUnansweredQuestionsAttempt,
  ]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      handleSubmitQuiz();
    }
  }, [currentQuestionIndex, totalQuestions, handleSubmitQuiz]);

  const handlePreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  }, [currentQuestionIndex]);

  const handleNavigateToQuestion = useCallback((index: number) => {
    setCurrentQuestionIndex(index);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current!);
          onTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [onTimeUp, timeLimitSeconds]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getQuestionTypeIcon = (type: Question["type"]) => {
    switch (type) {
      case "multiple-choice":
        return <Info className="w-5 h-5 text-[var(--custom-link-blue)]" />;
      case "multiple-answers":
        return <ListTodo className="w-5 h-5 text-[var(--custom-orange)]" />;
      case "essay":
        return <FileText className="w-5 h-5 text-[var(--secondary)]" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl space-y-6">
      <Card className="w-full shadow-lg rounded-xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              {getQuestionTypeIcon(currentQuestion.type)}
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </CardTitle>
            <Badge
              variant="outline"
              className="flex items-center gap-1 text-lg py-1 px-3 bg-[var(--custom-gray-light)] text-[var(--custom-gray-text)]"
            >
              <Clock className="w-4 h-4 text-[var(--custom-orange)]" />
              {formatTime(timeLeft)}
            </Badge>
          </div>
          <Progress
            value={progress}
            className="mt-4 h-2 [&>*]:bg-[var(--primary)]"
          />
        </CardHeader>

        {currentQuestion && (
          <>
            {currentQuestion.type === "multiple-choice" && (
              <MultipleChoiceQuestion
                question={currentQuestion.question}
                options={currentQuestion.options!}
                selectedAnswer={
                  userAnswers[currentQuestion.id] as string | undefined
                }
                onAnswerChange={(answer) =>
                  handleAnswerChange(currentQuestion.id, answer)
                }
              />
            )}
            {currentQuestion.type === "multiple-answers" && (
              <MultipleAnswersQuestion
                question={currentQuestion.question}
                options={currentQuestion.options!}
                selectedAnswers={
                  (userAnswers[currentQuestion.id] as string[]) || []
                }
                onAnswerChange={(answers) =>
                  handleAnswerChange(currentQuestion.id, answers)
                }
              />
            )}
            {currentQuestion.type === "essay" && (
              <EssayQuestion
                question={currentQuestion.question}
                userAnswer={(userAnswers[currentQuestion.id] as string) || ""}
                onAnswerChange={(answer) =>
                  handleAnswerChange(currentQuestion.id, answer)
                }
              />
            )}
          </>
        )}

        <CardFooter className="flex justify-between items-center bg-muted/50 p-6 rounded-b-xl">
          <Button
            size="lg"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            variant="outline"
            className="text-[var(--custom-gray-text)] border-[var(--custom-gray-border)] hover:bg-[var(--custom-gray-light)]"
          >
            Previous
          </Button>
          <Button
            size="lg"
            onClick={handleNextQuestion}
            className="bg-[var(--primary)] text-primary-foreground hover:bg-[var(--primary-blue-light)] shadow-md"
          >
            {currentQuestionIndex === totalQuestions - 1
              ? "Submit Quiz"
              : "Next Question"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>

      <QuestionNavigator
        quizData={quizData}
        currentQuestionIndex={currentQuestionIndex}
        userAnswers={userAnswers}
        onNavigate={handleNavigateToQuestion}
      />
    </div>
  );
};
