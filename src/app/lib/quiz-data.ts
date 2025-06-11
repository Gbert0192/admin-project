export interface Question {
  id: string;
  type: "multiple-choice" | "multiple-answers" | "essay";
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
      "Peristiwa Rengasdengdong",
      "Pembacaan Teks Proklamasi",
      "Pembentukan PPKI",
    ],
  },
  {
    id: "q3",
    type: "essay",
    question: "Tuliskan tanggal proklamasi kemerdekaan Indonesia.",
    correctAnswer: "17 Agustus 1945",
  },
  {
    id: "q4",
    type: "multiple-choice",
    question: "Apa nama bendera kebangsaan Indonesia?",
    options: ["Merah Putih", "Merah Biru", "Hijau Kuning", "Merah Hijau"],
    correctAnswer: "Merah Putih",
  },
  {
    id: "q5",
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
  {
    id: "q6",
    type: "essay",
    question: "Apa arti Bhinneka Tunggal Ika?",
    correctAnswer: "Berbeda-beda tetapi tetap satu jua",
  },
  {
    id: "q7",
    type: "essay",
    question: "Apa arti Bhinneka Tunggal Ika?",
    correctAnswer: "Berbeda-beda tetapi tetap satu jua",
  },
  {
    id: "q8",
    type: "essay",
    question: "Apa arti Bhinneka Tunggal Ika?",
    correctAnswer: "Berbeda-beda tetapi tetap satu jua",
  },
  {
    id: "q9",
    type: "essay",
    question: "Apa arti Bhinneka Tunggal Ika?",
    correctAnswer: "Berbeda-beda tetapi tetap satu jua",
  },
  {
    id: "q10",
    type: "essay",
    question: "Apa arti Bhinneka Tunggal Ika?",
    correctAnswer: "Berbeda-beda tetapi tetap satu jua",
  },
  {
    id: "q11",
    type: "essay",
    question: "Apa arti Bhinneka Tunggal Ika?",
    correctAnswer: "Berbeda-beda tetapi tetap satu jua",
  },
];

export const TIME_LIMIT_MINUTES = 15;
