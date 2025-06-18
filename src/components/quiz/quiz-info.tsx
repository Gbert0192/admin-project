import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Clock, BookOpen, ArrowRight } from "lucide-react";
import { quizData, TIME_LIMIT_MINUTES } from "../../app/lib/quiz-data";

interface QuizInfoProps {
  onStartQuiz: () => void;
}

export const QuizInfo: React.FC<QuizInfoProps> = ({ onStartQuiz }) => {
  return (
    <Card className="w-full max-w-2xl shadow-lg rounded-xl">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
          <div>
            <CardTitle className="text-3xl font-bold mb-1">
              Indonesian Independence History Quiz
            </CardTitle>
            <CardDescription className="text-md">
              Test your knowledge of the key moments in the nation&apos;s
              struggle.
            </CardDescription>
          </div>
          <Badge variant="outline" className="mt-1 text-md py-1 px-3">
            History
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground border-t pt-6">
          {/* Displaying number of questions and indicating they are all flash cards */}
          <div className="flex items-center gap-3">
            <HelpCircle className="w-5 h-5 flex-shrink-0 text-[var(--primary)]" />{" "}
            <span className="font-medium">
              {quizData.length} Questions (Flash Card)
            </span>
          </div>
          {/* Displaying time limit */}
          {/* <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 flex-shrink-0 text-[var(--custom-orange)]" />{" "}
            <span className="font-medium">
              Time Limit: {TIME_LIMIT_MINUTES} Minutes
            </span>
          </div> */}
        </div>
        <div>
          {/* Quiz Instructions section */}
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[var(--secondary)]" />{" "}
            Instructions
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-2">
            <li>Review each flash card to reinforce your knowledge.</li>{" "}
            <li>Ensure a stable internet connection during the quiz.</li>
            <li>
              Do not refresh the page, as it will restart the quiz from the
              beginning.
            </li>
            <li>
              The final score will be shown after all questions are answered or
              time runs out.
            </li>
          </ul>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end bg-muted/50 p-6 rounded-b-xl">
        {/* Button to start the quiz */}
        <Button
          size="lg"
          className="w-full sm:w-auto shadow-md bg-[var(--primary)] text-primary-foreground hover:bg-[var(--primary-blue-light)]"
          onClick={onStartQuiz}
        >
          Start Quiz
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};