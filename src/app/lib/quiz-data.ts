export interface Question {
  id: string;
  type: "multiple-choice" | "multiple-answers"; // 'essay' type removed
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
}

export type UserAnswers = Record<string, string | string[]>;

export const quizData: Question[] = [
  {
    id: "q1",
    type: "multiple-choice",
    question: "Siapakah proklamator kemerdekaan Indonesia?",
    options: [
      "Soekarno",
      "Mohammad Hatta",
      "Soekarno dan Mohammad Hatta",
      "Ki Hajar Dewantara",
    ],
    correctAnswer: "Soekarno dan Mohammad Hatta",
  },
  {
    id: "q2",
    type: "multiple-answers",
    question:
      "Pilih peristiwa-peristiwa penting yang terjadi pada masa Proklamasi Kemerdekaan Indonesia:",
    options: [
      "Peristiwa Rengasdengklok",
      "Pembacaan Teks Proklamasi",
      "Sidang BPUPKI pertama",
      "Pembentukan PPKI",
      "Konferensi Meja Bundar",
    ],
    correctAnswer: [
      "Peristiwa Rengasdengklok",
      "Pembacaan Teks Proklamasi",
      "Pembentukan PPKI",
    ],
  },
  {
    id: "q3", // Renamed from original q4 since q3 (essay) was removed
    type: "multiple-choice",
    question: "Apa nama bendera kebangsaan Indonesia?",
    options: ["Merah Putih", "Merah Biru", "Hijau Kuning", "Merah Hijau"],
    correctAnswer: "Merah Putih",
  },
  {
    id: "q4", // Renamed from original q5 since q3 (essay) was removed
    type: "multiple-answers",
    question:
      "Siapakah tokoh-tokoh yang berperan dalam perumusan teks proklamasi?",
    options: [
      "Soekarno",
      "Mohammad Hatta",
      "Ahmad Soebardjo",
      "Fatmawati",
      "Sutan Sjahrir",
    ],
    correctAnswer: ["Soekarno", "Mohammad Hatta", "Ahmad Soebardjo"],
  },
  // All 'essay' type questions (original q3, q6, q7, q8, q9, q10, q11) have been removed.
];

export const TIME_LIMIT_MINUTES = 15;
