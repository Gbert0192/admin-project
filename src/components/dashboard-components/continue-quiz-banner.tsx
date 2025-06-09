import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlayCircle } from "lucide-react";

export const ContinueQuizBanner = () => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-4">
      <div>
        <CardDescription>Not finished yet?</CardDescription>
        <CardTitle className="text-xl">Basic Logic Quiz - Draft</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <Button>
        <PlayCircle className="mr-2 h-4 w-4" /> Continue Quiz
      </Button>
    </CardContent>
  </Card>
);
