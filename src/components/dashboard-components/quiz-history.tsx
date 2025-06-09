import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

const HistoryItem = ({
  title,
  status,
  detail,
}: {
  title: string;
  status: "Graded" | "Submitted" | "Draft";
  detail: string;
}) => (
  <div className="flex items-center gap-4 hover:bg-muted/50 p-2 rounded-md">
    <div className="h-10 w-10 bg-secondary rounded-md flex items-center justify-center">
      <FileText className="h-5 w-5 text-muted-foreground" />
    </div>
    <div className="flex-1">
      <p className="font-medium">{title}</p>
      <p className="text-sm text-muted-foreground">{detail}</p>
    </div>
    <Badge variant={status === "Graded" ? "default" : "secondary"}>
      {status}
    </Badge>
  </div>
);

export const QuizHistory = () => (
  <Card>
    <CardHeader>
      <CardTitle>Submission History</CardTitle>
      <CardDescription>
        Review the quizzes and forms you have completed.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="all"
            className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="graded"
            className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Graded
          </TabsTrigger>
          <TabsTrigger
            value="draft"
            className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Draft
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="space-y-4 mt-4">
            <HistoryItem
              title="Verbal Ability Test"
              status="Graded"
              detail="Score: 95/100"
            />
            <HistoryItem
              title="User Satisfaction Survey"
              status="Submitted"
              detail="Submitted on June 5, 2025"
            />
            <HistoryItem
              title="Basic Logic Quiz"
              status="Draft"
              detail="Saved on June 7, 2025"
            />
          </div>
        </TabsContent>
        <TabsContent value="graded">
          <div className="space-y-4 mt-4">
            <HistoryItem
              title="Verbal Ability Test"
              status="Graded"
              detail="Score: 95/100"
            />
          </div>
        </TabsContent>
        <TabsContent value="draft">
          <div className="space-y-4 mt-4">
            <HistoryItem
              title="Basic Logic Quiz"
              status="Draft"
              detail="Saved on June 7, 2025"
            />
          </div>
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
);
