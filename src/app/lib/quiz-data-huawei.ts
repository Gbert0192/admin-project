export interface QuizItem {
  id: number;
  type: "single" | "multiple" | "truefalse" | "essay";
  question: string;
  options: string[];
  correctAnswer: string[];
  points: number;
}

export const quizData: QuizItem[] = [
  {
    id: 1,
    type: "truefalse",
    question: "AI can only be used for image recognition.",
    options: ["True", "False"],
    correctAnswer: ["False"],
    points: 10,
  },
  {
    id: 2,
    type: "single",
    question: "Which of the following is a supervised learning algorithm?",
    options: ["K-Means", "Linear Regression", "PCA", "Autoencoder"],
    correctAnswer: ["Linear Regression"],
    points: 20,
  },
  {
    id: 3,
    type: "multiple",
    question: "Which of the following are activation functions?",
    options: ["ReLU", "Sigmoid", "Dropout", "Tanh"],
    correctAnswer: ["ReLU", "Sigmoid", "Tanh"],
    points: 30,
  },
  {
    id: 4,
    type: "essay",
    question:
      "Explain the difference between overfitting and underfitting in machine learning.",
    options: [],
    correctAnswer: [],
    points: 40,
  },
  {
    id: 5,
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

  // Tambahan 10 soal lagi
  {
    id: 6,
    type: "truefalse",
    question: "Convolutional Neural Networks are mainly used for image data.",
    options: ["True", "False"],
    correctAnswer: ["True"],
    points: 10,
  },
  {
    id: 7,
    type: "single",
    question: "Which metric is best for evaluating a regression model?",
    options: ["Accuracy", "F1 Score", "Mean Squared Error", "Recall"],
    correctAnswer: ["Mean Squared Error"],
    points: 20,
  },
  {
    id: 8,
    type: "multiple",
    question: "Which of the following are types of machine learning?",
    options: [
      "Supervised Learning",
      "Reinforcement Learning",
      "Unsupervised Learning",
      "Integrated Learning",
    ],
    correctAnswer: [
      "Supervised Learning",
      "Reinforcement Learning",
      "Unsupervised Learning",
    ],
    points: 30,
  },
  {
    id: 9,
    type: "essay",
    question: "What is the role of a loss function in machine learning?",
    options: [],
    correctAnswer: [],
    points: 30,
  },
  {
    id: 10,
    type: "single",
    question:
      "What does the dropout layer do in a neural network during training?",
    options: [
      "Increases the number of neurons",
      "Drops irrelevant features permanently",
      "Randomly disables neurons to prevent overfitting",
      "Multiplies the outputs by zero",
    ],
    correctAnswer: ["Randomly disables neurons to prevent overfitting"],
    points: 25,
  },
  {
    id: 11,
    type: "multiple",
    question: "Which of the following are examples of unsupervised learning?",
    options: [
      "K-Means",
      "DBSCAN",
      "Logistic Regression",
      "Hierarchical Clustering",
    ],
    correctAnswer: ["K-Means", "DBSCAN", "Hierarchical Clustering"],
    points: 25,
  },
  {
    id: 12,
    type: "single",
    question: "Which one is a dimensionality reduction technique?",
    options: ["Naive Bayes", "SVM", "PCA", "Decision Tree"],
    correctAnswer: ["PCA"],
    points: 15,
  },
  {
    id: 13,
    type: "truefalse",
    question:
      "Reinforcement learning agents learn by receiving rewards or penalties.",
    options: ["True", "False"],
    correctAnswer: ["True"],
    points: 10,
  },
  {
    id: 14,
    type: "essay",
    question: "Describe a real-world use case for reinforcement learning.",
    options: [],
    correctAnswer: [],
    points: 35,
  },
  {
    id: 15,
    type: "multiple",
    question: "Which methods are commonly used to prevent overfitting?",
    options: ["Dropout", "Early Stopping", "Data Augmentation", "Max Pooling"],
    correctAnswer: ["Dropout", "Early Stopping", "Data Augmentation"],
    points: 30,
  },
];
