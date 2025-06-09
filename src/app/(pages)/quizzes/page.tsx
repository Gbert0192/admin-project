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

export default function QuizInfoPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-muted/40 p-4 sm:p-6">
      <Card className="w-full max-w-2xl shadow-lg">
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
            <Badge variant="outline" className="mt-1">
              History
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground border-t pt-6">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">20 Multiple Choice Questions</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">Time Limit: 15 Minutes</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Instructions
            </h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-2">
              <li>Choose the one answer you believe is the most correct.</li>
              <li>
                The timer will start when you press the &quot;Start Quiz&quot;
                button.
              </li>
              <li>Ensure a stable internet connection during the quiz.</li>
              <li>
                Do not refresh the page, as it will restart the quiz from the
                beginning.
              </li>
              <li>
                The final score will be shown after all questions are answered.
              </li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end bg-muted/50 p-6 rounded-b-lg">
          <Button size="lg" className="w-full sm:w-auto">
            Start Quiz
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
