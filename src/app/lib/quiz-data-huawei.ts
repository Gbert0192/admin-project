export interface QuizItem {
  type: "single" | "multiple" | "truefalse" | "essay";
  question: string;
  options: string[];
  correctAnswer: string[];
  points: number;
}

export const quizData: QuizItem[] = [
  {
    type: "truefalse",
    question: "AI can only be used for image recognition.",
    options: ["True", "False"],
    correctAnswer: ["False"],
    points: 10,
  },
  {
    type: "single",
    question: "Which of the following is a supervised learning algorithm?",
    options: ["K-Means", "Linear Regression", "PCA", "Autoencoder"],
    correctAnswer: ["Linear Regression"],
    points: 20,
  },
  {
    type: "multiple",
    question: "Which of the following are activation functions?",
    options: ["ReLU", "Sigmoid", "Dropout", "Tanh"],
    correctAnswer: ["ReLU", "Sigmoid", "Tanh"],
    points: 30,
  },
  {
    type: "essay",
    question:
      "Explain the difference between overfitting and underfitting in machine learning.",
    options: [],
    correctAnswer: [],
    points: 40,
  },
  {
    type: "single",
    question:
      '"Batch inference is a batch job that performs inference on batch data. There is no need for model training before using batch inference." Which of the following is true about this statement?',
    options: [
      "This statement is correct. With batch inference, training is no longer required.",
      "This statement is correct. Inference means the end of training.",
      "This statement is incorrect. Model training is required before inference is performed.",
      "This statement is incorrect. No training is required before batch inference.",
    ],
    correctAnswer: [
      "This statement is incorrect. Model training is required before inference is performed.",
    ],
    points: 20,
  },
];
