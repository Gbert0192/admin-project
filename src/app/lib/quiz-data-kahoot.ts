export interface QuizItem {
  question_type: "single_choice" | "multiple_choice" | "true_false";
  question_text: string;
  options: string[];
  correctAnswer: string[];
}
