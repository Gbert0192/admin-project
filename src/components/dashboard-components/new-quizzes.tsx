import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NewQuizItem = ({
  title,
  category,
}: {
  title: string;
  category: string;
}) => (
  <div className="flex items-center justify-between hover:bg-muted/50 p-2 rounded-md">
    <div>
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-muted-foreground">{category}</p>
    </div>
    <Button variant="outline" size="sm">
      Start
    </Button>
  </div>
);

export const NewQuizzes = () => (
  <Card>
    <CardHeader>
      <CardTitle>New Quizzes & Forms</CardTitle>
    </CardHeader>
    <CardContent className="grid gap-4">
      <NewQuizItem
        title="General Knowledge Quiz #5"
        category="General Knowledge"
      />
      <NewQuizItem title="User Experience Feedback" category="Survey" />
      <NewQuizItem
        title="Psychological Test: Personality Type"
        category="Psychological Test"
      />
    </CardContent>
  </Card>
);
