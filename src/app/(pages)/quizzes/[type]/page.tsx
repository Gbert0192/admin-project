import React from "react";
import QuizGrid from "./QuizGrid";

export default function AllQuizzesPage({
  params,
}: {
  params: { type: string };
}) {
  const quizType = params.type;

  return <QuizGrid key={quizType} quizType={quizType} />;
}
